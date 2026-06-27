package com.example.be.address.api;

/**
 * DTO for returning address data to the frontend.
 */
public record AddressDTO(
        Long id,
        String label,
        String name,
        String line1,
        String line2,
        String city,
        String country,
        String zip,
        Boolean isDefault
) {}
