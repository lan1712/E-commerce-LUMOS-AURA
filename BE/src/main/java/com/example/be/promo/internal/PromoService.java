package com.example.be.promo.internal;

import com.example.be.promo.api.PromoValidateResponse;
import com.example.be.promo.domain.PromoCode;
import com.example.be.promo.domain.PromoCodeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Handles promo code validation business logic.
 */
@Service
public class PromoService {

    private final PromoCodeRepository promoCodeRepository;

    public PromoService(PromoCodeRepository promoCodeRepository) {
        this.promoCodeRepository = promoCodeRepository;
    }

    /**
     * Validates a promo code and returns discount info.
     * Returns valid=false if code doesn't exist, is inactive, or is expired.
     */
    @Transactional(readOnly = true)
    public PromoValidateResponse validate(String code) {
        return promoCodeRepository.findByCodeIgnoreCase(code)
                .map(promo -> {
                    if (!promo.isValid()) {
                        return PromoValidateResponse.invalid("Promo code is expired or inactive");
                    }
                    return PromoValidateResponse.valid(
                            promo.getDiscountType().name(),
                            promo.getDiscountValue()
                    );
                })
                .orElse(PromoValidateResponse.invalid("Promo code not found"));
    }

    /**
     * Looks up a promo code entity for use in order creation.
     * Returns null if not found or invalid.
     */
    @Transactional(readOnly = true)
    public PromoCode findValidPromo(String code) {
        if (code == null || code.isBlank()) return null;
        return promoCodeRepository.findByCodeIgnoreCase(code)
                .filter(PromoCode::isValid)
                .orElse(null);
    }
}
