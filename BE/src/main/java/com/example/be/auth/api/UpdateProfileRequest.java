package com.example.be.auth.api;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record UpdateProfileRequest(
    @Size(max = 100) String firstName,
    @Size(max = 100) String lastName,
    @Email String email,
    @Size(min = 8, max = 100) String password,
    @Size(max = 20) String phoneNumber
) {
    public UpdateProfileRequest(String firstName, String lastName, String email, String password) {
        this(firstName, lastName, email, password, null);
    }
}
