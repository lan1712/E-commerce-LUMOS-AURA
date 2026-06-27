package com.example.be.product.api;

import java.math.BigDecimal;
import java.util.Set;

public record ProductUpdateRequest(
    String name,
    String slug,
    BigDecimal price,
    String category,
    String description,
    String scentNotes,
    String details,
    String image,
    Set<String> thumbnails,
    String burnTime,
    Integer burnHours,
    String size,
    Set<String> tags,
    Boolean active
) {}
