package com.example.be.auth.api;

import com.example.be.auth.domain.UserRole;

/**
 * Response returned on successful login or registration.
 * Fields are flattened so the FE can access res.token, res.email, etc. directly.
 */
public record AuthResponse(
    String token,
    Long id,
    String email,
    String firstName,
    String lastName,
    UserRole role
) {
    public AuthResponse(String token, UserProfile profile) {
        this(token, profile.id(), profile.email(), profile.firstName(), profile.lastName(), profile.role());
    }

    /** Convenience constructor from a UserProfile + token. */
    public static AuthResponse of(String token, UserProfile profile) {
        return new AuthResponse(token, profile.id(), profile.email(),
                profile.firstName(), profile.lastName(), profile.role());
    }

    public UserProfile user() {
        return new UserProfile(id, email, firstName, lastName, role);
    }
}

