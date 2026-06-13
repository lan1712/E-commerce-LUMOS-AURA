package com.lumosaura.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import java.util.List;

@Data
public class CreateOrderRequest {

    @Email @NotBlank
    private String email;

    @NotBlank private String shipName;
    @NotBlank private String shipAddress;
    @NotBlank private String shipCity;
    @NotBlank private String shipState;
    @NotBlank private String shipZip;
    private String shipCountry = "US";

    private String promoCode;

    @NotEmpty
    private List<OrderItemRequest> items;

    @Data
    public static class OrderItemRequest {
        private String productSlug;
        private Integer quantity;
    }
}
