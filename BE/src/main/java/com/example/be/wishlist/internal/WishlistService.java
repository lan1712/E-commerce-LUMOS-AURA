package com.example.be.wishlist.internal;

import com.example.be.auth.domain.User;
import com.example.be.auth.domain.UserRepository;
import com.example.be.product.domain.Product;
import com.example.be.product.domain.ProductRepository;
import com.example.be.wishlist.api.WishlistItemDTO;
import com.example.be.wishlist.domain.Wishlist;
import com.example.be.wishlist.domain.WishlistRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public WishlistService(WishlistRepository wishlistRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.wishlistRepository = wishlistRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    @Transactional(readOnly = true)
    public List<WishlistItemDTO> getUserWishlist(String email) {
        return wishlistRepository.findByUserEmailOrderByAddedAtDesc(email).stream()
                .map(w -> new WishlistItemDTO(
                        w.getProduct().getSlug(),
                        w.getProduct().getName(),
                        w.getProduct().getPrice(),
                        w.getProduct().getImage(),
                        w.getProduct().getCategory(),
                        w.getAddedAt()
                )).toList();
    }

    @Transactional
    public void addProductToWishlist(String email, String productSlug) {
        if (wishlistRepository.existsByUserEmailAndProductSlug(email, productSlug)) {
            return; // Already in wishlist
        }
        User user = userRepository.findByEmail(email).orElseThrow();
        Product product = productRepository.findBySlug(productSlug)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        Wishlist wishlist = new Wishlist();
        wishlist.setUser(user);
        wishlist.setProduct(product);
        wishlistRepository.save(wishlist);
    }

    @Transactional
    public void removeProductFromWishlist(String email, String productSlug) {
        wishlistRepository.deleteByUserEmailAndProductSlug(email, productSlug);
    }
}
