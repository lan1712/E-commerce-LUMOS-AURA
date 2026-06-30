-- Final Lumos Aura pricing and candle size variants.
-- Single candles:
--   70g  = 99,000 VND
--   150g = 170,000 VND
--   220g = 250,000 VND
-- Combos/accessories follow lumos_aura_schema_seed_final.sql.

UPDATE product_variants
SET is_default = FALSE
WHERE product_id BETWEEN 1 AND 8;

INSERT INTO product_variants (
    product_id, variant_name, sku, size_label, weight_grams, burn_time_hours,
    price, cost_price, stock_quantity, thumbnail_url, is_default, is_active
) VALUES
(1,'Moonlit Vanilla 70g','LA-MV-70','70g',70,'12-15 hours',99000,50000,40,'/images/products/moonlit-vanilla/moonlit-vanilla-70-main.jpg',FALSE,TRUE),
(1,'Moonlit Vanilla 150g','LA-MV-150','150g',150,'25-30 hours',170000,85000,30,'/images/products/moonlit-vanilla/moonlit-vanilla-150-main.jpg',TRUE,TRUE),
(1,'Moonlit Vanilla 220g','LA-MV-220','220g',220,'40-50 hours',250000,125000,20,'/images/products/moonlit-vanilla/moonlit-vanilla-220-main.jpg',FALSE,TRUE),
(2,'White Tea Serenity 70g','LA-WTS-70','70g',70,'12-15 hours',99000,50000,40,'/images/products/white-tea-serenity/white-tea-serenity-70-main.jpg',FALSE,TRUE),
(2,'White Tea Serenity 150g','LA-WTS-150','150g',150,'25-30 hours',170000,85000,30,'/images/products/white-tea-serenity/white-tea-serenity-150-main.jpg',TRUE,TRUE),
(2,'White Tea Serenity 220g','LA-WTS-220','220g',220,'40-50 hours',250000,125000,20,'/images/products/white-tea-serenity/white-tea-serenity-220-main.jpg',FALSE,TRUE),
(3,'Lavender Haze 70g','LA-LH-70','70g',70,'12-15 hours',99000,50000,40,'/images/products/lavender-haze/lavender-haze-70-main.jpg',FALSE,TRUE),
(3,'Lavender Haze 150g','LA-LH-150','150g',150,'25-30 hours',170000,85000,30,'/images/products/lavender-haze/lavender-haze-150-main.jpg',TRUE,TRUE),
(3,'Lavender Haze 220g','LA-LH-220','220g',220,'40-50 hours',250000,125000,20,'/images/products/lavender-haze/lavender-haze-220-main.jpg',FALSE,TRUE),
(4,'Citrus Bloom 70g','LA-CB-70','70g',70,'12-15 hours',99000,50000,40,'/images/products/citrus-bloom/citrus-bloom-70-main.jpg',FALSE,TRUE),
(4,'Citrus Bloom 150g','LA-CB-150','150g',150,'25-30 hours',170000,85000,30,'/images/products/citrus-bloom/citrus-bloom-150-main.jpg',TRUE,TRUE),
(4,'Citrus Bloom 220g','LA-CB-220','220g',220,'40-50 hours',250000,125000,20,'/images/products/citrus-bloom/citrus-bloom-220-main.jpg',FALSE,TRUE),
(5,'Sandalwood Ember 70g','LA-SE-70','70g',70,'12-15 hours',99000,50000,40,'/images/products/sandalwood-ember/sandalwood-ember-70-main.jpg',FALSE,TRUE),
(5,'Sandalwood Ember 150g','LA-SE-150','150g',150,'25-30 hours',170000,85000,30,'/images/products/sandalwood-ember/sandalwood-ember-150-main.jpg',TRUE,TRUE),
(5,'Sandalwood Ember 220g','LA-SE-220','220g',220,'40-50 hours',250000,125000,20,'/images/products/sandalwood-ember/sandalwood-ember-220-main.jpg',FALSE,TRUE),
(6,'Rose Blush 70g','LA-RB-70','70g',70,'12-15 hours',99000,50000,40,'/images/products/rose-blush/rose-blush-70-main.jpg',FALSE,TRUE),
(6,'Rose Blush 150g','LA-RB-150','150g',150,'25-30 hours',170000,85000,30,'/images/products/rose-blush/rose-blush-150-main.jpg',TRUE,TRUE),
(6,'Rose Blush 220g','LA-RB-220','220g',220,'40-50 hours',250000,125000,20,'/images/products/rose-blush/rose-blush-220-main.jpg',FALSE,TRUE),
(7,'Fresh Linen 70g','LA-FL-70','70g',70,'12-15 hours',99000,50000,40,'/images/products/fresh-linen/fresh-linen-70-main.jpg',FALSE,TRUE),
(7,'Fresh Linen 150g','LA-FL-150','150g',150,'25-30 hours',170000,85000,30,'/images/products/fresh-linen/fresh-linen-150-main.jpg',TRUE,TRUE),
(7,'Fresh Linen 220g','LA-FL-220','220g',220,'40-50 hours',250000,125000,20,'/images/products/fresh-linen/fresh-linen-220-main.jpg',FALSE,TRUE),
(8,'Midnight Coffee 70g','LA-MC-70','70g',70,'12-15 hours',99000,50000,40,'/images/products/midnight-coffee/midnight-coffee-70-main.jpg',FALSE,TRUE),
(8,'Midnight Coffee 150g','LA-MC-150','150g',150,'25-30 hours',170000,85000,30,'/images/products/midnight-coffee/midnight-coffee-150-main.jpg',TRUE,TRUE),
(8,'Midnight Coffee 220g','LA-MC-220','220g',220,'40-50 hours',250000,125000,20,'/images/products/midnight-coffee/midnight-coffee-220-main.jpg',FALSE,TRUE),
(9,'Discovery Set - 3 Minis','LA-DS3-SET','3 x 70g',210,'12-15 hours each',250000,150000,18,'/images/products/discovery-set-3-minis/discovery-set-main.jpg',TRUE,TRUE),
(10,'Cozy Night Gift Box','LA-CNGB-SET','1 candle 220g + card + matchbox',220,'40-50 hours',279000,170000,15,'/images/products/cozy-night-gift-box/cozy-night-gift-box-main.jpg',TRUE,TRUE),
(11,'Warm Home Duo Set','LA-WHDS-SET','2 x 150g candles',300,'25-30 hours each',320000,180000,12,'/images/products/warm-home-duo-set/warm-home-duo-main.jpg',TRUE,TRUE),
(12,'Wick Trimmer','LA-WT-001','1 tool',NULL,NULL,69000,35000,30,'/images/products/wick-trimmer/wick-trimmer-main.jpg',TRUE,TRUE),
(13,'Candle Snuffer','LA-CS-001','1 tool',NULL,NULL,79000,40000,30,'/images/products/candle-snuffer/candle-snuffer-main.jpg',TRUE,TRUE)
ON CONFLICT (sku) DO UPDATE SET
    variant_name = EXCLUDED.variant_name,
    size_label = EXCLUDED.size_label,
    weight_grams = EXCLUDED.weight_grams,
    burn_time_hours = EXCLUDED.burn_time_hours,
    price = EXCLUDED.price,
    cost_price = EXCLUDED.cost_price,
    stock_quantity = EXCLUDED.stock_quantity,
    thumbnail_url = EXCLUDED.thumbnail_url,
    is_default = EXCLUDED.is_default,
    is_active = EXCLUDED.is_active,
    updated_at = CURRENT_TIMESTAMP;
