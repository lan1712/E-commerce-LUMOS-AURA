package com.lumosaura.service;

import com.lumosaura.dto.CreateOrderRequest;
import com.lumosaura.dto.OrderDTO;
import com.lumosaura.model.*;
import com.lumosaura.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final PromoCodeRepository promoCodeRepository;

    @Transactional
    public OrderDTO createOrder(CreateOrderRequest req, String userEmail) {
        // Resolve products and calculate subtotal
        List<OrderItem> items = new ArrayList<>();
        BigDecimal subtotal = BigDecimal.ZERO;

        for (CreateOrderRequest.OrderItemRequest itemReq : req.getItems()) {
            Product product = productRepository.findBySlug(itemReq.getProductSlug())
                    .orElseThrow(() -> new RuntimeException("Product not found: " + itemReq.getProductSlug()));
            BigDecimal lineTotal = product.getPrice().multiply(BigDecimal.valueOf(itemReq.getQuantity()));
            subtotal = subtotal.add(lineTotal);

            OrderItem item = OrderItem.builder()
                    .product(product)
                    .productName(product.getName())
                    .price(product.getPrice())
                    .quantity(itemReq.getQuantity())
                    .build();
            items.add(item);
        }

        // Promo code
        BigDecimal discount = BigDecimal.ZERO;
        String appliedCode = null;
        if (req.getPromoCode() != null && !req.getPromoCode().isBlank()) {
            Optional<PromoCode> promoOpt = promoCodeRepository.findByCodeIgnoreCase(req.getPromoCode());
            if (promoOpt.isPresent() && promoOpt.get().getActive()) {
                PromoCode promo = promoOpt.get();
                if ("PERCENT".equals(promo.getType())) {
                    discount = subtotal.multiply(promo.getValue()).divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
                } else {
                    discount = promo.getValue().min(subtotal);
                }
                appliedCode = promo.getCode();
            }
        }

        BigDecimal discountedSubtotal = subtotal.subtract(discount);
        BigDecimal shipping = discountedSubtotal.compareTo(BigDecimal.valueOf(100)) >= 0
                ? BigDecimal.ZERO
                : new BigDecimal("8.00");
        BigDecimal tax = discountedSubtotal.multiply(new BigDecimal("0.08")).setScale(2, RoundingMode.HALF_UP);
        BigDecimal total = discountedSubtotal.add(shipping).add(tax);

        // Generate order number
        String orderNumber = "LA-" + (100000 + new Random().nextInt(900000));

        // Resolve user (optional — guest checkout allowed)
        User user = null;
        String email = req.getEmail();
        if (userEmail != null) {
            user = userRepository.findByEmail(userEmail).orElse(null);
            if (user != null) email = user.getEmail();
        }

        Order order = Order.builder()
                .orderNumber(orderNumber)
                .user(user)
                .email(email)
                .subtotal(subtotal)
                .discount(discount)
                .shipping(shipping)
                .tax(tax)
                .total(total)
                .promoCode(appliedCode)
                .shipName(req.getShipName())
                .shipAddress(req.getShipAddress())
                .shipCity(req.getShipCity())
                .shipState(req.getShipState())
                .shipZip(req.getShipZip())
                .shipCountry(req.getShipCountry())
                .build();

        Order saved = orderRepository.save(order);

        // Link items to order
        items.forEach(item -> item.setOrder(saved));
        saved.setItems(items);
        orderRepository.save(saved);

        return OrderDTO.from(saved);
    }

    public List<OrderDTO> getUserOrders(String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        List<Order> orders = user != null
                ? orderRepository.findByUserOrderByCreatedAtDesc(user)
                : orderRepository.findByEmailOrderByCreatedAtDesc(email);
        return orders.stream().map(OrderDTO::from).collect(Collectors.toList());
    }

    public OrderDTO getOrder(String orderNumber, String email) {
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        // Basic ownership check
        if (order.getEmail() != null && !order.getEmail().equalsIgnoreCase(email)) {
            throw new RuntimeException("Access denied");
        }
        return OrderDTO.from(order);
    }
}
