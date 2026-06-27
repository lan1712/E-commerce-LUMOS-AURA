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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtService jwtService;

    private UserService userService;
    private BCryptPasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp() {
        passwordEncoder = new BCryptPasswordEncoder(4);
        userService = new UserService(userRepository, jwtService, passwordEncoder);
    }

    @Test
    void register_Success() {
        RegisterRequest request = new RegisterRequest("test@example.com", "password123", "John", "Doe");
        
        when(userRepository.findByEmail(request.email())).thenReturn(Optional.empty());
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User user = invocation.getArgument(0);
            user.setId(1L);
            return user;
        });
        when(jwtService.generateToken(anyString(), any(UserRole.class))).thenReturn("mock-jwt-token");

        AuthResponse response = userService.register(request);

        assertNotNull(response);
        assertEquals("mock-jwt-token", response.token());
        assertEquals("test@example.com", response.user().email());
        assertEquals("John", response.user().firstName());
        assertEquals("Doe", response.user().lastName());
        assertEquals(UserRole.USER, response.user().role());

        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());
        
        User savedUser = userCaptor.getValue();
        assertEquals("test@example.com", savedUser.getEmail());
        assertTrue(passwordEncoder.matches("password123", savedUser.getPasswordHash()));
        assertEquals("John", savedUser.getFirstName());
        assertEquals("Doe", savedUser.getLastName());
        assertEquals(UserRole.USER, savedUser.getRole());
    }

    @Test
    void register_EmailAlreadyExists() {
        RegisterRequest request = new RegisterRequest("test@example.com", "password123", "John", "Doe");
        
        when(userRepository.findByEmail(request.email())).thenReturn(Optional.of(new User()));

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            userService.register(request);
        });
        
        assertEquals("Email already registered", exception.getMessage());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void login_Success() {
        LoginRequest request = new LoginRequest("test@example.com", "password123");
        
        User user = new User();
        user.setId(1L);
        user.setEmail("test@example.com");
        user.setPasswordHash(passwordEncoder.encode("password123"));
        user.setRole(UserRole.USER);
        
        when(userRepository.findByEmail(request.email())).thenReturn(Optional.of(user));
        when(jwtService.generateToken("test@example.com", UserRole.USER)).thenReturn("mock-jwt-token");

        AuthResponse response = userService.login(request);

        assertNotNull(response);
        assertEquals("mock-jwt-token", response.token());
        assertEquals("test@example.com", response.user().email());
    }

    @Test
    void login_UserNotFound() {
        LoginRequest request = new LoginRequest("test@example.com", "password123");
        
        when(userRepository.findByEmail(request.email())).thenReturn(Optional.empty());

        InvalidCredentialsException exception = assertThrows(InvalidCredentialsException.class, () -> {
            userService.login(request);
        });
        
        assertEquals("Invalid email or password", exception.getMessage());
    }

    @Test
    void login_InvalidPassword() {
        LoginRequest request = new LoginRequest("test@example.com", "wrongpassword");
        
        User user = new User();
        user.setEmail("test@example.com");
        user.setPasswordHash(passwordEncoder.encode("password123"));
        
        when(userRepository.findByEmail(request.email())).thenReturn(Optional.of(user));

        InvalidCredentialsException exception = assertThrows(InvalidCredentialsException.class, () -> {
            userService.login(request);
        });
        
        assertEquals("Invalid email or password", exception.getMessage());
    }

    @Test
    void getCurrentUser_Success() {
        User user = new User();
        user.setId(1L);
        user.setEmail("test@example.com");
        user.setFirstName("John");
        user.setRole(UserRole.USER);
        
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));

        UserProfile profile = userService.getCurrentUser("test@example.com");

        assertNotNull(profile);
        assertEquals(1L, profile.id());
        assertEquals("test@example.com", profile.email());
        assertEquals("John", profile.firstName());
        assertEquals(UserRole.USER, profile.role());
    }

    @Test
    void getCurrentUser_NotFound() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.empty());

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            userService.getCurrentUser("test@example.com");
        });
        
        assertEquals("User not found", exception.getMessage());
    }

    @Test
    void updateProfile_Success() {
        String email = "test@example.com";
        UpdateProfileRequest request = new UpdateProfileRequest("Jane", "Smith", "new@example.com", "newpassword");
        
        User user = new User();
        user.setId(1L);
        user.setEmail(email);
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setPasswordHash(passwordEncoder.encode("oldpassword"));
        
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(userRepository.findByEmail("new@example.com")).thenReturn(Optional.empty());
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        UserProfile updatedProfile = userService.updateProfile(email, request);

        assertNotNull(updatedProfile);
        assertEquals("new@example.com", updatedProfile.email());
        assertEquals("Jane", updatedProfile.firstName());
        assertEquals("Smith", updatedProfile.lastName());

        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());
        
        User savedUser = userCaptor.getValue();
        assertEquals("new@example.com", savedUser.getEmail());
        assertTrue(passwordEncoder.matches("newpassword", savedUser.getPasswordHash()));
        assertEquals("Jane", savedUser.getFirstName());
        assertEquals("Smith", savedUser.getLastName());
    }
    
    @Test
    void updateProfile_PartialUpdate() {
        String email = "test@example.com";
        UpdateProfileRequest request = new UpdateProfileRequest("Jane", null, null, null);
        
        User user = new User();
        user.setId(1L);
        user.setEmail(email);
        user.setFirstName("John");
        user.setLastName("Doe");
        
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        UserProfile updatedProfile = userService.updateProfile(email, request);

        assertNotNull(updatedProfile);
        assertEquals(email, updatedProfile.email());
        assertEquals("Jane", updatedProfile.firstName());
        assertEquals("Doe", updatedProfile.lastName());
    }

    @Test
    void updateProfile_EmailAlreadyInUse() {
        String email = "test@example.com";
        UpdateProfileRequest request = new UpdateProfileRequest(null, null, "used@example.com", null);
        
        User user = new User();
        user.setEmail(email);
        
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(userRepository.findByEmail("used@example.com")).thenReturn(Optional.of(new User()));

        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            userService.updateProfile(email, request);
        });
        
        assertEquals("Email already in use", exception.getMessage());
        verify(userRepository, never()).save(any(User.class));
    }
}
