package com.example.be.promo.api;

import java.math.BigDecimal;

/**
 * Response for POST /api/promo/validate.
 * When valid=false, type and value will be null.
 */
public record PromoValidateResponse(
        boolean valid,
        String type,       // "PERCENTAGE" | "FIXED" | null
        BigDecimal value,  // discount value | null
        String message
) {
    public static PromoValidateResponse valid(String type, BigDecimal value) {
        return new PromoValidateResponse(true, type, value, "Promo code applied");
    }

    public static PromoValidateResponse invalid(String message) {
        return new PromoValidateResponse(false, null, null, message);
    }
}
