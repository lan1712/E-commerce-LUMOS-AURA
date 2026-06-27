package com.example.be.auth.internal;

import com.example.be.auth.api.AuthResponse;
import com.example.be.auth.api.RegisterRequest;
import com.example.be.auth.domain.User;
import com.example.be.auth.domain.UserRepository;
import com.example.be.auth.domain.UserRole;
import net.jqwik.api.*;
import net.jqwik.api.lifecycle.BeforeTry;
import org.mockito.ArgumentCaptor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

/**
 * Property-Based Test: Default Role Assignment
 *
 * Validates: Requirements 1.7
 *
 * Property 3: For any valid registration request,
 * the newly created user must be assigned the role USER by default.
 */
class DefaultRoleAssignmentPropertyTest {

    private UserRepository userRepository;
    private JwtService jwtService;
    private UserService userService;

    // Counter to generate unique emails across tries
    private final AtomicInteger emailCounter = new AtomicInteger(0);

    @BeforeTry
    void setUp() {
        userRepository = mock(UserRepository.class);
        jwtService = mock(JwtService.class);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(4);
        userService = new UserService(userRepository, jwtService, passwordEncoder);
    }

    /**
     * **Validates: Requirements 1.7**
     *
     * Property: For any arbitrary valid registration request, the returned UserProfile
     * must have role == USER, and the User entity persisted to the repository must
     * also have role == USER.
     */
    @Property(tries = 100)
    void newlyRegisteredUserAlwaysHasRoleUser(
            @ForAll("validPasswords") String password,
            @ForAll("optionalNames") String firstName,
            @ForAll("optionalNames") String lastName) {

        // Build a unique email for this try to avoid "Email already registered"
        int index = emailCounter.incrementAndGet();
        String email = "user" + index + "@example.com";

        RegisterRequest request = new RegisterRequest(email, password, firstName, lastName);

        // Mock: email not yet registered
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        // Mock: save returns the user with an ID assigned
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User user = invocation.getArgument(0);
            user.setId((long) index);
            return user;
        });

        // Mock: JWT generation returns a valid token
        when(jwtService.generateToken(anyString(), any(UserRole.class)))
                .thenReturn("mock-token-" + index);

        // Act
        AuthResponse response = userService.register(request);

        // Assert 1: returned UserProfile has role USER
        assertThat(response.user().role())
                .as("UserProfile returned by register() must have role USER for email=%s", email)
                .isEqualTo(UserRole.USER);

        // Assert 2: entity saved to repository has role USER (via ArgumentCaptor)
        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());

        User savedUser = userCaptor.getValue();
        assertThat(savedUser.getRole())
                .as("User entity persisted to repository must have role USER for email=%s", email)
                .isEqualTo(UserRole.USER);
    }

    /**
     * Generates valid passwords: 8–72 printable ASCII characters,
     * matching the BCrypt-compatible range used in PasswordHashingPropertyTest.
     */
    @Provide
    Arbitrary<String> validPasswords() {
        return Arbitraries.strings()
                .withCharRange(' ', '~')   // printable ASCII (32–126), each char = 1 byte
                .ofMinLength(8)
                .ofMaxLength(72);
    }

    /**
     * Generates optional name values: either null or a 1–100 character string
     * composed of printable ASCII characters, matching the @Size(max=100) constraint.
     */
    @Provide
    Arbitrary<String> optionalNames() {
        Arbitrary<String> name = Arbitraries.strings()
                .withCharRange(' ', '~')
                .ofMinLength(1)
                .ofMaxLength(100);
        return Arbitraries.oneOf(
                Arbitraries.just(null),
                name
        );
    }
}
