package com.example.be.auth.internal;

import com.example.be.auth.domain.UserRole;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class JwtServiceTest {

    private JwtService jwtService;

    // A valid 32-character secret key for testing
    private static final String TEST_SECRET = "test-secret-key-must-be-at-least-32-chars";

    @BeforeEach
    void setUp() {
        jwtService = new JwtService(TEST_SECRET);
    }

    @Test
    void testGenerateAndParseToken() {
        // Arrange
        String email = "test@example.com";
        UserRole role = UserRole.USER;

        // Act
        String token = jwtService.generateToken(email, role);
        
        // Assert
        assertNotNull(token);
        
        Claims claims = jwtService.parseToken(token);
        assertEquals(email, claims.getSubject());
        assertEquals("USER", claims.get("role"));
        assertNotNull(claims.getIssuedAt());
        assertNotNull(claims.getExpiration());
    }

    @Test
    void testIsTokenValid_withValidToken() {
        // Arrange
        String token = jwtService.generateToken("test@example.com", UserRole.ADMIN);

        // Act
        boolean isValid = jwtService.isTokenValid(token);

        // Assert
        assertTrue(isValid);
    }

    @Test
    void testIsTokenValid_withInvalidToken() {
        // Arrange
        String invalidToken = "invalid.token.string";

        // Act
        boolean isValid = jwtService.isTokenValid(invalidToken);

        // Assert
        assertFalse(isValid);
    }
}
