package com.example.be.auth.api;

import com.example.be.auth.domain.UserRole;

public record UserProfile(
    Long id,
    String email,
    String firstName,
    String lastName,
    UserRole role
) {}
