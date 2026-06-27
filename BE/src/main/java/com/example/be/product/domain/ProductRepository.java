package com.example.be.product.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

/**
 * Repository for Product entities.
 * Provides standard CRUD plus domain-specific query methods.
 */
public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findBySlug(String slug);

    List<Product> findByActiveTrue();

    List<Product> findByCategoryAndActiveTrue(String category);

    List<Product> findBySlugIn(List<String> slugs);

    /**
     * Case-insensitive full-text search across name, description, and scentNotes
     * for active products only.
     */
    @Query("SELECT p FROM Product p WHERE p.active = true AND (" +
           "LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.description) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           "LOWER(p.scentNotes) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Product> findBySearchQuery(@Param("query") String query);
}
