package com.example.be.order.api;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO representing an order returned to the frontend.
 */
public record OrderDTO(
        Long id,
        String orderNumber,
        String email,
        String status,
        String shipName,
        String shipAddress,
        String shipCity,
        String shipState,
        String shipZip,
        String shipCountry,
        BigDecimal subtotal,
        BigDecimal discount,
        BigDecimal total,
        String promoCode,
        List<OrderItemDTO> items,
        LocalDateTime createdAt
) {}
