package com.example.be.order.internal;

import com.example.be.auth.domain.User;
import com.example.be.auth.domain.UserRepository;
import com.example.be.order.api.CreateOrderRequest;
import com.example.be.order.api.OrderDTO;
import com.example.be.order.api.OrderItemDTO;
import com.example.be.order.domain.Order;
import com.example.be.order.domain.OrderItem;
import com.example.be.order.domain.OrderRepository;
import com.example.be.product.domain.Product;
import com.example.be.product.domain.ProductNotFoundException;
import com.example.be.product.domain.ProductRepository;
import com.example.be.product.domain.ProductVariant;
import com.example.be.promo.domain.DiscountType;
import com.example.be.promo.domain.PromoCode;
import com.example.be.promo.internal.PromoService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.be.order.internal.vnpay.VNPayService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.List;
import com.example.be.order.internal.momo.MomoService;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

/**
 * Handles order creation and retrieval.
 */
@Service
public class OrderService {
    private static final BigDecimal OPENING_SALE_MULTIPLIER = new BigDecimal("0.70");
    private static final long OPENING_SALE_DAYS = 15;

    @Value("${opening-sale.start-date:2026-06-28T22:47:54+07:00}")
    private String openingSaleStartDate;

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final PromoService promoService;
    private final VNPayService vnPayService;
    private final MomoService momoService;

    public OrderService(OrderRepository orderRepository,
                        ProductRepository productRepository,
                        UserRepository userRepository,
                        PromoService promoService,
                        VNPayService vnPayService,
                        MomoService momoService) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.promoService = promoService;
        this.vnPayService = vnPayService;
        this.momoService = momoService;
    }

    /**
     * Creates a new order.
     *
     * @param request   the order request from FE
     * @param userEmail authenticated user email, or null for guest checkout
     */
    @Transactional
    public OrderDTO createOrder(CreateOrderRequest request, String userEmail) {
        // Resolve product slugs → entities in a single query
        List<String> slugs = request.items().stream()
                .map(CreateOrderRequest.OrderItemRequest::productSlug)
                .toList();
        Map<String, Product> productBySlug = productRepository.findBySlugIn(slugs)
                .stream().collect(Collectors.toMap(Product::getSlug, p -> p));

        // Build order
        Order order = new Order();
        order.setOrderNumber(generateOrderNumber());
        order.setEmail(request.email());
        order.setShipName(request.shipName());
        order.setShipAddress(request.shipAddress());
        order.setShipCity(request.shipCity());
        order.setShipState(request.shipState());
        order.setShipZip(request.shipZip());
        order.setShipCountry(request.shipCountry() != null ? request.shipCountry() : "US");
        order.setPaymentMethod(request.paymentMethod() != null ? request.paymentMethod() : "COD");

        // Link user if authenticated
        if (userEmail != null) {
            userRepository.findByEmail(userEmail).ifPresent(order::setUser);
        }

        // Build order items
        BigDecimal subtotal = BigDecimal.ZERO;
        for (CreateOrderRequest.OrderItemRequest itemReq : request.items()) {
            Product product = productBySlug.get(itemReq.productSlug());
            if (product == null) {
                throw new ProductNotFoundException(itemReq.productSlug());
            }

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(product);
            ProductVariant variant = resolveVariant(product, itemReq.variantId());
            item.setProductName(variant != null && variant.getSizeLabel() != null
                    ? product.getName() + " - " + variant.getSizeLabel()
                    : product.getName());
            BigDecimal currentPrice = getCurrentProductPrice(product, variant);
            item.setProductPrice(currentPrice);
            item.setQuantity(itemReq.quantity());
            BigDecimal lineTotal = currentPrice
                    .multiply(BigDecimal.valueOf(itemReq.quantity()))
                    .setScale(2, RoundingMode.HALF_UP);
            item.setLineTotal(lineTotal);
            order.getItems().add(item);
            subtotal = subtotal.add(lineTotal);
        }

        // Apply promo code if provided
        BigDecimal discount = BigDecimal.ZERO;
        if (request.promoCode() != null && !request.promoCode().isBlank()) {
            PromoCode promo = promoService.findValidPromo(request.promoCode());
            if (promo != null) {
                order.setPromoCode(promo.getCode());
                if (promo.getDiscountType() == DiscountType.PERCENTAGE) {
                    discount = subtotal.multiply(promo.getDiscountValue())
                            .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
                } else {
                    discount = promo.getDiscountValue().min(subtotal);
                }
            }
        }

        order.setSubtotal(subtotal);
        order.setDiscount(discount);
        order.setTotal(subtotal.subtract(discount).setScale(2, RoundingMode.HALF_UP));

        Order saved = orderRepository.save(order);

        // Add reward points for registered users
        if (userEmail != null) {
            userRepository.findByEmail(userEmail).ifPresent(u -> {
                int earnedPoints = saved.getTotal().divide(BigDecimal.TEN, RoundingMode.DOWN).intValue();
                u.setRewardPoints((u.getRewardPoints() != null ? u.getRewardPoints() : 0) + earnedPoints);
                userRepository.save(u);
            });
        }

        if ("VNPAY".equalsIgnoreCase(saved.getPaymentMethod())) {
            HttpServletRequest requestAttr = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
            String orderInfo = "Payment for order " + saved.getOrderNumber();
            String paymentUrl = vnPayService.createOrder(saved.getOrderNumber(), saved.getTotal(), orderInfo, requestAttr);
            saved.setPaymentUrl(paymentUrl);
            orderRepository.save(saved);
        } else if ("MOMO".equalsIgnoreCase(saved.getPaymentMethod())) {
            String orderInfo = "Payment for order " + saved.getOrderNumber();
            String paymentUrl = momoService.createOrder(saved.getOrderNumber(), saved.getTotal(), orderInfo);
            saved.setPaymentUrl(paymentUrl);
            orderRepository.save(saved);
        }

        return toDTO(saved);
    }

    /**
     * Returns all orders for an authenticated user.
     */
    @Transactional(readOnly = true)
    public List<OrderDTO> getUserOrders(String userEmail) {
        return orderRepository.findByUserEmailOrderByCreatedAtDesc(userEmail)
                .stream().map(o -> toDTO(o)).toList();
    }

    /**
     * Returns a single order by order number, scoped to the authenticated user.
     */
    @Transactional(readOnly = true)
    public OrderDTO getOrderByNumber(String orderNumber, String userEmail) {
        Order order = orderRepository.findByOrderNumberAndUserEmail(orderNumber, userEmail)
                .orElseThrow(() -> new EntityNotFoundException("Order not found: " + orderNumber));
        return toDTO(order);
    }
    /**
     * Retries payment for a PENDING order, optionally updating the payment method.
     */
    @Transactional
    public OrderDTO retryPayment(String orderNumber, String newPaymentMethod, String userEmail) {
        Order order = orderRepository.findByOrderNumberAndUserEmail(orderNumber, userEmail)
                .orElseThrow(() -> new EntityNotFoundException("Order not found: " + orderNumber));
        
        if (!"PENDING".equalsIgnoreCase(order.getStatus())) {
            throw new IllegalStateException("Cannot retry payment for an order that is not PENDING");
        }
        
        // Update payment method if provided
        if (newPaymentMethod != null && !newPaymentMethod.isBlank()) {
            if (!List.of("VNPAY", "MOMO", "COD").contains(newPaymentMethod.toUpperCase())) {
                throw new IllegalArgumentException("Invalid payment method: " + newPaymentMethod);
            }
            order.setPaymentMethod(newPaymentMethod.toUpperCase());
        }
        
        if ("COD".equalsIgnoreCase(order.getPaymentMethod())) {
            order.setPaymentUrl(null);
        } else {
            String orderInfo = "Payment for order " + order.getOrderNumber();
            String paymentUrl;
            if ("VNPAY".equalsIgnoreCase(order.getPaymentMethod())) {
                HttpServletRequest requestAttr = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
                paymentUrl = vnPayService.createOrder(order.getOrderNumber(), order.getTotal(), orderInfo, requestAttr);
            } else {
                paymentUrl = momoService.createOrder(order.getOrderNumber(), order.getTotal(), orderInfo);
            }
            order.setPaymentUrl(paymentUrl);
        }
        
        orderRepository.save(order);
        return toDTO(order);
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private String generateOrderNumber() {
        // Format: LA-XXXXXXXX (8 hex chars)
        String hex = Integer.toHexString(new Random().nextInt(0xFFFFFFF)).toUpperCase();
        String candidate = "LA-" + String.format("%8s", hex).replace(' ', '0');
        // Retry on collision (extremely rare)
        if (orderRepository.findByOrderNumber(candidate).isPresent()) {
            return generateOrderNumber();
        }
        return candidate;
    }

    private ProductVariant resolveVariant(Product product, Long variantId) {
        if (variantId == null) {
            return product.getVariants().stream()
                    .filter(variant -> Boolean.TRUE.equals(variant.getDefaultVariant()))
                    .findFirst()
                    .or(() -> product.getVariants().stream().findFirst())
                    .orElse(null);
        }
        return product.getVariants().stream()
                .filter(variant -> variant.getId().equals(variantId))
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("Product variant not found"));
    }

    private BigDecimal getCurrentProductPrice(Product product, ProductVariant variant) {
        BigDecimal basePrice = variant != null ? variant.getPrice() : product.getPrice();
        if (!isOpeningSaleActive()) {
            return basePrice;
        }
        return basePrice
                .multiply(OPENING_SALE_MULTIPLIER)
                .setScale(2, RoundingMode.HALF_UP);
    }

    private boolean isOpeningSaleActive() {
        try {
            Instant start = OffsetDateTime.parse(openingSaleStartDate).toInstant();
            Instant end = start.plus(Duration.ofDays(OPENING_SALE_DAYS));
            Instant now = Instant.now();
            return !now.isBefore(start) && now.isBefore(end);
        } catch (RuntimeException ignored) {
            return false;
        }
    }

    private OrderDTO toDTO(Order o) {
        List<OrderItemDTO> itemDTOs = o.getItems().stream()
                .map(item -> new OrderItemDTO(
                        item.getId(),
                        item.getProduct().getSlug(),
                        item.getProductName(),
                        item.getProduct().getImage(),
                        item.getProductPrice(),
                        item.getQuantity(),
                        item.getLineTotal()
                ))
                .toList();

        return new OrderDTO(
                o.getId(),
                o.getOrderNumber(),
                o.getEmail(),
                o.getStatus(),
                o.getShipName(),
                o.getShipAddress(),
                o.getShipCity(),
                o.getShipState(),
                o.getShipZip(),
                o.getShipCountry(),
                o.getSubtotal(),
                o.getDiscount(),
                o.getTotal(),
                o.getPromoCode(),
                o.getPaymentMethod(),
                o.getTransactionId(),
                o.getPaymentUrl(),
                itemDTOs,
                o.getCreatedAt()
        );
    }
}
