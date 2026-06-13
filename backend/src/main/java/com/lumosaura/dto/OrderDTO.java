package com.lumosaura.dto;

import com.lumosaura.model.Order;
import com.lumosaura.model.OrderItem;
import lombok.Data;
import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class OrderDTO {
    private String orderNumber;
    private String status;
    private String createdAt;
    private BigDecimal subtotal;
    private BigDecimal shipping;
    private BigDecimal tax;
    private BigDecimal discount;
    private BigDecimal total;
    private String promoCode;
    private String shipName;
    private String shipAddress;
    private String shipCity;
    private String shipState;
    private String shipZip;
    private String shipCountry;
    private List<ItemDTO> items;

    @Data
    public static class ItemDTO {
        private String productSlug;
        private String productName;
        private BigDecimal price;
        private Integer quantity;
        private String imageUrl;
    }

    public static OrderDTO from(Order o) {
        OrderDTO dto = new OrderDTO();
        dto.setOrderNumber(o.getOrderNumber());
        dto.setStatus(o.getStatus());
        dto.setCreatedAt(o.getCreatedAt().format(DateTimeFormatter.ofPattern("MMM dd, yyyy")));
        dto.setSubtotal(o.getSubtotal());
        dto.setShipping(o.getShipping());
        dto.setTax(o.getTax());
        dto.setDiscount(o.getDiscount());
        dto.setTotal(o.getTotal());
        dto.setPromoCode(o.getPromoCode());
        dto.setShipName(o.getShipName());
        dto.setShipAddress(o.getShipAddress());
        dto.setShipCity(o.getShipCity());
        dto.setShipState(o.getShipState());
        dto.setShipZip(o.getShipZip());
        dto.setShipCountry(o.getShipCountry());
        if (o.getItems() != null) {
            dto.setItems(o.getItems().stream().map(item -> {
                ItemDTO i = new ItemDTO();
                i.setProductName(item.getProductName());
                i.setPrice(item.getPrice());
                i.setQuantity(item.getQuantity());
                if (item.getProduct() != null) {
                    i.setProductSlug(item.getProduct().getSlug());
                    i.setImageUrl(item.getProduct().getImageUrl());
                }
                return i;
            }).collect(Collectors.toList()));
        }
        return dto;
    }
}
