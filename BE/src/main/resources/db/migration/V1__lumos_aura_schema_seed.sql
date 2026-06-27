-- LUMOS AURA - PostgreSQL schema + seed data

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(60) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(20) NOT NULL DEFAULT 'USER',
    status VARCHAR(20) DEFAULT 'ACTIVE',
    last_login TIMESTAMP,
    phone_number VARCHAR(20),
    reward_points INTEGER DEFAULT 0,
    otp VARCHAR(10),
    otp_expiry TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_email ON users(email);

CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(120) NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE collections (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(120) NOT NULL UNIQUE,
    description TEXT,
    banner_image_url TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    category_id BIGINT NOT NULL REFERENCES categories(id),
    name VARCHAR(200) NOT NULL,
    slug VARCHAR(220) NOT NULL UNIQUE,
    sku_prefix VARCHAR(50),
    short_description TEXT,
    long_description TEXT,
    product_type VARCHAR(30) NOT NULL DEFAULT 'CANDLE',
    mood VARCHAR(255),
    scent_notes TEXT,
    top_notes VARCHAR(255),
    heart_notes VARCHAR(255),
    base_notes VARCHAR(255),
    material VARCHAR(255),
    burn_instruction TEXT,
    care_instruction TEXT,
    recommended_space VARCHAR(255),
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_best_seller BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_variants (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    variant_name VARCHAR(150) NOT NULL,
    sku VARCHAR(100) NOT NULL UNIQUE,
    size_label VARCHAR(50),
    weight_grams INT,
    burn_time_hours VARCHAR(50),
    price NUMERIC(12,2) NOT NULL,
    compare_at_price NUMERIC(12,2),
    cost_price NUMERIC(12,2),
    stock_quantity INT NOT NULL DEFAULT 0,
    thumbnail_url TEXT,
    is_default BOOLEAN NOT NULL DEFAULT FALSE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_images (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    variant_id BIGINT REFERENCES product_variants(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    image_type VARCHAR(30) NOT NULL DEFAULT 'GALLERY',
    sort_order INT NOT NULL DEFAULT 0,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_collection_map (
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    collection_id BIGINT NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
    PRIMARY KEY (product_id, collection_id)
);

CREATE INDEX idx_products_category_id ON products(category_id);
CREATE UNIQUE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_type ON products(product_type);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_variants_product_id ON product_variants(product_id);
CREATE INDEX idx_product_images_product_id ON product_images(product_id);
CREATE INDEX idx_product_images_variant_id ON product_images(variant_id);
CREATE INDEX idx_pcm_collection_id ON product_collection_map(collection_id);

CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    user_id BIGINT REFERENCES users(id),
    email VARCHAR(255) NOT NULL,
    ship_name VARCHAR(200) NOT NULL,
    ship_address VARCHAR(500) NOT NULL,
    ship_city VARCHAR(100) NOT NULL,
    ship_state VARCHAR(100),
    ship_zip VARCHAR(20) NOT NULL,
    ship_country VARCHAR(2) DEFAULT 'US',
    subtotal DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2) DEFAULT 0,
    total DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    payment_method VARCHAR(50),
    transaction_id VARCHAR(100),
    promo_code VARCHAR(50),
    payment_url VARCHAR(1000),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_order_number ON orders(order_number);
CREATE INDEX idx_order_user_id ON orders(user_id);
CREATE INDEX idx_order_created_at ON orders(created_at);

CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL REFERENCES products(id),
    product_name VARCHAR(200) NOT NULL,
    product_price DECIMAL(10, 2) NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    line_total DECIMAL(10, 2) NOT NULL
);

CREATE INDEX idx_order_item_order_id ON order_items(order_id);

CREATE TABLE addresses (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    label VARCHAR(50),
    name VARCHAR(200) NOT NULL,
    line1 VARCHAR(500) NOT NULL,
    line2 VARCHAR(500),
    city VARCHAR(100) NOT NULL,
    country VARCHAR(2) NOT NULL DEFAULT 'US',
    zip VARCHAR(20) NOT NULL,
    is_default BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_address_user_id ON addresses(user_id);

CREATE TABLE promo_codes (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    discount_type VARCHAR(20) NOT NULL CHECK (discount_type IN ('PERCENTAGE', 'FIXED')),
    discount_value DECIMAL(10, 2) NOT NULL CHECK (discount_value > 0),
    start_date TIMESTAMP,
    expiry_date TIMESTAMP,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (expiry_date IS NULL OR start_date IS NULL OR expiry_date > start_date)
);

CREATE UNIQUE INDEX idx_promo_code ON promo_codes(code);

CREATE TABLE wishlists (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    product_id BIGINT NOT NULL REFERENCES products(id),
    added_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uk_wishlists_user_product UNIQUE (user_id, product_id)
);

CREATE TABLE event_publication (
    id UUID NOT NULL PRIMARY KEY,
    listener_id VARCHAR(512) NOT NULL,
    event_type VARCHAR(512) NOT NULL,
    serialized_event TEXT NOT NULL,
    publication_date TIMESTAMP WITH TIME ZONE NOT NULL,
    completion_date TIMESTAMP WITH TIME ZONE,
    completion_attempts INTEGER NOT NULL DEFAULT 0,
    last_resubmission_date TIMESTAMP WITH TIME ZONE
);

INSERT INTO categories (id, name, slug, description, image_url, is_active) VALUES
(1, 'Core Collection', 'core-collection', 'Main candle line from Lumos Aura', '/images/categories/core-collection.jpg', TRUE),
(2, 'Gift Collection', 'gift-collection', 'Gift sets, mini combos and bundles', '/images/categories/gift-collection.jpg', TRUE),
(3, 'Accessories', 'accessories', 'Candle care tools and accessories', '/images/categories/accessories.jpg', TRUE);

INSERT INTO collections (id, name, slug, description, banner_image_url, is_featured, is_active) VALUES
(1, 'Best Seller', 'best-seller', 'Top selling Lumos Aura products', '/images/collections/best-seller-banner.jpg', TRUE, TRUE),
(2, 'Relax & Sleep', 'relax-sleep', 'Relaxing scents for slower evenings', '/images/collections/relax-sleep-banner.jpg', TRUE, TRUE),
(3, 'Focus & Work', 'focus-work', 'Scents for focus and work sessions', '/images/collections/focus-work-banner.jpg', TRUE, TRUE),
(4, 'Warm & Cozy', 'warm-cozy', 'Warm scents for cozy nights', '/images/collections/warm-cozy-banner.jpg', FALSE, TRUE),
(5, 'Gift for Her', 'gift-for-her', 'Elegant gift ideas', '/images/collections/gift-for-her-banner.jpg', FALSE, TRUE),
(6, 'Minimal & Clean', 'minimal-clean', 'Clean and minimal scent profiles', '/images/collections/minimal-clean-banner.jpg', FALSE, TRUE);

INSERT INTO products (
    id, category_id, name, slug, sku_prefix, short_description, long_description, product_type,
    mood, scent_notes, top_notes, heart_notes, base_notes, material, burn_instruction,
    care_instruction, recommended_space, is_featured, is_best_seller, is_active, seo_title, seo_description
) VALUES
(1,1,'Moonlit Vanilla','moonlit-vanilla','LA-MV','Soft vanilla blended with warm woods for slow evenings.','Moonlit Vanilla is made for calm nights, reading corners and thoughtful gifts.','CANDLE','Warm, cozy, slow evening, relaxing','Vanilla bean, cream, sandalwood, musk','Cream','Vanilla bean','Sandalwood, musk','Soy wax, cotton wick, glass jar','Trim wick to 0.5 cm before burning. Burn 2-3 hours each time.','Keep away from children, pets and flammable objects.','Bedroom, reading corner, gift set',TRUE,TRUE,TRUE,'Moonlit Vanilla | Lumos Aura','Warm vanilla candle for relaxing evenings.'),
(2,1,'White Tea Serenity','white-tea-serenity','LA-WTS','Clean white tea and bergamot for a spa-like room.','White Tea Serenity feels minimal, calm and easy to use every day.','CANDLE','Clean, spa-like, calm, elegant','White tea, bergamot, light musk','Bergamot','White tea','Light musk','Soy wax, cotton wick, glass jar','Trim wick to 0.5 cm before burning. Burn 2-3 hours each time.','Keep away from children, pets and flammable objects.','Workspace, living room, spa corner',TRUE,TRUE,TRUE,'White Tea Serenity | Lumos Aura','Clean white tea candle for calm spaces.'),
(3,1,'Lavender Haze','lavender-haze','LA-LH','Lavender and chamomile for rest, meditation and bedtime.','Lavender Haze is designed for evening rituals, skincare time and sleep routines.','CANDLE','Sleepy, healing, soft, calming','Lavender, chamomile, cotton','Cotton','Lavender','Chamomile','Soy wax, cotton wick, glass jar','Trim wick to 0.5 cm before burning. Burn 2-3 hours each time.','Keep away from children, pets and flammable objects.','Bedroom, bedside, self-care corner',FALSE,FALSE,TRUE,'Lavender Haze | Lumos Aura','Relaxing lavender candle for bedrooms.'),
(4,1,'Citrus Bloom','citrus-bloom','LA-CB','Fresh citrus energy for mornings and desks.','Citrus Bloom brings bergamot, lemon and orange blossom into bright work spaces.','CANDLE','Fresh, bright, energetic, morning','Bergamot, lemon, orange blossom','Lemon','Bergamot, orange blossom','Soft musk','Soy wax, cotton wick, glass jar','Trim wick to 0.5 cm before burning. Burn 2-3 hours each time.','Keep away from children, pets and flammable objects.','Desk, study room, bright living area',FALSE,FALSE,TRUE,'Citrus Bloom | Lumos Aura','Fresh citrus candle for work areas.'),
(5,1,'Sandalwood Ember','sandalwood-ember','LA-SE','Deep sandalwood, cedar and amber with a boutique-hotel feel.','Sandalwood Ember is warm, grounded and polished for living rooms or desks.','CANDLE','Deep, warm, hotel-luxury, sophisticated','Sandalwood, cedar, amber','Amber','Sandalwood','Cedar','Soy wax, cotton wick, glass jar','Trim wick to 0.5 cm before burning. Burn 2-3 hours each time.','Keep away from children, pets and flammable objects.','Living room, work desk, lounge corner',FALSE,FALSE,TRUE,'Sandalwood Ember | Lumos Aura','Warm sandalwood candle for refined spaces.'),
(6,1,'Rose Blush','rose-blush','LA-RB','Rose and peony with soft musk, elegant and giftable.','Rose Blush is gentle, floral and feminine for bedrooms, vanities and gift sets.','CANDLE','Feminine, soft, romantic, giftable','Rose, peony, soft musk','Peony','Rose','Soft musk','Soy wax, cotton wick, glass jar','Trim wick to 0.5 cm before burning. Burn 2-3 hours each time.','Keep away from children, pets and flammable objects.','Bedroom, vanity table, gift box',FALSE,TRUE,TRUE,'Rose Blush | Lumos Aura','Soft rose candle for gifting.'),
(7,1,'Fresh Linen','fresh-linen','LA-FL','Clean cotton scent like freshly washed sheets.','Fresh Linen keeps rooms light, airy and easy to enjoy every day.','CANDLE','Clean, airy, daily use, comforting','Cotton, soap accord, white musk','Cotton','Soap accord','White musk','Soy wax, cotton wick, glass jar','Trim wick to 0.5 cm before burning. Burn 2-3 hours each time.','Keep away from children, pets and flammable objects.','Bedroom, wardrobe corner, guest room',FALSE,FALSE,TRUE,'Fresh Linen | Lumos Aura','Clean cotton candle for minimal spaces.'),
(8,1,'Midnight Coffee','midnight-coffee','LA-MC','Roasted coffee, cacao and vanilla for late-night focus.','Midnight Coffee brings the quiet mood of a small cafe at night.','CANDLE','Warm, cafe-at-night, cozy, rich','Roasted coffee, cacao, vanilla','Roasted coffee','Cacao','Vanilla','Soy wax, cotton wick, glass jar','Trim wick to 0.5 cm before burning. Burn 2-3 hours each time.','Keep away from children, pets and flammable objects.','Desk, reading corner, living room at night',FALSE,FALSE,TRUE,'Midnight Coffee | Lumos Aura','Rich coffee candle for evening work.'),
(9,2,'Discovery Set - 3 Minis','discovery-set-3-minis','LA-DS3','A set of three mini candles for trying multiple scents.','Discovery Set helps customers explore Lumos Aura scents before choosing full size.','GIFT_SET','Trial, gifting, exploration','Custom 3 scents','-','-','-','Soy wax, cotton wick, glass jar, gift box','Burn each mini candle 1.5-2 hours each time.','Keep away from children, pets and flammable objects.','Gift box, trial purchase, travel',TRUE,TRUE,TRUE,'Discovery Set - 3 Minis | Lumos Aura','Three mini candles for trials or gifting.'),
(10,2,'Cozy Night Gift Box','cozy-night-gift-box','LA-CNGB','Gift box with candle, card and small accessories.','Cozy Night Gift Box is thoughtful, compact and easy to give for special occasions.','GIFT_SET','Giftable, warm, thoughtful','Usually Moonlit Vanilla or Lavender Haze','-','-','-','Soy wax candle, cotton wick, gift box, card, matchbox','Follow candle instruction included in the gift box.','Keep away from children, pets and flammable objects.','Gift campaign, special occasion',TRUE,FALSE,TRUE,'Cozy Night Gift Box | Lumos Aura','Candle gift box for birthdays and self-care.'),
(11,2,'Warm Home Duo Set','warm-home-duo-set','LA-WHDS','Two full-size candles for gifting or home styling.','Warm Home Duo Set pairs scents by mood and works well as a premium bundle.','GIFT_SET','Warm home, premium gifting, pairing','Any 2 selected scents','-','-','-','Soy wax candles, cotton wick, gift packaging','Follow candle instruction of each included candle.','Keep away from children, pets and flammable objects.','Gift set, bundle promotion',FALSE,FALSE,TRUE,'Warm Home Duo Set | Lumos Aura','Two full-size candles for gifting and decor.'),
(12,3,'Wick Trimmer','wick-trimmer','LA-WT','A candle care tool for cleaner, more even burning.','Wick Trimmer helps keep the flame steady and the candle jar clean.','ACCESSORY','Accessory, premium ritual','-','-','-','-','Metal candle care tool','Use to trim wick to approximately 0.5 cm before lighting.','Store in dry place.','Accessory upsell',FALSE,FALSE,TRUE,'Wick Trimmer | Lumos Aura','Candle wick trimmer for better burning.'),
(13,3,'Candle Snuffer','candle-snuffer','LA-CS','A clean way to extinguish candles with less smoke.','Candle Snuffer is an elegant accessory for candle rituals and gift sets.','ACCESSORY','Accessory, premium ritual','-','-','-','-','Metal candle care tool','Use to extinguish candle flame safely without blowing directly.','Store in dry place.','Accessory upsell',FALSE,FALSE,TRUE,'Candle Snuffer | Lumos Aura','Candle snuffer for a more refined ritual.');

INSERT INTO product_variants (
    id, product_id, variant_name, sku, size_label, weight_grams, burn_time_hours,
    price, compare_at_price, cost_price, stock_quantity, thumbnail_url, is_default, is_active
) VALUES
(1,1,'Moonlit Vanilla 220g','LA-MV-220','220g',220,'40-50 hours',269000,NULL,145000,35,'/images/products/moonlit-vanilla/moonlit-vanilla-220-main.jpg',TRUE,TRUE),
(2,2,'White Tea Serenity 220g','LA-WTS-220','220g',220,'40-50 hours',269000,NULL,145000,30,'/images/products/white-tea-serenity/white-tea-serenity-220-main.jpg',TRUE,TRUE),
(3,3,'Lavender Haze 220g','LA-LH-220','220g',220,'40-50 hours',269000,NULL,145000,28,'/images/products/lavender-haze/lavender-haze-220-main.jpg',TRUE,TRUE),
(4,4,'Citrus Bloom 220g','LA-CB-220','220g',220,'40-50 hours',269000,NULL,145000,25,'/images/products/citrus-bloom/citrus-bloom-220-main.jpg',TRUE,TRUE),
(5,5,'Sandalwood Ember 220g','LA-SE-220','220g',220,'40-50 hours',289000,NULL,155000,24,'/images/products/sandalwood-ember/sandalwood-ember-220-main.jpg',TRUE,TRUE),
(6,6,'Rose Blush 220g','LA-RB-220','220g',220,'40-50 hours',269000,NULL,145000,26,'/images/products/rose-blush/rose-blush-220-main.jpg',TRUE,TRUE),
(7,7,'Fresh Linen 220g','LA-FL-220','220g',220,'40-50 hours',259000,NULL,140000,32,'/images/products/fresh-linen/fresh-linen-220-main.jpg',TRUE,TRUE),
(8,8,'Midnight Coffee 220g','LA-MC-220','220g',220,'40-50 hours',289000,NULL,155000,20,'/images/products/midnight-coffee/midnight-coffee-220-main.jpg',TRUE,TRUE),
(9,9,'Discovery Set - 3 Minis','LA-DS3-SET','3 x 70g',210,'15-20 hours each',319000,NULL,180000,18,'/images/products/discovery-set-3-minis/discovery-set-main.jpg',TRUE,TRUE),
(10,10,'Cozy Night Gift Box','LA-CNGB-SET','1 candle + card + matchbox',NULL,'Depends on candle included',399000,NULL,230000,15,'/images/products/cozy-night-gift-box/cozy-night-gift-box-main.jpg',TRUE,TRUE),
(11,11,'Warm Home Duo Set','LA-WHDS-SET','2 x full size candles',440,'40-50 hours each',559000,NULL,320000,12,'/images/products/warm-home-duo-set/warm-home-duo-main.jpg',TRUE,TRUE),
(12,12,'Wick Trimmer','LA-WT-001','1 tool',NULL,NULL,129000,NULL,65000,30,'/images/products/wick-trimmer/wick-trimmer-main.jpg',TRUE,TRUE),
(13,13,'Candle Snuffer','LA-CS-001','1 tool',NULL,NULL,149000,NULL,78000,30,'/images/products/candle-snuffer/candle-snuffer-main.jpg',TRUE,TRUE);

INSERT INTO product_images (product_id, variant_id, image_url, alt_text, image_type, sort_order, is_primary) VALUES
(1,1,'/images/products/moonlit-vanilla/main.jpg','Moonlit Vanilla main image','THUMBNAIL',1,TRUE),
(1,1,'/images/products/moonlit-vanilla/lifestyle-1.jpg','Moonlit Vanilla lifestyle image','LIFESTYLE',2,FALSE),
(1,1,'/images/products/moonlit-vanilla/detail-1.jpg','Moonlit Vanilla detail image','DETAIL',3,FALSE),
(1,1,'/images/products/moonlit-vanilla/hero.jpg','Moonlit Vanilla hero banner','HERO',4,FALSE),
(2,2,'/images/products/white-tea-serenity/main.jpg','White Tea Serenity main image','THUMBNAIL',1,TRUE),
(2,2,'/images/products/white-tea-serenity/lifestyle-1.jpg','White Tea Serenity lifestyle image','LIFESTYLE',2,FALSE),
(2,2,'/images/products/white-tea-serenity/detail-1.jpg','White Tea Serenity detail image','DETAIL',3,FALSE),
(2,2,'/images/products/white-tea-serenity/hero.jpg','White Tea Serenity hero banner','HERO',4,FALSE),
(3,3,'/images/products/lavender-haze/main.jpg','Lavender Haze main image','THUMBNAIL',1,TRUE),
(3,3,'/images/products/lavender-haze/lifestyle-1.jpg','Lavender Haze lifestyle image','LIFESTYLE',2,FALSE),
(3,3,'/images/products/lavender-haze/detail-1.jpg','Lavender Haze detail image','DETAIL',3,FALSE),
(3,3,'/images/products/lavender-haze/hero.jpg','Lavender Haze hero banner','HERO',4,FALSE),
(4,4,'/images/products/citrus-bloom/main.jpg','Citrus Bloom main image','THUMBNAIL',1,TRUE),
(4,4,'/images/products/citrus-bloom/lifestyle-1.jpg','Citrus Bloom lifestyle image','LIFESTYLE',2,FALSE),
(4,4,'/images/products/citrus-bloom/detail-1.jpg','Citrus Bloom detail image','DETAIL',3,FALSE),
(4,4,'/images/products/citrus-bloom/hero.jpg','Citrus Bloom hero banner','HERO',4,FALSE),
(5,5,'/images/products/sandalwood-ember/main.jpg','Sandalwood Ember main image','THUMBNAIL',1,TRUE),
(5,5,'/images/products/sandalwood-ember/lifestyle-1.jpg','Sandalwood Ember lifestyle image','LIFESTYLE',2,FALSE),
(5,5,'/images/products/sandalwood-ember/detail-1.jpg','Sandalwood Ember detail image','DETAIL',3,FALSE),
(5,5,'/images/products/sandalwood-ember/hero.jpg','Sandalwood Ember hero banner','HERO',4,FALSE),
(6,6,'/images/products/rose-blush/main.jpg','Rose Blush main image','THUMBNAIL',1,TRUE),
(6,6,'/images/products/rose-blush/lifestyle-1.jpg','Rose Blush lifestyle image','LIFESTYLE',2,FALSE),
(6,6,'/images/products/rose-blush/detail-1.jpg','Rose Blush detail image','DETAIL',3,FALSE),
(6,6,'/images/products/rose-blush/hero.jpg','Rose Blush hero banner','HERO',4,FALSE),
(7,7,'/images/products/fresh-linen/main.jpg','Fresh Linen main image','THUMBNAIL',1,TRUE),
(7,7,'/images/products/fresh-linen/lifestyle-1.jpg','Fresh Linen lifestyle image','LIFESTYLE',2,FALSE),
(7,7,'/images/products/fresh-linen/detail-1.jpg','Fresh Linen detail image','DETAIL',3,FALSE),
(7,7,'/images/products/fresh-linen/hero.jpg','Fresh Linen hero banner','HERO',4,FALSE),
(8,8,'/images/products/midnight-coffee/main.jpg','Midnight Coffee main image','THUMBNAIL',1,TRUE),
(8,8,'/images/products/midnight-coffee/lifestyle-1.jpg','Midnight Coffee lifestyle image','LIFESTYLE',2,FALSE),
(8,8,'/images/products/midnight-coffee/detail-1.jpg','Midnight Coffee detail image','DETAIL',3,FALSE),
(8,8,'/images/products/midnight-coffee/hero.jpg','Midnight Coffee hero banner','HERO',4,FALSE),
(9,9,'/images/products/discovery-set-3-minis/main.jpg','Discovery Set main image','THUMBNAIL',1,TRUE),
(9,9,'/images/products/discovery-set-3-minis/lifestyle-1.jpg','Discovery Set lifestyle image','LIFESTYLE',2,FALSE),
(9,9,'/images/products/discovery-set-3-minis/detail-1.jpg','Discovery Set detail image','DETAIL',3,FALSE),
(9,9,'/images/products/discovery-set-3-minis/hero.jpg','Discovery Set hero banner','HERO',4,FALSE),
(10,10,'/images/products/cozy-night-gift-box/main.jpg','Cozy Night Gift Box main image','THUMBNAIL',1,TRUE),
(10,10,'/images/products/cozy-night-gift-box/lifestyle-1.jpg','Cozy Night Gift Box lifestyle image','LIFESTYLE',2,FALSE),
(10,10,'/images/products/cozy-night-gift-box/detail-1.jpg','Cozy Night Gift Box detail image','DETAIL',3,FALSE),
(11,11,'/images/products/warm-home-duo-set/main.jpg','Warm Home Duo Set main image','THUMBNAIL',1,TRUE),
(11,11,'/images/products/warm-home-duo-set/lifestyle-1.jpg','Warm Home Duo Set lifestyle image','LIFESTYLE',2,FALSE),
(11,11,'/images/products/warm-home-duo-set/detail-1.jpg','Warm Home Duo Set detail image','DETAIL',3,FALSE),
(12,12,'/images/products/wick-trimmer/main.jpg','Wick Trimmer main image','THUMBNAIL',1,TRUE),
(12,12,'/images/products/wick-trimmer/lifestyle-1.jpg','Wick Trimmer lifestyle image','LIFESTYLE',2,FALSE),
(13,13,'/images/products/candle-snuffer/main.jpg','Candle Snuffer main image','THUMBNAIL',1,TRUE),
(13,13,'/images/products/candle-snuffer/lifestyle-1.jpg','Candle Snuffer lifestyle image','LIFESTYLE',2,FALSE);

INSERT INTO product_collection_map (product_id, collection_id) VALUES
(1,1),(2,1),(6,1),(9,1),
(1,2),(2,2),(3,2),
(4,3),(7,3),(8,3),
(1,4),(5,4),(8,4),
(2,5),(3,5),(6,5),(10,5),
(2,6),(4,6),(7,6);

INSERT INTO promo_codes (code, discount_type, discount_value, active) VALUES
('LUMOS10', 'PERCENTAGE', 10.00, true),
('LUMOS20', 'PERCENTAGE', 20.00, true),
('WELCOME15', 'PERCENTAGE', 15.00, true),
('SAVE10', 'FIXED', 10.00, true);

SELECT setval('categories_id_seq', COALESCE((SELECT MAX(id) FROM categories), 1), TRUE);
SELECT setval('collections_id_seq', COALESCE((SELECT MAX(id) FROM collections), 1), TRUE);
SELECT setval('products_id_seq', COALESCE((SELECT MAX(id) FROM products), 1), TRUE);
SELECT setval('product_variants_id_seq', COALESCE((SELECT MAX(id) FROM product_variants), 1), TRUE);
SELECT setval('product_images_id_seq', COALESCE((SELECT MAX(id) FROM product_images), 1), TRUE);
