package com.example.be.order.api;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;

import java.util.List;

/**
 * Request body for POST /api/orders
 */
public record CreateOrderRequest(
        @Email(message = "Valid email required")
        @NotBlank(message = "Email is required")
        String email,

        @NotBlank(message = "Name is required")
        String shipName,

        @NotBlank(message = "Address is required")
        String shipAddress,

        @NotBlank(message = "City is required")
        String shipCity,

        String shipState,

        @NotBlank(message = "ZIP code is required")
        String shipZip,

        String shipCountry,

        String promoCode,

        @NotBlank(message = "Payment method is required")
        String paymentMethod,

        @NotEmpty(message = "Order must contain at least one item")
        List<OrderItemRequest> items
) {
    public record OrderItemRequest(
            @NotBlank(message = "Product slug is required")
            String productSlug,

            Long variantId,

            @Positive(message = "Quantity must be positive")
            int quantity
    ) {}
}
