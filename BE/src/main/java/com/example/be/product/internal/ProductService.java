package com.example.be.product.internal;

import com.example.be.product.api.ProductDTO;
import com.example.be.product.domain.Product;
import com.example.be.product.domain.ProductNotFoundException;
import com.example.be.product.domain.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Business logic for the product catalog.
 * Handles listing, filtering, searching and single product lookup.
 */
@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    /**
     * Returns all active products, optionally filtered by category or search term.
     *
     * @param category optional category filter (case-insensitive exact match)
     * @param search   optional search term matched against name, description, scentNotes
     */
    @Transactional(readOnly = true)
    public List<ProductDTO> getAllProducts(String category, String search) {
        List<Product> products;

        if (search != null && !search.isBlank()) {
            products = productRepository.findBySearchQuery(search.trim());
        } else if (category != null && !category.isBlank()) {
            products = productRepository.findByCategoryAndActiveTrue(category.trim());
        } else {
            products = productRepository.findByActiveTrue();
        }

        return products.stream().map(this::toDTO).toList();
    }

    /**
     * Returns a single active product by its slug.
     *
     * @param slug the URL-friendly product identifier
     * @throws ProductNotFoundException if not found or inactive
     */
    @Transactional(readOnly = true)
    public ProductDTO getProductBySlug(String slug) {
        Product product = productRepository.findBySlug(slug)
                .filter(Product::getActive)
                .orElseThrow(() -> new ProductNotFoundException(slug));
        return toDTO(product);
    }

    // ── Mapper ────────────────────────────────────────────────────────────────

    private ProductDTO toDTO(Product p) {
        return new ProductDTO(
                p.getId(),        // dbId — numeric PK
                p.getSlug(),      // id — string slug (FE uses this as product identifier)
                p.getSlug(),
                p.getName(),
                p.getPrice(),
                p.getCategory(),
                List.copyOf(p.getTags()),
                p.getScentNotes(),
                p.getDescription(),
                p.getDetails(),
                p.getImage(),
                List.copyOf(p.getThumbnails()),
                p.getBurnTime(),
                p.getBurnHours(),
                p.getSize()
        );
    }
}
