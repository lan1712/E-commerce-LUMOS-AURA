package com.example.be.auth.internal;

import com.example.be.auth.api.UserProfile;
import com.example.be.auth.domain.User;
import com.example.be.auth.domain.UserRole;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import net.jqwik.api.*;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Property-Based Test: Password Hash Never Exposed
 *
 * **Validates: Requirements 2.4**
 *
 * Property 6: For any arbitrary User entity serialized to JSON,
 * the resulting JSON must never contain the passwordHash field name
 * or the actual hash value.
 */
class PasswordHashNeverExposedPropertyTest {

    private final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule());

    /**
     * **Validates: Requirements 2.4**
     *
     * Property: Serializing a User entity to JSON must never expose
     * the passwordHash field name or its value, regardless of what
     * the hash contains. The @JsonIgnore annotation on passwordHash
     * enforces this invariant.
     */
    @Property(tries = 100)
    void passwordHashIsNeverExposedInUserJson(
            @ForAll("userEmails") String email,
            @ForAll("passwordHashes") String passwordHash,
            @ForAll("optionalNames") String firstName,
            @ForAll("optionalNames") String lastName) throws Exception {

        User user = new User();
        user.setEmail(email);
        user.setPasswordHash(passwordHash);
        user.setFirstName(firstName.isEmpty() ? null : firstName);
        user.setLastName(lastName.isEmpty() ? null : lastName);
        user.setRole(UserRole.USER);
        // Leave createdAt/updatedAt null — no JPA context; Jackson handles null fine

        String json = objectMapper.writeValueAsString(user);

        assertThat(json)
                .as("JSON must not contain the field name 'passwordHash'")
                .doesNotContain("passwordHash");

        assertThat(json)
                .as("JSON must not contain the actual hash value '%s'", passwordHash)
                .doesNotContain(passwordHash);
    }

    /**
     * **Validates: Requirements 2.4**
     *
     * Additional check: UserProfile (the public-facing DTO) structurally
     * has no passwordHash field at all, so it can never leak it.
     */
    @Property(tries = 100)
    void userProfileNeverContainsPasswordHash(
            @ForAll("userEmails") String email,
            @ForAll("optionalNames") String firstName,
            @ForAll("optionalNames") String lastName) throws Exception {

        UserProfile profile = new UserProfile(
                1L,
                email,
                firstName.isEmpty() ? null : firstName,
                lastName.isEmpty() ? null : lastName,
                UserRole.USER
        );

        String json = objectMapper.writeValueAsString(profile);

        assertThat(json)
                .as("UserProfile JSON must not contain the field name 'passwordHash'")
                .doesNotContain("passwordHash");
    }

    @Provide
    Arbitrary<String> userEmails() {
        // Generate realistic-looking email strings (non-null)
        return Arbitraries.strings()
                .withCharRange('a', 'z')
                .ofMinLength(3)
                .ofMaxLength(20)
                .map(local -> local + "@example.com");
    }

    @Provide
    Arbitrary<String> passwordHashes() {
        // Generate arbitrary hash strings that are long enough (>=8 chars) and use only
        // alphanumeric characters so they cannot coincidentally match JSON structural
        // characters like '{', '}', '"', ':'. This keeps the "value not in JSON" assertion
        // meaningful — if the string appears in the JSON it can only be because the field
        // was serialized, not because it overlaps with JSON syntax.
        return Arbitraries.strings()
                .withCharRange('a', 'z')
                .ofMinLength(8)
                .ofMaxLength(80);
    }

    @Provide
    Arbitrary<String> optionalNames() {
        // May be empty (mapped to null in the test) or a short name string
        return Arbitraries.strings()
                .withCharRange('a', 'z')
                .ofMinLength(0)
                .ofMaxLength(30);
    }
}
