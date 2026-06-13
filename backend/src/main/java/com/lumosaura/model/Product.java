package com.lumosaura.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String slug;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    private String category;

    // Store as comma-separated string
    private String tags;

    @Column(length = 500)
    private String scentNotes;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String details;

    private String burnTime;
    private Integer burnHours;
    private String size;

    @Column(length = 500)
    private String imageUrl;

    @Builder.Default
    private Integer stock = 100;

    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
}
