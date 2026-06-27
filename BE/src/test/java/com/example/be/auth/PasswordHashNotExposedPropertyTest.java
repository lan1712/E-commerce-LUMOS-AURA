package com.example.be.auth;

import com.example.be.auth.domain.User;
import com.example.be.auth.domain.UserRole;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import net.jqwik.api.Arbitraries;
import net.jqwik.api.Arbitrary;
import net.jqwik.api.ForAll;
import net.jqwik.api.Property;
import net.jqwik.api.Provide;

import java.time.LocalDateTime;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;

public class PasswordHashNotExposedPropertyTest {

    private final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule());

    /**
     * Property 6: Password Hash Never Exposed
     * Validates: Requirements 2.4
     * Generate arbitrary user entities and serialize to JSON
     * Verify resulting JSON does not contain passwordHash field or value
     * Test with at least 100 iterations
     */
    @Property(tries = 100)
    void passwordHashNeverExposedInJsonSerialization(@ForAll("userEntities") User user) throws JsonProcessingException {
        // Serialize user entity to JSON
        String json = objectMapper.writeValueAsString(user);

        // Parse JSON back to map to easily check fields
        Map<String, Object> jsonMap = objectMapper.readValue(json, Map.class);

        // Verify JSON string does NOT contain "passwordHash" key
        assertFalse(jsonMap.containsKey("passwordHash"), "JSON should not contain passwordHash key");
        
        // Also verify the raw JSON string does not contain the actual hash value
        if (user.getPasswordHash() != null && !user.getPasswordHash().isEmpty()) {
            assertFalse(json.contains(user.getPasswordHash()), "JSON should not contain the actual password hash value");
        }
    }

    @Provide
    Arbitrary<User> userEntities() {
        return Arbitraries.strings().alpha().ofMinLength(1).ofMaxLength(10).flatMap(firstName ->
                Arbitraries.strings().alpha().ofMinLength(1).ofMaxLength(15).flatMap(lastName ->
                        Arbitraries.strings().alpha().ofMinLength(5).ofMaxLength(20).flatMap(emailPrefix ->
                                Arbitraries.strings().numeric().ofLength(10).flatMap(randomIdStr -> {
                                    User user = new User();
                                    user.setId(Long.parseLong(randomIdStr));
                                    user.setFirstName(firstName);
                                    user.setLastName(lastName);
                                    user.setEmail(emailPrefix + "@example.com");
                                    user.setPasswordHash("$2a$12$R9h/cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jWMUW"); // Dummy bcrypt hash
                                    user.setRole(UserRole.USER);
                                    user.setCreatedAt(LocalDateTime.now());
                                    user.setUpdatedAt(LocalDateTime.now());
                                    return Arbitraries.just(user);
                                })
                        )
                )
        );
    }
}
