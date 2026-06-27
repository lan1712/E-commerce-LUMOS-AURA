package com.example.be.order.api;

import java.math.BigDecimal;

/**
 * DTO for a single line item within an order response.
 */
public record OrderItemDTO(
        Long id,
        String productSlug,
        String productName,
        String productImage,
        BigDecimal productPrice,
        Integer quantity,
        BigDecimal lineTotal
) {}
