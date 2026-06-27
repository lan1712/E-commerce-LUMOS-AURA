package com.example.be.auth;

import com.example.be.auth.domain.UserRole;
import com.example.be.auth.internal.JwtService;
import io.jsonwebtoken.Claims;
import net.jqwik.api.Arbitraries;
import net.jqwik.api.Arbitrary;
import net.jqwik.api.ForAll;
import net.jqwik.api.Property;
import net.jqwik.api.Provide;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class JwtTokenExpirationPropertyTest {

    // Known secret key with at least 32 characters
    private static final String TEST_SECRET = "this-is-a-very-long-test-secret-key-for-jwt-validation-that-is-at-least-32-bytes";
    
    // Exact 24 hours in milliseconds
    private static final long EXACT_EXPIRATION_MS = 86400000L;

    @Provide
    Arbitrary<String> emails() {
        return Arbitraries.strings().alpha().ofMinLength(5).ofMaxLength(50).map(s -> s + "@example.com");
    }

    @Provide
    Arbitrary<UserRole> roles() {
        return Arbitraries.of(UserRole.values());
    }

    /**
     * Property 2: JWT Token Expiration Correctness
     * Validates: Requirements 1.3
     */
    @Property(tries = 100)
    void jwtTokenExpirationIsExactly24Hours(
            @ForAll("emails") String email,
            @ForAll("roles") UserRole role
    ) {
        // Arrange
        JwtService jwtService = new JwtService(TEST_SECRET);

        // Act
        String token = jwtService.generateToken(email, role);
        Claims claims = jwtService.parseToken(token);

        // Assert
        assertNotNull(claims.getIssuedAt(), "IssuedAt should not be null");
        assertNotNull(claims.getExpiration(), "Expiration should not be null");
        
        long issuedAtTime = claims.getIssuedAt().getTime();
        long expirationTime = claims.getExpiration().getTime();
        long diff = expirationTime - issuedAtTime;

        assertEquals(EXACT_EXPIRATION_MS, diff, "The difference between expiration and issuedAt should be exactly 24 hours (86400000ms)");
    }
}
