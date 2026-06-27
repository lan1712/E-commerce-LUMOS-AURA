package com.example.be.auth;

import net.jqwik.api.Arbitraries;
import net.jqwik.api.Arbitrary;
import net.jqwik.api.ForAll;
import net.jqwik.api.Label;
import net.jqwik.api.Property;
import net.jqwik.api.Provide;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * **Validates: Requirements 1.1, 2.5**
 * Property-based test verifying that BCrypt password hashing preserves verification.
 */
@Label("Password Hashing Property Tests")
public class PasswordHashingPropertyTest {

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(4);

    /**
     * **Validates: Requirements 1.1, 2.5**
     * Property 1: Password Hashing Preserves Verification
     * - For any valid password, hashing with BCrypt produces a hash that is different from the original
     * - The original password can always be verified against its hash
     */
    @Property(tries = 100)
    @Label("Password Hashing Preserves Verification")
    void passwordHashingPreservesVerification(@ForAll("validPasswords") String originalPassword) {
        String encodedPassword = passwordEncoder.encode(originalPassword);

        // Verify encodedPassword does not equal originalPassword
        assertThat(encodedPassword).isNotEqualTo(originalPassword);

        // Verify passwordEncoder.matches(originalPassword, encodedPassword) is true
        assertThat(passwordEncoder.matches(originalPassword, encodedPassword)).isTrue();
    }

    @Provide
    Arbitrary<String> validPasswords() {
        return Arbitraries.strings()
                .withCharRange('!', '~')
                .ofMinLength(8)
                .ofMaxLength(72);
    }
}
