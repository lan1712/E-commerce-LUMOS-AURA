CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    slug VARCHAR(200) NOT NULL UNIQUE,
    name VARCHAR(200) NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
    category VARCHAR(100),
    scent_notes TEXT,
    description TEXT,
    details TEXT,
    image VARCHAR(500),
    burn_time VARCHAR(100),
    burn_hours INTEGER,
    size VARCHAR(50),
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_product_slug ON products(slug);
CREATE INDEX idx_product_category ON products(category);
CREATE INDEX idx_product_active ON products(active);

CREATE TABLE product_tags (
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    tag VARCHAR(100) NOT NULL
);

CREATE TABLE product_thumbnails (
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    thumbnail VARCHAR(500) NOT NULL
);
