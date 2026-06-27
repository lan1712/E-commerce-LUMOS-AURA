package com.example.be.product.api;

import java.math.BigDecimal;
import java.util.List;

/**
 * DTO for sending product data to the frontend.
 * Avoids exposing JPA entity internals.
 * Note: `id` (string) equals `slug` for FE compatibility — the FE uses Product.id as slug.
 */
public record ProductDTO(
        Long dbId,        // numeric DB primary key
        String id,        // string slug — FE uses this as the product identifier
        String slug,
        String name,
        BigDecimal price,
        String category,
        List<String> tags,
        String scentNotes,
        String description,
        String details,
        String image,
        List<String> thumbnails,
        String burnTime,
        Integer burnHours,
        String size
) {}
