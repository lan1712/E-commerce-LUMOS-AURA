package com.example.be.wishlist.api;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record WishlistItemDTO(
    String productSlug,
    String productName,
    BigDecimal price,
    String imageUrl,
    String category,
    LocalDateTime addedAt
) {}
