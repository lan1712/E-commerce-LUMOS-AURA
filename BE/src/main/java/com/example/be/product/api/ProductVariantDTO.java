package com.example.be.product.api;

import java.math.BigDecimal;

public record ProductVariantDTO(
        Long id,
        String variantName,
        String sku,
        String sizeLabel,
        Integer weightGrams,
        String burnTime,
        BigDecimal price,
        Integer stockQuantity,
        String thumbnailUrl,
        Boolean defaultVariant
) {}
