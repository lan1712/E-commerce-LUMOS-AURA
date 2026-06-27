package com.example.be.wishlist.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    List<Wishlist> findByUserEmailOrderByAddedAtDesc(String email);
    Optional<Wishlist> findByUserEmailAndProductSlug(String email, String productSlug);
    boolean existsByUserEmailAndProductSlug(String email, String productSlug);
    void deleteByUserEmailAndProductSlug(String email, String productSlug);
}
