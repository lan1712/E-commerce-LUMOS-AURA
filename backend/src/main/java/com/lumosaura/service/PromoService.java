package com.lumosaura.service;

import com.lumosaura.model.PromoCode;
import com.lumosaura.repository.PromoCodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PromoService {

    private final PromoCodeRepository promoCodeRepository;

    public Map<String, Object> validate(String code) {
        Optional<PromoCode> opt = promoCodeRepository.findByCodeIgnoreCase(code);

        if (opt.isEmpty()) {
            return Map.of("valid", false, "message", "Invalid promo code");
        }

        PromoCode promo = opt.get();

        if (!promo.getActive()) {
            return Map.of("valid", false, "message", "This promo code is no longer active");
        }

        if (promo.getExpiresAt() != null && promo.getExpiresAt().isBefore(LocalDateTime.now())) {
            return Map.of("valid", false, "message", "This promo code has expired");
        }

        return Map.of(
                "valid", true,
                "code", promo.getCode(),
                "type", promo.getType(),
                "value", promo.getValue(),
                "label", promo.getType().equals("PERCENT")
                        ? promo.getValue().intValue() + "% off"
                        : "$" + promo.getValue().intValue() + " off"
        );
    }
}
