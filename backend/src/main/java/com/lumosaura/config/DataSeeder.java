package com.lumosaura.config;

import com.lumosaura.model.Product;
import com.lumosaura.model.PromoCode;
import com.lumosaura.repository.ProductRepository;
import com.lumosaura.repository.PromoCodeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;
    private final PromoCodeRepository promoCodeRepository;

    @Override
    public void run(String... args) {
        seedProducts();
        seedPromoCodes();
    }

    private void seedProducts() {
        if (productRepository.count() > 0) return;

        log.info("Seeding products...");
        List<Product> products = List.of(
            Product.builder()
                .slug("sandalwood-moonstone")
                .name("Sandalwood & Moonstone")
                .price(new BigDecimal("48.00"))
                .category("Woody")
                .tags("Woody")
                .scentNotes("Sandalwood, White Musk, Vanilla")
                .description("A warm, grounding fragrance that evokes ancient forests and moonlit temples. Rich sandalwood base notes weave through soft white musk and a touch of creamy vanilla.")
                .details("Hand-poured into a matte ceramic vessel. 100% natural soy wax with cotton wick. Cruelty-free and vegan.")
                .burnTime("45–55 hrs")
                .burnHours(45)
                .size("220g / 7.7 oz")
                .imageUrl("https://images.unsplash.com/photo-1605651202774-7d573fd3f12d?w=400&h=400&fit=crop")
                .build(),
            Product.builder()
                .slug("amber-fig")
                .name("Amber & Fig")
                .price(new BigDecimal("52.00"))
                .category("Fruity")
                .tags("Fruity,Warm")
                .scentNotes("Amber, Fig, Labdanum, Toasted Wood")
                .description("Sun-warmed amber resin meets lush Mediterranean fig. Hints of labdanum and toasted wood give it a rich, addictive depth.")
                .details("Hand-poured in small batches. Premium fragrance oils in a clear glass vessel. Phthalate-free.")
                .burnTime("50–60 hrs")
                .burnHours(50)
                .size("250g / 8.8 oz")
                .imageUrl("https://images.unsplash.com/photo-1612179543058-ab74d388e0ce?w=400&h=400&fit=crop")
                .build(),
            Product.builder()
                .slug("vetiver-smoke")
                .name("Vetiver & Smoke")
                .price(new BigDecimal("48.00"))
                .category("Earthy")
                .tags("Earthy")
                .scentNotes("Vetiver, Charred Birch, Black Pepper")
                .description("Smoky vetiver root, charred birch and black pepper create an atmospheric, contemplative scent.")
                .details("Frosted glass vessel. All-natural essential oil blend. Lead-free wick.")
                .burnTime("45–55 hrs")
                .burnHours(45)
                .size("220g / 7.7 oz")
                .imageUrl("https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400&h=400&fit=crop")
                .build(),
            Product.builder()
                .slug("bergamot-silk")
                .name("Bergamot & Silk")
                .price(new BigDecimal("45.00"))
                .category("Fresh")
                .tags("Fresh")
                .scentNotes("Bergamot, White Tea, Iris")
                .description("Bright Calabrian bergamot opens onto a silky floral heart of white tea and iris. Clean, luminous and endlessly uplifting.")
                .details("Minimalist clear glass jar with linen label. Sustainably sourced wax blend.")
                .burnTime("40–50 hrs")
                .burnHours(40)
                .size("200g / 7.0 oz")
                .imageUrl("https://images.unsplash.com/photo-1619799360851-a143fbc240b3?w=400&h=400&fit=crop")
                .build(),
            Product.builder()
                .slug("midnight-constellation")
                .name("Midnight Constellation")
                .price(new BigDecimal("68.00"))
                .category("Woody")
                .tags("Woody")
                .scentNotes("Oud, Cosmic Musk, Black Rose")
                .description("Dark oud, cosmic musk and a whisper of black rose create an enigmatic nocturnal fragrance.")
                .details("Dark glass vessel with gold accents. Premium oud oil blend. Limited edition.")
                .burnTime("55–65 hrs")
                .burnHours(55)
                .size("280g / 9.9 oz")
                .imageUrl("https://images.unsplash.com/photo-1598634222670-87c5f558119c?w=400&h=400&fit=crop")
                .build(),
            Product.builder()
                .slug("solar-flare")
                .name("Solar Flare")
                .price(new BigDecimal("62.00"))
                .category("Fresh")
                .tags("Fresh,Fruity")
                .scentNotes("Yuzu, Blood Orange, Warm Amber")
                .description("Sun-drenched yuzu, blood orange and warm amber resin — a burst of pure golden energy.")
                .details("White ceramic vessel. Natural soy and coconut wax blend. Cruelty-free.")
                .burnTime("50–60 hrs")
                .burnHours(50)
                .size("250g / 8.8 oz")
                .imageUrl("https://images.unsplash.com/photo-1627823569857-4d8581dc62b2?w=400&h=400&fit=crop")
                .build(),
            Product.builder()
                .slug("ethereal-bloom")
                .name("Ethereal Bloom")
                .price(new BigDecimal("55.00"))
                .category("Floral")
                .tags("Floral")
                .scentNotes("Peony, Jasmine, Soft Musk")
                .description("A bouquet of fresh peony and jasmine petals, softened with a luminous white musk base.")
                .details("Hand-poured into a frosted white vessel. Soy-coconut wax blend. Cotton-core wick.")
                .burnTime("50–60 hrs")
                .burnHours(50)
                .size("250g / 8.8 oz")
                .imageUrl("https://images.unsplash.com/photo-1719043082409-ac6fa7e5d68d?w=400&h=400&fit=crop")
                .build(),
            Product.builder()
                .slug("cedar-horizon")
                .name("Cedar Horizon")
                .price(new BigDecimal("50.00"))
                .category("Woody")
                .tags("Woody,Earthy")
                .scentNotes("Atlas Cedar, Petrichor, Moss")
                .description("The scent of rain on warm earth, cedar forests stretching to the horizon. Grounding and meditative.")
                .details("Recycled amber glass vessel. Certified organic soy wax. Cotton wick.")
                .burnTime("45–55 hrs")
                .burnHours(45)
                .size("220g / 7.7 oz")
                .imageUrl("https://images.unsplash.com/photo-1642698215110-87817f1fbe0e?w=400&h=400&fit=crop")
                .build(),
            Product.builder()
                .slug("rose-noir")
                .name("Rose Noir")
                .price(new BigDecimal("72.00"))
                .category("Floral")
                .tags("Floral,Warm")
                .scentNotes("Damask Rose, Oud, Dark Patchouli")
                .description("A deeply sensual interpretation of the rose — darkened with oud and patchouli, lit with a velvet warmth.")
                .details("Black matte ceramic vessel with rose-gold lid. Artisan-poured. Limited edition.")
                .burnTime("60–70 hrs")
                .burnHours(60)
                .size("300g / 10.6 oz")
                .imageUrl("https://images.unsplash.com/photo-1556836234-6798bfd4f28f?w=400&h=400&fit=crop")
                .build(),
            Product.builder()
                .slug("sea-salt-driftwood")
                .name("Sea Salt & Driftwood")
                .price(new BigDecimal("46.00"))
                .category("Fresh")
                .tags("Fresh,Earthy")
                .scentNotes("Sea Salt, Driftwood, Coastal Air")
                .description("Breathe in the open sea — salted air, bleached driftwood, and the cool clarity of the horizon.")
                .details("Hand-poured in a ribbed clear glass jar. Soy wax with coconut blend. Unbleached wick.")
                .burnTime("40–50 hrs")
                .burnHours(40)
                .size("200g / 7.0 oz")
                .imageUrl("https://images.unsplash.com/photo-1580445206726-c6eace8e02e3?w=400&h=400&fit=crop")
                .build()
        );

        productRepository.saveAll(products);
        log.info("Seeded {} products.", products.size());
    }

    private void seedPromoCodes() {
        if (promoCodeRepository.count() > 0) return;

        log.info("Seeding promo codes...");
        List<PromoCode> codes = List.of(
            PromoCode.builder().code("LUMOS10").type("PERCENT").value(new BigDecimal("10")).build(),
            PromoCode.builder().code("WELCOME15").type("PERCENT").value(new BigDecimal("15")).build(),
            PromoCode.builder().code("AURA20").type("FIXED").value(new BigDecimal("20")).build(),
            PromoCode.builder().code("FREESHIP").type("FIXED").value(new BigDecimal("8")).build()
        );
        promoCodeRepository.saveAll(codes);
        log.info("Seeded {} promo codes.", codes.size());
    }
}
