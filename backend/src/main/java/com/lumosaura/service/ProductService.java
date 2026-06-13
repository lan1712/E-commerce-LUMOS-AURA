package com.lumosaura.service;

import com.lumosaura.dto.ProductDTO;
import com.lumosaura.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<ProductDTO> getAll(String category, String search) {
        if (search != null && !search.isBlank()) {
            return productRepository.search(search).stream()
                    .map(ProductDTO::from).collect(Collectors.toList());
        }
        if (category != null && !category.isBlank()) {
            return productRepository.findByCategory(category).stream()
                    .map(ProductDTO::from).collect(Collectors.toList());
        }
        return productRepository.findAll().stream()
                .map(ProductDTO::from).collect(Collectors.toList());
    }

    public ProductDTO getBySlug(String slug) {
        return productRepository.findBySlug(slug)
                .map(ProductDTO::from)
                .orElseThrow(() -> new RuntimeException("Product not found: " + slug));
    }
}
