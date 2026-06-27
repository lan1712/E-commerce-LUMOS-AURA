package com.example.be.promo.api;

import jakarta.validation.constraints.NotBlank;

public record PromoValidateRequest(
        @NotBlank(message = "Code must not be blank")
        String code
) {}
