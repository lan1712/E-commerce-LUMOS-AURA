package com.example.be.auth.internal;

import com.example.be.auth.api.UpdateProfileRequest;
import com.example.be.auth.api.UserProfile;
import com.example.be.auth.domain.User;
import com.example.be.auth.domain.UserRepository;
import com.example.be.auth.domain.UserRole;
import net.jqwik.api.*;
import net.jqwik.api.lifecycle.BeforeTry;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.concurrent.atomic.AtomicInteger;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Property-Based Test: User Profile Round-Trip
 *
 * **Validates: Requirements 2.1, 2.2**
 *
 * Property 5: After calling updateProfile(email, request) with non-null firstName
 * and lastName, calling getCurrentUser(email) must return the same updated values.
 */
class UserProfileRoundTripPropertyTest {

    private UserRepository userRepository;
    private JwtService jwtService;
    private UserService userService;

    private final AtomicInteger counter = new AtomicInteger(0);

    @BeforeTry
    void setUp() {
        userRepository = mock(UserRepository.class);
        jwtService = mock(JwtService.class);
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);
        userService = new UserService(userRepository, jwtService, passwordEncoder);
    }

    /**
     * **Validates: Requirements 2.1, 2.2**
     *
     * Property: For any arbitrary firstName and lastName (1–100 chars),
     * after updateProfile(), getCurrentUser() must return those exact values.
     */
    @Property(tries = 100)
    void updatedProfileValuesAreReturnedByGetCurrentUser(
            @ForAll("nonNullNames") String firstName,
            @ForAll("nonNullNames") String lastName) {

        int idx = counter.incrementAndGet();
        String email = "user" + idx + "@example.com";

        // Pre-populate the user entity that the mock repository will return
        User user = new User();
        user.setId(1L);
        user.setEmail(email);
        user.setRole(UserRole.USER);

        // updateProfile: findByEmail returns existing user, save returns the (mutated) user
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenAnswer(inv -> inv.getArgument(0));

        // Act: update firstName and lastName
        UpdateProfileRequest request = new UpdateProfileRequest(firstName, lastName, null, null);
        UserProfile updatedProfile = userService.updateProfile(email, request);

        // After update, user object has been mutated in-place by updateProfile()
        // getCurrentUser also calls findByEmail — mock still returns the same (now updated) user
        UserProfile currentProfile = userService.getCurrentUser(email);

        // Assert round-trip: both calls return the updated values
        assertThat(updatedProfile.firstName())
                .as("updateProfile() should return the new firstName='%s'", firstName)
                .isEqualTo(firstName);

        assertThat(updatedProfile.lastName())
                .as("updateProfile() should return the new lastName='%s'", lastName)
                .isEqualTo(lastName);

        assertThat(currentProfile.firstName())
                .as("getCurrentUser() should return the updated firstName='%s'", firstName)
                .isEqualTo(firstName);

        assertThat(currentProfile.lastName())
                .as("getCurrentUser() should return the updated lastName='%s'", lastName)
                .isEqualTo(lastName);
    }

    /**
     * Generates non-null name strings of 1–100 printable ASCII characters,
     * matching the @Size(max=100) constraint on UpdateProfileRequest fields.
     */
    @Provide
    Arbitrary<String> nonNullNames() {
        return Arbitraries.strings()
                .withCharRange(' ', '~')  // printable ASCII (32–126)
                .ofMinLength(1)
                .ofMaxLength(100);
    }
}
