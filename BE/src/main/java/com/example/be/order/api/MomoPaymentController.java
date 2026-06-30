package com.example.be.order.api;

import com.example.be.order.domain.Order;
import com.example.be.order.domain.OrderRepository;
import com.example.be.order.internal.OrderService;
import com.example.be.order.internal.momo.MomoConfig;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/payment")
public class MomoPaymentController {

    private final OrderRepository orderRepository;
    private final OrderService orderService;
    private final MomoConfig momoConfig;

    public MomoPaymentController(OrderRepository orderRepository, OrderService orderService, MomoConfig momoConfig) {
        this.orderRepository = orderRepository;
        this.orderService = orderService;
        this.momoConfig = momoConfig;
    }

    @PostMapping("/momo-ipn")
    public ResponseEntity<Void> momoIpn(@RequestBody Map<String, Object> payload) {
        try {
            System.out.println("--- MoMo IPN Received ---");
            System.out.println(payload);

            if (payload == null || !payload.containsKey("orderId")) {
                return ResponseEntity.badRequest().build();
            }

            String momoOrderId = (String) payload.get("orderId");
            int resultCode = (Integer) payload.get("resultCode");
            
            // Extract the original order ID
            int lastDashIdx = momoOrderId.lastIndexOf("-");
            String orderNumber = (lastDashIdx > 0) ? momoOrderId.substring(0, lastDashIdx) : momoOrderId;

            Optional<Order> orderOpt = orderRepository.findByOrderNumber(orderNumber);
            if (orderOpt.isPresent()) {
                Order order = orderOpt.get();
                if ("PENDING".equalsIgnoreCase(order.getStatus())) {
                    if (resultCode == 0) {
                        String transactionId = payload.containsKey("transId") ? String.valueOf(payload.get("transId")) : null;
                        orderService.markOrderPaid(orderNumber, transactionId);
                    } else {
                        order.setStatus("CANCELLED");
                        orderRepository.save(order);
                    }
                }
            }
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
