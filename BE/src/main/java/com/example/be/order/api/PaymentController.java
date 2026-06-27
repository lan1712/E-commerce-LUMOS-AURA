package com.example.be.order.api;

import com.example.be.order.domain.Order;
import com.example.be.order.domain.OrderRepository;
import com.example.be.order.internal.vnpay.VNPayConfig;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment/vnpay")
public class PaymentController {

    private final OrderRepository orderRepository;
    private final VNPayConfig vnPayConfig;

    public PaymentController(OrderRepository orderRepository, VNPayConfig vnPayConfig) {
        this.orderRepository = orderRepository;
        this.vnPayConfig = vnPayConfig;
    }

    @GetMapping("/return")
    public ResponseEntity<Void> vnpayReturn(jakarta.servlet.http.HttpServletRequest request) {
        Map<String, String> fields = new HashMap<>();
        String queryString = request.getQueryString();
        if (queryString != null) {
            String[] params = queryString.split("&");
            for (String param : params) {
                String[] keyValue = param.split("=");
                if (keyValue.length == 2) {
                    String fieldName = keyValue[0];
                    String fieldValue = keyValue[1];
                    if (fieldValue != null && fieldValue.length() > 0) {
                        fields.put(fieldName, fieldValue);
                    }
                }
            }
        }

        String vnp_SecureHash = request.getParameter("vnp_SecureHash");
        fields.remove("vnp_SecureHashType");
        fields.remove("vnp_SecureHash");

        String signValue = vnPayConfig.hashAllFields(fields);
        System.out.println("--- VNPay Return Validation ---");
        System.out.println("Expected Hash: " + vnp_SecureHash);
        System.out.println("Calculated Hash: " + signValue);
        System.out.println("Raw fields map: " + fields);
        
        String frontendUrl = "http://localhost:5173/checkout/vnpay-return";
        if (signValue.equals(vnp_SecureHash)) {
            String rawTxnRef = request.getParameter("vnp_TxnRef");
            String orderNumber = null;
            if (rawTxnRef != null) {
                int lastDashIdx = rawTxnRef.lastIndexOf("-");
                orderNumber = (lastDashIdx > 0) ? rawTxnRef.substring(0, lastDashIdx) : rawTxnRef;
            }
            Order order = orderRepository.findByOrderNumber(orderNumber).orElse(null);
            
            if ("00".equals(request.getParameter("vnp_ResponseCode"))) {
                // Success
                if (order != null && "PENDING".equals(order.getStatus())) {
                    order.setStatus("PAID");
                    order.setTransactionId(request.getParameter("vnp_TransactionNo"));
                    orderRepository.save(order);
                }
                return ResponseEntity.status(HttpStatus.FOUND)
                        .location(URI.create(frontendUrl + "?status=success&orderNumber=" + orderNumber))
                        .build();
            } else {
                // Failed/Cancelled but we keep it PENDING for 5 mins retry window
                return ResponseEntity.status(HttpStatus.FOUND)
                        .location(URI.create(frontendUrl + "?status=failed&orderNumber=" + orderNumber))
                        .build();
            }
        } else {
            // Invalid signature
            return ResponseEntity.status(HttpStatus.FOUND)
                    .location(URI.create(frontendUrl + "?status=invalid"))
                    .build();
        }
    }

    @GetMapping("/ipn")
    public ResponseEntity<Map<String, String>> vnpayIpn(jakarta.servlet.http.HttpServletRequest request) {
        Map<String, String> fields = new HashMap<>();
        String queryString = request.getQueryString();
        if (queryString != null) {
            String[] params = queryString.split("&");
            for (String param : params) {
                String[] keyValue = param.split("=");
                if (keyValue.length == 2) {
                    String fieldName = keyValue[0];
                    String fieldValue = keyValue[1];
                    if (fieldValue != null && fieldValue.length() > 0) {
                        fields.put(fieldName, fieldValue);
                    }
                }
            }
        }

        String vnp_SecureHash = request.getParameter("vnp_SecureHash");
        fields.remove("vnp_SecureHashType");
        fields.remove("vnp_SecureHash");

        String signValue = vnPayConfig.hashAllFields(fields);
        System.out.println("--- VNPay IPN Validation ---");
        System.out.println("Expected Hash: " + vnp_SecureHash);
        System.out.println("Calculated Hash: " + signValue);
        System.out.println("Raw fields map: " + fields);
        
        Map<String, String> response = new HashMap<>();

        if (signValue.equals(vnp_SecureHash)) {
            String rawTxnRef = request.getParameter("vnp_TxnRef");
            String orderNumber = null;
            if (rawTxnRef != null) {
                int lastDashIdx = rawTxnRef.lastIndexOf("-");
                orderNumber = (lastDashIdx > 0) ? rawTxnRef.substring(0, lastDashIdx) : rawTxnRef;
            }
            String responseCode = request.getParameter("vnp_ResponseCode");

            Order order = orderRepository.findByOrderNumber(orderNumber).orElse(null);
            if (order != null) {
                if ("PENDING".equals(order.getStatus())) {
                    if ("00".equals(responseCode)) {
                        order.setStatus("PAID");
                        order.setTransactionId(request.getParameter("vnp_TransactionNo"));
                        orderRepository.save(order);
                    } else {
                        // Failed, keep PENDING
                    }
                    response.put("RspCode", "00");
                    response.put("Message", "Confirm Success");
                } else {
                    response.put("RspCode", "02");
                    response.put("Message", "Order already confirmed");
                }
            } else {
                response.put("RspCode", "01");
                response.put("Message", "Order not found");
            }
        } else {
            response.put("RspCode", "97");
            response.put("Message", "Invalid Checksum");
        }
        return ResponseEntity.ok(response);
    }
}
