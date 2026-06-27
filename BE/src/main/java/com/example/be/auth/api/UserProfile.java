package com.example.be.auth.api;

import com.example.be.auth.domain.UserRole;

public record UserProfile(
    Long id,
    String email,
    String firstName,
    String lastName,
    UserRole role,
    String phoneNumber,
    Integer rewardPoints
) {
    public UserProfile(Long id, String email, String firstName, String lastName, UserRole role) {
        this(id, email, firstName, lastName, role, null, 0);
    }
}
