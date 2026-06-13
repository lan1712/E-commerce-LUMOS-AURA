package com.lumosaura.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "promo_codes")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PromoCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String code;

    @Column(nullable = false)
    private String type; // PERCENT | FIXED

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal value;

    @Builder.Default
    private Boolean active = true;

    private LocalDateTime expiresAt;
}
