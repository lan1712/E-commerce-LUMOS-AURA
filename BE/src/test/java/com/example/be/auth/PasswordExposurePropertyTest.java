package com.example.be.auth;

import com.example.be.auth.domain.User;
import com.example.be.auth.domain.UserRole;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import net.jqwik.api.Arbitraries;
import net.jqwik.api.Arbitrary;
import net.jqwik.api.Combinators;
import net.jqwik.api.ForAll;
import net.jqwik.api.Property;
import net.jqwik.api.Provide;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertFalse;

/**
 * **Validates: Requirements 2.4**
 * Property 6: Password Hash Never Exposed
 *
 * Generates arbitrary User entities, serializes to JSON, and verifies
 * that the resulting JSON does not contain the passwordHash field or value.
 */
public class PasswordExposurePropertyTest {

    private final ObjectMapper objectMapper;

    public PasswordExposurePropertyTest() {
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule());
    }

    @Property(tries = 100)
    void passwordHashNeverExposedInJson(@ForAll("users") User user) throws JsonProcessingException {
        // Serialize to JSON string
        String json = objectMapper.writeValueAsString(user);

        // Verify "passwordHash" key is not in JSON
        assertFalse(json.contains("\"passwordHash\""),
                "JSON should not contain the field 'passwordHash'");

        // Verify the actual password hash value is not in JSON
        String passwordHash = user.getPasswordHash();
        if (passwordHash != null && !passwordHash.isEmpty()) {
            assertFalse(json.contains(passwordHash),
                    "JSON should not expose the actual password hash value: " + passwordHash);
        }
    }

    @Provide
    Arbitrary<User> users() {
        Arbitrary<Long> ids = Arbitraries.longs().greaterOrEqual(1L).injectNull(0.1);
        Arbitrary<String> emails = Arbitraries.strings().withCharRange('a', 'z')
                .ofMinLength(3).ofMaxLength(10)
                .map(s -> s + "@example.com");
        Arbitrary<String> passwordHashes = Arbitraries.strings()
                .ofMinLength(10).ofMaxLength(60);
        Arbitrary<String> firstNames = Arbitraries.strings().alpha()
                .ofMinLength(2).ofMaxLength(20).injectNull(0.2);
        Arbitrary<String> lastNames = Arbitraries.strings().alpha()
                .ofMinLength(2).ofMaxLength(20).injectNull(0.2);
        Arbitrary<UserRole> roles = Arbitraries.of(UserRole.class);
        Arbitrary<LocalDateTime> dates = Arbitraries.integers().between(0, 365)
                .map(days -> LocalDateTime.now().minusDays(days));

        return Combinators.combine(ids, emails, passwordHashes, firstNames, lastNames, roles, dates)
                .as((id, email, passwordHash, firstName, lastName, role, createdAt) -> {
                    User user = new User();
                    user.setId(id);
                    user.setEmail(email);
                    user.setPasswordHash(passwordHash);
                    user.setFirstName(firstName);
                    user.setLastName(lastName);
                    user.setRole(role);
                    user.setCreatedAt(createdAt);
                    user.setUpdatedAt(createdAt);
                    return user;
                });
    }
}
