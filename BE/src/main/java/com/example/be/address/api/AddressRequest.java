package com.example.be.address.api;

import jakarta.validation.constraints.NotBlank;

/**
 * Request body for creating or updating an address.
 */
public record AddressRequest(
        String label,

        @NotBlank(message = "Name is required")
        String name,

        @NotBlank(message = "Address line 1 is required")
        String line1,

        String line2,

        @NotBlank(message = "City is required")
        String city,

        @NotBlank(message = "Country is required")
        String country,

        @NotBlank(message = "ZIP code is required")
        String zip,

        Boolean isDefault
) {}
