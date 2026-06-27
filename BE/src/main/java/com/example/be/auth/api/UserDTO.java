package com.example.be.auth.api;

import com.example.be.auth.domain.UserRole;
import com.example.be.auth.domain.UserStatus;

import java.time.LocalDateTime;

public record UserDTO(
    Long id,
    String email,
    String firstName,
    String lastName,
    UserRole role,
    UserStatus status,
    LocalDateTime lastLogin,
    LocalDateTime createdAt
) {
    public static UserDTO from(com.example.be.auth.domain.User user) {
        return new UserDTO(
            user.getId(),
            user.getEmail(),
            user.getFirstName(),
            user.getLastName(),
            user.getRole(),
            user.getStatus() != null ? user.getStatus() : UserStatus.ACTIVE,
            user.getLastLogin(),
            user.getCreatedAt()
        );
    }
}
