package com.lumosaura.dto;

import com.lumosaura.model.Product;
import lombok.Data;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Data
public class ProductDTO {
    private Long id;
    private String slug;
    private String name;
    private BigDecimal price;
    private String category;
    private List<String> tags;
    private String scentNotes;
    private String description;
    private String details;
    private String burnTime;
    private Integer burnHours;
    private String size;
    private String imageUrl;
    private Integer stock;

    public static ProductDTO from(Product p) {
        ProductDTO dto = new ProductDTO();
        dto.setId(p.getId());
        dto.setSlug(p.getSlug());
        dto.setName(p.getName());
        dto.setPrice(p.getPrice());
        dto.setCategory(p.getCategory());
        dto.setTags(p.getTags() != null
                ? Arrays.asList(p.getTags().split(","))
                : List.of());
        dto.setScentNotes(p.getScentNotes());
        dto.setDescription(p.getDescription());
        dto.setDetails(p.getDetails());
        dto.setBurnTime(p.getBurnTime());
        dto.setBurnHours(p.getBurnHours());
        dto.setSize(p.getSize());
        dto.setImageUrl(p.getImageUrl());
        dto.setStock(p.getStock());
        return dto;
    }
}
