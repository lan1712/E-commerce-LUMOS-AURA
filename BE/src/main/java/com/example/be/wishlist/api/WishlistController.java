package com.example.be.wishlist.api;

import com.example.be.wishlist.internal.WishlistService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @GetMapping
    public ResponseEntity<List<WishlistItemDTO>> getWishlist(Principal principal) {
        return ResponseEntity.ok(wishlistService.getUserWishlist(principal.getName()));
    }

    @PostMapping("/{productSlug}")
    public ResponseEntity<Void> addToWishlist(Principal principal, @PathVariable String productSlug) {
        wishlistService.addProductToWishlist(principal.getName(), productSlug);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{productSlug}")
    public ResponseEntity<Void> removeFromWishlist(Principal principal, @PathVariable String productSlug) {
        wishlistService.removeProductFromWishlist(principal.getName(), productSlug);
        return ResponseEntity.ok().build();
    }
}
