package com.example.be.auth.internal;

import com.example.be.auth.api.AuthResponse;
import com.example.be.auth.api.LoginRequest;
import com.example.be.auth.api.RegisterRequest;
import com.example.be.auth.api.UpdateProfileRequest;
import com.example.be.auth.api.UserProfile;
import com.example.be.auth.domain.InvalidCredentialsException;
import com.example.be.auth.domain.User;
import com.example.be.auth.domain.UserRepository;
import com.example.be.auth.domain.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.client.RestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import java.net.URI;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final JavaMailSender mailSender;

    @Value("${google.client-id}")
    private String googleClientId;

    @Autowired
    public UserService(UserRepository userRepository, JwtService jwtService, PasswordEncoder passwordEncoder, JavaMailSender mailSender) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.mailSender = mailSender;
    }

    public UserService(UserRepository userRepository, JwtService jwtService, PasswordEncoder passwordEncoder) {
        this(userRepository, jwtService, passwordEncoder, null);
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            throw new IllegalArgumentException("Email already registered");
        }

        User user = new User();
        user.setEmail(request.email());
        user.setPasswordHash(passwordEncoder.encode(request.password()));
        user.setFirstName(request.firstName());
        user.setLastName(request.lastName());
        user.setRole(UserRole.USER);

        User savedUser = userRepository.save(user);
        
        String token = jwtService.generateToken(savedUser.getEmail(), savedUser.getRole());
        return AuthResponse.of(token, mapToProfile(savedUser));
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new InvalidCredentialsException("Invalid email or password"));

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }

        if (user.getStatus() == com.example.be.auth.domain.UserStatus.SUSPENDED) {
            throw new IllegalArgumentException("Account is suspended. Please contact support.");
        }

        user.setLastLogin(java.time.LocalDateTime.now());
        userRepository.save(user);

        String token = jwtService.generateToken(user.getEmail(), user.getRole());
        return AuthResponse.of(token, mapToProfile(user));
    }

    @Transactional
    public AuthResponse loginWithGoogle(String googleToken) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String tokenInfoUrl = "https://oauth2.googleapis.com/tokeninfo?id_token="
                    + java.net.URLEncoder.encode(googleToken, java.nio.charset.StandardCharsets.UTF_8);
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    URI.create(tokenInfoUrl),
                    HttpMethod.GET,
                    HttpEntity.EMPTY,
                    new ParameterizedTypeReference<>() {}
            );
            Map<String, Object> payload = response.getBody();

            if (payload == null || !payload.containsKey("email")) {
                throw new IllegalArgumentException("Invalid Google token or missing email");
            }
            if (!googleClientId.equals(payload.get("aud"))) {
                throw new IllegalArgumentException("Google token was issued for another application");
            }
            if (!"true".equals(String.valueOf(payload.get("email_verified")))) {
                throw new IllegalArgumentException("Google email is not verified");
            }

            String email = (String) payload.get("email");
            String givenName = (String) payload.get("given_name");
            String familyName = (String) payload.get("family_name");

            User user = userRepository.findByEmail(email).orElseGet(() -> {
                User newUser = new User();
                newUser.setEmail(email);
                // Assign a random password hash since they use Google to login
                newUser.setPasswordHash(passwordEncoder.encode(java.util.UUID.randomUUID().toString()));
                newUser.setFirstName(givenName != null ? givenName : "Google");
                newUser.setLastName(familyName != null ? familyName : "User");
                newUser.setRole(UserRole.USER);
                return userRepository.save(newUser);
            });

            if (user.getStatus() == com.example.be.auth.domain.UserStatus.SUSPENDED) {
                throw new IllegalArgumentException("Account is suspended. Please contact support.");
            }

            user.setLastLogin(java.time.LocalDateTime.now());
            userRepository.save(user);

            String token = jwtService.generateToken(user.getEmail(), user.getRole());
            return AuthResponse.of(token, mapToProfile(user));
        } catch (Exception e) {
            throw new IllegalArgumentException("Failed to authenticate with Google: " + e.getMessage());
        }
    }

    @Transactional(readOnly = true)
    public UserProfile getCurrentUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return mapToProfile(user);
    }

    @Transactional
    public UserProfile updateProfile(String email, UpdateProfileRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (request.email() != null && !request.email().equals(user.getEmail())) {
            if (userRepository.findByEmail(request.email()).isPresent()) {
                throw new IllegalArgumentException("Email already in use");
            }
            user.setEmail(request.email());
        }

        if (request.firstName() != null) {
            user.setFirstName(request.firstName());
        }

        if (request.lastName() != null) {
            user.setLastName(request.lastName());
        }

        if (request.password() != null && !request.password().isBlank()) {
            user.setPasswordHash(passwordEncoder.encode(request.password()));
        }

        if (request.phoneNumber() != null) {
            user.setPhoneNumber(request.phoneNumber());
        }

        User updatedUser = userRepository.save(user);
        return mapToProfile(updatedUser);
    }

    private UserProfile mapToProfile(User user) {
        return new UserProfile(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole(),
                user.getPhoneNumber(),
                user.getRewardPoints()
        );
    }

    @Transactional
    public void requestPasswordChangeOtp(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        
        String otp = String.format("%06d", new java.util.Random().nextInt(999999));
        user.setOtp(otp);
        user.setOtpExpiry(java.time.LocalDateTime.now().plusMinutes(15));
        userRepository.save(user);

        // Send actual email
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Your Password Reset OTP - Lumos Aura");
            message.setText("Hello,\n\nYour OTP to reset your password is: " + otp + "\n\nIt will expire in 15 minutes.\n\nThank you,\nLumos Aura Team");
            mailSender.send(message);
            System.out.println("EMAIL SENT SUCCESSFULLY TO: " + email);
        } catch (Exception e) {
            System.out.println("FAILED TO SEND EMAIL: " + e.getMessage());
        }
    }

    @Transactional
    public void changePasswordWithOtp(String email, String otp, String newPassword) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (user.getOtp() == null || !user.getOtp().equals(otp)) {
            throw new IllegalArgumentException("Invalid OTP");
        }
        if (user.getOtpExpiry().isBefore(java.time.LocalDateTime.now())) {
            throw new IllegalArgumentException("OTP expired");
        }

        user.setPasswordHash(passwordEncoder.encode(newPassword));
        user.setOtp(null);
        user.setOtpExpiry(null);
        userRepository.save(user);
    }
}
