package com.example.be.order.api;

import com.example.be.order.domain.Order;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public record OrderAdminDTO(
    Long id,
    String orderNumber,
    String customerName,
    String email,
    BigDecimal total,
    String status,
    String payment,
    LocalDateTime date
) {
    public static OrderAdminDTO from(Order order) {
        String paymentStatus;
        if (order.getTransactionId() != null && !order.getTransactionId().trim().isEmpty()) {
            paymentStatus = "Paid";
        } else if ("PAID".equalsIgnoreCase(order.getStatus()) || "COMPLETED".equalsIgnoreCase(order.getStatus())) {
            paymentStatus = "Paid";
        } else if ("CANCELLED".equalsIgnoreCase(order.getStatus())) {
            paymentStatus = "Cancelled";
        } else {
            paymentStatus = "Unpaid";
        }
        return new OrderAdminDTO(
            order.getId(),
            order.getOrderNumber(),
            order.getShipName(), // using ship name or user's name
            order.getEmail(),
            order.getTotal(),
            order.getStatus(),
            paymentStatus,
            order.getCreatedAt()
        );
    }
}
