package com.example.be.product.api;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.Set;

public record ProductCreateRequest(
    @NotBlank(message = "Name is required") String name,
    @NotBlank(message = "Slug is required") String slug,
    @NotNull(message = "Price is required") BigDecimal price,
    @NotBlank(message = "Category is required") String category,
    String description,
    String scentNotes,
    String details,
    String image,
    Set<String> thumbnails,
    String burnTime,
    Integer burnHours,
    String size,
    Set<String> tags
) {}
