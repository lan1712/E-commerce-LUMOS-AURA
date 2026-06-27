package com.example.be.auth.api;

import jakarta.validation.constraints.Size;

public record PasswordChangeRequest(
    @Size(min = 6, max = 10) String otp,
    @Size(min = 8, max = 100) String newPassword
) {}
