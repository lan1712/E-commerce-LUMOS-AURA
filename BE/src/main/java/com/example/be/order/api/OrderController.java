package com.example.be.order.api;

import com.example.be.order.internal.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

/**
 * REST controller for order management.
 *
 * <ul>
 *   <li>POST /api/orders — public, supports guest checkout</li>
 *   <li>GET  /api/orders — requires JWT</li>
 *   <li>GET  /api/orders/{orderNumber} — requires JWT</li>
 * </ul>
 */
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    /**
     * POST /api/orders
     * Creates a new order. JWT optional — if present, order is linked to user account.
     */
    @PostMapping
    public ResponseEntity<OrderDTO> createOrder(
            @Valid @RequestBody CreateOrderRequest request,
            Principal principal) {
        String userEmail = (principal != null) ? principal.getName() : null;
        OrderDTO order = orderService.createOrder(request, userEmail);
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }

    /**
     * GET /api/orders
     * Returns the authenticated user's order history.
     */
    @GetMapping
    public ResponseEntity<List<OrderDTO>> listOrders(Principal principal) {
        return ResponseEntity.ok(orderService.getUserOrders(principal.getName()));
    }

    /**
     * GET /api/orders/{orderNumber}
     * Returns a specific order scoped to the authenticated user.
     */
    @GetMapping("/{orderNumber}")
    public ResponseEntity<OrderDTO> getOrder(@PathVariable String orderNumber, Principal principal) {
        return ResponseEntity.ok(orderService.getOrderByNumber(orderNumber, principal.getName()));
    }

    /**
     * POST /api/orders/{orderNumber}/retry-payment
     * Retries payment for an existing order, optionally updating the payment method.
     */
    @PostMapping("/{orderNumber}/retry-payment")
    public ResponseEntity<OrderDTO> retryPayment(
            @PathVariable String orderNumber,
            @RequestParam(required = false) String paymentMethod,
            Principal principal) {
        return ResponseEntity.ok(orderService.retryPayment(orderNumber, paymentMethod, principal.getName()));
    }

    @PostMapping("/{orderNumber}/cancel")
    public ResponseEntity<OrderDTO> cancelOrder(
            @PathVariable String orderNumber,
            @Valid @RequestBody CancelOrderRequest request,
            Principal principal) {
        return ResponseEntity.ok(orderService.cancelOrder(orderNumber, request, principal.getName()));
    }
}
