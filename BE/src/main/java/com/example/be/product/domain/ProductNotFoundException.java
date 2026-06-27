package com.example.be.product.domain;

/**
 * Thrown when a requested product cannot be found.
 */
public class ProductNotFoundException extends RuntimeException {

    public ProductNotFoundException(String slug) {
        super("Product not found: " + slug);
    }

    public ProductNotFoundException(Long id) {
        super("Product not found: " + id);
    }
}
