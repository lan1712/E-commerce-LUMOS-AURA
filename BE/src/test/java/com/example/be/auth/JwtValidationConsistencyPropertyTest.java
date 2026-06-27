package com.example.be.auth;

import com.example.be.auth.domain.UserRole;
import com.example.be.auth.internal.JwtService;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import net.jqwik.api.ForAll;
import net.jqwik.api.Property;
import net.jqwik.api.constraints.AlphaChars;
import net.jqwik.api.constraints.StringLength;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * Validates: Requirements 1.8
 */
public class JwtValidationConsistencyPropertyTest {

    private static final String VALID_SECRET = "this_is_a_very_secure_test_secret_key_that_is_at_least_32_bytes";
    private static final String WRONG_SECRET = "this_is_another_very_secure_test_secret_key_that_is_at_least_32_bytes";
    
    private final JwtService jwtService = new JwtService(VALID_SECRET);
    private final SecretKey wrongSecretKey = Keys.hmacShaKeyFor(WRONG_SECRET.getBytes(StandardCharsets.UTF_8));

    @Property(tries = 100)
    public void validTokenIsConsistent(
            @ForAll @AlphaChars @StringLength(min = 5, max = 50) String email,
            @ForAll UserRole role) {
        
        String token = jwtService.generateToken(email, role);

        // parseToken should succeed
        assertDoesNotThrow(() -> jwtService.parseToken(token));
        
        // isTokenValid should return true
        assertTrue(jwtService.isTokenValid(token));
    }

    @Property(tries = 100)
    public void malformedTokenIsConsistent(
            @ForAll @StringLength(min = 1, max = 200) String malformedToken) {
        
        // isTokenValid should handle any string, possibly throwing if it's completely wrong,
        // but wait, isTokenValid catches exceptions and returns false.
        // Let's verify consistency: parseToken throws, isTokenValid returns false
        assertThrows(Exception.class, () -> jwtService.parseToken(malformedToken));
        assertFalse(jwtService.isTokenValid(malformedToken));
    }

    @Property(tries = 100)
    public void tokenWithWrongKeyIsConsistent(
            @ForAll @AlphaChars @StringLength(min = 5, max = 50) String email,
            @ForAll UserRole role) {
        
        // Generate a token with the wrong secret
        String wrongToken = Jwts.builder()
                .subject(email)
                .claim("role", role.name())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(wrongSecretKey)
                .compact();

        // parseToken should throw due to invalid signature
        assertThrows(JwtException.class, () -> jwtService.parseToken(wrongToken));
        
        // isTokenValid should return false
        assertFalse(jwtService.isTokenValid(wrongToken));
    }
    
    @Property(tries = 100)
    public void expiredTokenIsConsistent(
            @ForAll @AlphaChars @StringLength(min = 5, max = 50) String email,
            @ForAll UserRole role) {
        
        SecretKey validSecretKey = Keys.hmacShaKeyFor(VALID_SECRET.getBytes(StandardCharsets.UTF_8));
        // Generate an expired token
        String expiredToken = Jwts.builder()
                .subject(email)
                .claim("role", role.name())
                .issuedAt(new Date(System.currentTimeMillis() - 86400000 * 2))
                .expiration(new Date(System.currentTimeMillis() - 86400000)) // Expired 1 day ago
                .signWith(validSecretKey)
                .compact();

        // parseToken should throw ExpiredJwtException
        assertThrows(JwtException.class, () -> jwtService.parseToken(expiredToken));
        
        // isTokenValid should return false
        assertFalse(jwtService.isTokenValid(expiredToken));
    }
}
