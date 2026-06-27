package com.example.be.promo.domain;

/**
 * The type of discount applied by a promo code.
 * PERCENTAGE: reduces price by a percentage (e.g. 10%)
 * FIXED: reduces price by a fixed amount (e.g. $10)
 */
public enum DiscountType {
    PERCENTAGE,
    FIXED
}
