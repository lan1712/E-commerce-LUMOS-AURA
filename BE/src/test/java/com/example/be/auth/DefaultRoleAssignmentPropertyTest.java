package com.example.be.auth;

import com.example.be.auth.domain.User;
import com.example.be.auth.domain.UserRole;
import net.jqwik.api.ForAll;
import net.jqwik.api.Property;
import net.jqwik.api.constraints.AlphaChars;
import net.jqwik.api.constraints.StringLength;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Property 3: Default Role Assignment
 * Validates: Requirements 1.7
 * The Authentication_Service SHALL assign role USER to newly registered accounts by default.
 */
public class DefaultRoleAssignmentPropertyTest {

    @Property(tries = 100)
    void defaultRoleShouldBeUser(
            @ForAll @StringLength(min = 5, max = 50) String emailPrefix,
            @ForAll @StringLength(min = 8, max = 60) String passwordHash,
            @ForAll @AlphaChars @StringLength(min = 1, max = 50) String firstName,
            @ForAll @AlphaChars @StringLength(min = 1, max = 50) String lastName
    ) {
        String email = emailPrefix + "@example.com";
        // Given an arbitrary registration/user instance
        User user = new User();
        
        // When setting various fields (simulating a mapped registration request)
        user.setEmail(email);
        user.setPasswordHash(passwordHash);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        
        // Then the role should default to USER
        assertEquals(UserRole.USER, user.getRole(), "New users should be assigned the USER role by default");
    }

    @Property(tries = 100)
    void newlyInstantiatedUserHasUserRole() {
        // Just creating a new user should default to USER role
        User user = new User();
        assertEquals(UserRole.USER, user.getRole(), "Newly instantiated User should have USER role");
    }
}
