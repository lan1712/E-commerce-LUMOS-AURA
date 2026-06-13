package com.lumosaura.controller;

import com.lumosaura.dto.PromoValidateRequest;
import com.lumosaura.service.PromoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/promo")
@RequiredArgsConstructor
public class PromoController {

    private final PromoService promoService;

    @PostMapping("/validate")
    public ResponseEntity<?> validate(@RequestBody PromoValidateRequest req) {
        return ResponseEntity.ok(promoService.validate(req.getCode()));
    }
}
