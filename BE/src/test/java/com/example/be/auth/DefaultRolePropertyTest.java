package com.example.be.auth;

import com.example.be.auth.domain.User;
import com.example.be.auth.domain.UserRole;
import net.jqwik.api.ForAll;
import net.jqwik.api.Property;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Property tests for Default Role Assignment
 * Validates: Requirements 1.7
 */
public class DefaultRolePropertyTest {

    @Property(tries = 100)
    void defaultRoleShouldBeUser(@ForAll String email, @ForAll String passwordHash) {
        User user = new User();
        user.setEmail(email);
        user.setPasswordHash(passwordHash);

        assertEquals(UserRole.USER, user.getRole(), "Default role should be USER");
    }
}
