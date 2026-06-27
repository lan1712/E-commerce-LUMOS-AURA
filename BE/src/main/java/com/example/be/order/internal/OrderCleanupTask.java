package com.example.be.order.internal;

import com.example.be.order.domain.Order;
import com.example.be.order.domain.OrderRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class OrderCleanupTask {

    private final OrderRepository orderRepository;

    public OrderCleanupTask(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Scheduled(fixedRate = 60000) // Run every 60 seconds
    public void cleanupExpiredVNPayOrders() {
        LocalDateTime fiveMinsAgo = LocalDateTime.now().minusMinutes(5);
        List<Order> expiredOrders = orderRepository.findByStatusAndPaymentMethodAndCreatedAtBefore("PENDING", "VNPay", fiveMinsAgo);
        
        // Handle case-insensitive "VNPay" or "VNPAY" in database if necessary
        List<Order> upperCaseOrders = orderRepository.findByStatusAndPaymentMethodAndCreatedAtBefore("PENDING", "VNPAY", fiveMinsAgo);
        
        for (Order order : expiredOrders) {
            order.setStatus("CANCELLED");
            orderRepository.save(order);
        }
        for (Order order : upperCaseOrders) {
            order.setStatus("CANCELLED");
            orderRepository.save(order);
        }
    }
}
