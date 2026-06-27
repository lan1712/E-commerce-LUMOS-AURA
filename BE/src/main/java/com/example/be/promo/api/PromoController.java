package com.example.be.promo.api;

import com.example.be.promo.internal.PromoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for promo code operations.
 * POST /api/promo/validate is public (no auth required).
 */
@RestController
@RequestMapping("/api/promo")
public class PromoController {

    private final PromoService promoService;

    public PromoController(PromoService promoService) {
        this.promoService = promoService;
    }

    /**
     * POST /api/promo/validate
     * Body: { "code": "LUMOS10" }
     * Returns: { valid, type, value, message }
     */
    @PostMapping("/validate")
    public ResponseEntity<PromoValidateResponse> validate(@Valid @RequestBody PromoValidateRequest request) {
        return ResponseEntity.ok(promoService.validate(request.code()));
    }
}
