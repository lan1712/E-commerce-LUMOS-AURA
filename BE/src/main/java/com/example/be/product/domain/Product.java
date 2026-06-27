package com.example.be.product.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Entity
@Table(name = "products", indexes = {
    @Index(name = "idx_products_slug", columnList = "slug", unique = true),
    @Index(name = "idx_products_category_id", columnList = "category_id"),
    @Index(name = "idx_products_active", columnList = "is_active")
})
@Getter
@Setter
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false, unique = true, length = 220)
    private String slug;

    @Column(name = "sku_prefix", length = 50)
    private String skuPrefix;

    @Column(name = "short_description", columnDefinition = "TEXT")
    private String shortDescription;

    @Column(name = "long_description", columnDefinition = "TEXT")
    private String longDescription;

    @Column(name = "product_type", nullable = false, length = 30)
    private String productType = "CANDLE";

    @Column(length = 255)
    private String mood;

    @Column(name = "scent_notes", columnDefinition = "TEXT")
    private String scentNotes;

    @Column(name = "top_notes")
    private String topNotes;

    @Column(name = "heart_notes")
    private String heartNotes;

    @Column(name = "base_notes")
    private String baseNotes;

    private String material;

    @Column(name = "burn_instruction", columnDefinition = "TEXT")
    private String burnInstruction;

    @Column(name = "care_instruction", columnDefinition = "TEXT")
    private String careInstruction;

    @Column(name = "recommended_space")
    private String recommendedSpace;

    @Column(name = "is_featured", nullable = false)
    private Boolean featured = false;

    @Column(name = "is_best_seller", nullable = false)
    private Boolean bestSeller = false;

    @Column(name = "is_active", nullable = false)
    private Boolean active = true;

    @Column(name = "seo_title")
    private String seoTitle;

    @Column(name = "seo_description", columnDefinition = "TEXT")
    private String seoDescription;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("id ASC")
    private List<ProductVariant> variants = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("sortOrder ASC, id ASC")
    private List<ProductImage> images = new ArrayList<>();

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public BigDecimal getPrice() {
        ProductVariant variant = getDefaultVariant();
        return variant != null ? variant.getPrice() : BigDecimal.ZERO;
    }

    public void setPrice(BigDecimal price) {
        ensureDefaultVariant().setPrice(price);
    }

    public String getCategory() {
        return category != null ? category.getName() : null;
    }

    public String getDescription() {
        return shortDescription;
    }

    public void setDescription(String description) {
        this.shortDescription = description;
    }

    public String getDetails() {
        return longDescription;
    }

    public void setDetails(String details) {
        this.longDescription = details;
    }

    public String getImage() {
        return images.stream()
                .filter(image -> Boolean.TRUE.equals(image.getPrimary()))
                .findFirst()
                .or(() -> images.stream().findFirst())
                .map(ProductImage::getImageUrl)
                .orElseGet(() -> {
                    ProductVariant variant = getDefaultVariant();
                    return variant != null ? variant.getThumbnailUrl() : null;
                });
    }

    public void setImage(String imageUrl) {
        ProductImage primaryImage = images.stream()
                .filter(image -> Boolean.TRUE.equals(image.getPrimary()))
                .findFirst()
                .orElseGet(() -> {
                    ProductImage image = new ProductImage();
                    image.setProduct(this);
                    image.setPrimary(true);
                    image.setImageType("THUMBNAIL");
                    image.setSortOrder(1);
                    images.add(image);
                    return image;
                });
        primaryImage.setImageUrl(imageUrl);
        ProductVariant variant = ensureDefaultVariant();
        variant.setThumbnailUrl(imageUrl);
    }

    public List<String> getThumbnails() {
        return images.stream()
                .sorted(Comparator.comparing(ProductImage::getSortOrder, Comparator.nullsLast(Integer::compareTo)))
                .map(ProductImage::getImageUrl)
                .toList();
    }

    public void setThumbnails(List<String> thumbnails) {
        images.clear();
        if (thumbnails == null) {
            return;
        }
        for (int i = 0; i < thumbnails.size(); i++) {
            ProductImage image = new ProductImage();
            image.setProduct(this);
            image.setImageUrl(thumbnails.get(i));
            image.setAltText(name);
            image.setImageType(i == 0 ? "THUMBNAIL" : "GALLERY");
            image.setSortOrder(i + 1);
            image.setPrimary(i == 0);
            images.add(image);
        }
    }

    public String getBurnTime() {
        ProductVariant variant = getDefaultVariant();
        return variant != null ? variant.getBurnTimeHours() : null;
    }

    public void setBurnTime(String burnTime) {
        ensureDefaultVariant().setBurnTimeHours(burnTime);
    }

    public Integer getBurnHours() {
        String burnTime = getBurnTime();
        if (burnTime == null || burnTime.isBlank()) {
            return null;
        }
        String firstNumber = burnTime.replaceAll("^[^0-9]*(\\d+).*$", "$1");
        try {
            return Integer.valueOf(firstNumber);
        } catch (NumberFormatException ignored) {
            return null;
        }
    }

    public void setBurnHours(Integer ignoredBurnHours) {
    }

    public String getSize() {
        ProductVariant variant = getDefaultVariant();
        return variant != null ? variant.getSizeLabel() : null;
    }

    public void setSize(String size) {
        ensureDefaultVariant().setSizeLabel(size);
    }

    public List<String> getTags() {
        List<String> tags = new ArrayList<>();
        if (mood != null && !mood.isBlank()) {
            for (String tag : mood.split(",")) {
                String trimmed = tag.trim();
                if (!trimmed.isBlank()) {
                    tags.add(trimmed);
                }
            }
        }
        if (productType != null && !productType.isBlank() && !tags.contains(productType)) {
            tags.add(productType);
        }
        return tags;
    }

    public void setTags(List<String> tags) {
        this.mood = tags == null ? null : String.join(", ", tags);
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        ensureDefaultVariant();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    private ProductVariant getDefaultVariant() {
        return variants.stream()
                .filter(variant -> Boolean.TRUE.equals(variant.getDefaultVariant()))
                .findFirst()
                .or(() -> variants.stream().findFirst())
                .orElse(null);
    }

    private ProductVariant ensureDefaultVariant() {
        ProductVariant variant = getDefaultVariant();
        if (variant == null) {
            variant = new ProductVariant();
            variant.setProduct(this);
            variant.setDefaultVariant(true);
            variant.setVariantName(name != null ? name : "Default variant");
            variant.setSku((skuPrefix != null ? skuPrefix : slug != null ? slug : "PRODUCT") + "-DEFAULT");
            variant.setPrice(BigDecimal.ZERO);
            variants.add(variant);
        }
        if (variant.getVariantName() == null && name != null) {
            variant.setVariantName(name);
        }
        if (variant.getSku() == null) {
            variant.setSku((skuPrefix != null ? skuPrefix : slug != null ? slug : "PRODUCT") + "-DEFAULT");
        }
        return variant;
    }
}
