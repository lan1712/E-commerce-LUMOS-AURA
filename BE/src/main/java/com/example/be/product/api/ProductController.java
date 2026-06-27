package com.example.be.product.api;

import com.example.be.product.internal.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller exposing the product catalog.
 *
 * <p>All endpoints are public (no JWT required) as configured in SecurityConfig.
 */
@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    /**
     * GET /api/products
     * Optional query params: category, search
     */
    @GetMapping
    public ResponseEntity<List<ProductDTO>> listProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(productService.getAllProducts(category, search));
    }

    /**
     * GET /{slug}
     */
    @GetMapping("/{slug}")
    public ResponseEntity<ProductDTO> getProduct(@PathVariable String slug) {
        return ResponseEntity.ok(productService.getProductBySlug(slug));
    }

    /**
     * POST /api/products
     * Admin only. Create a new product.
     */
    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(@RequestBody ProductCreateRequest request) {
        ProductDTO created = productService.createProduct(request);
        return ResponseEntity.ok(created);
    }

    /**
     * PUT /api/products/{id}
     * Admin only. Update an existing product.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable Long id,
            @RequestBody ProductUpdateRequest request) {
        ProductDTO updated = productService.updateProduct(id, request);
        return ResponseEntity.ok(updated);
    }

    /**
     * DELETE /api/products/{id}
     * Admin only. Soft delete a product.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
