package com.example.be.order.api;

import com.example.be.order.domain.Order;
import com.example.be.order.domain.OrderRepository;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/orders")
public class OrderManagementController {

    private final OrderRepository orderRepository;

    public OrderManagementController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @GetMapping
    public ResponseEntity<List<OrderAdminDTO>> getAllOrders() {
        List<OrderAdminDTO> orders = orderRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"))
                .stream()
                .map(OrderAdminDTO::from)
                .collect(Collectors.toList());
        return ResponseEntity.ok(orders);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<OrderAdminDTO> updateOrderStatus(@PathVariable Long id, @RequestParam String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Order not found"));
        order.setStatus(status.toUpperCase());
        Order saved = orderRepository.save(order);
        return ResponseEntity.ok(OrderAdminDTO.from(saved));
    }
}
