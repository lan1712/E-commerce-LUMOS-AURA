package com.example.be.product.internal;

import com.example.be.product.api.ProductDTO;
import com.example.be.product.domain.Category;
import com.example.be.product.domain.CategoryRepository;
import com.example.be.product.domain.Product;
import com.example.be.product.domain.ProductNotFoundException;
import com.example.be.product.domain.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import com.example.be.product.api.ProductCreateRequest;
import com.example.be.product.api.ProductUpdateRequest;

/**
 * Business logic for the product catalog.
 * Handles listing, filtering, searching and single product lookup.
 */
@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
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

    @Transactional
    public ProductDTO createProduct(ProductCreateRequest request) {
        if (productRepository.findBySlug(request.slug()).isPresent()) {
            throw new IllegalArgumentException("Product with slug " + request.slug() + " already exists");
        }

        Product p = new Product();
        p.setName(request.name());
        p.setSlug(request.slug());
        p.setPrice(request.price());
        p.setCategory(resolveCategory(request.category()));
        p.setDescription(request.description());
        p.setScentNotes(request.scentNotes());
        p.setDetails(request.details());
        p.setImage(request.image());
        if (request.thumbnails() != null) p.setThumbnails(new ArrayList<>(request.thumbnails()));
        p.setBurnTime(request.burnTime());
        p.setBurnHours(request.burnHours());
        p.setSize(request.size());
        if (request.tags() != null) p.setTags(new ArrayList<>(request.tags()));
        p.setActive(true);

        Product saved = productRepository.save(p);
        return toDTO(saved);
    }

    @Transactional
    public ProductDTO updateProduct(Long id, ProductUpdateRequest request) {
        Product p = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("ID: " + id));

        if (request.name() != null) p.setName(request.name());
        if (request.slug() != null) {
            // Check if slug changed and is unique
            if (!p.getSlug().equals(request.slug()) && productRepository.findBySlug(request.slug()).isPresent()) {
                throw new IllegalArgumentException("Product with slug " + request.slug() + " already exists");
            }
            p.setSlug(request.slug());
        }
        if (request.price() != null) p.setPrice(request.price());
        if (request.category() != null) p.setCategory(resolveCategory(request.category()));
        if (request.description() != null) p.setDescription(request.description());
        if (request.scentNotes() != null) p.setScentNotes(request.scentNotes());
        if (request.details() != null) p.setDetails(request.details());
        if (request.image() != null) p.setImage(request.image());
        if (request.thumbnails() != null) p.setThumbnails(new ArrayList<>(request.thumbnails()));
        if (request.burnTime() != null) p.setBurnTime(request.burnTime());
        if (request.burnHours() != null) p.setBurnHours(request.burnHours());
        if (request.size() != null) p.setSize(request.size());
        if (request.tags() != null) p.setTags(new ArrayList<>(request.tags()));
        if (request.active() != null) p.setActive(request.active());

        Product saved = productRepository.save(p);
        return toDTO(saved);
    }

    @Transactional
    public void deleteProduct(Long id) {
        Product p = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("ID: " + id));
        p.setActive(false);
        productRepository.save(p);
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

    private Category resolveCategory(String categoryName) {
        if (categoryName == null || categoryName.isBlank()) {
            return categoryRepository.findBySlug("core-collection")
                    .orElseThrow(() -> new IllegalStateException("Default category not found"));
        }

        return categoryRepository.findByNameIgnoreCase(categoryName.trim())
                .orElseGet(() -> {
                    Category category = new Category();
                    category.setName(categoryName.trim());
                    category.setSlug(toSlug(categoryName.trim()));
                    category.setActive(true);
                    return categoryRepository.save(category);
                });
    }

    private String toSlug(String value) {
        String slug = value.toLowerCase()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-|-$)", "");
        return slug.isBlank() ? "category" : slug;
    }
}
