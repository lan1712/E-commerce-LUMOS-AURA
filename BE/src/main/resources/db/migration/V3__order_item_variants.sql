ALTER TABLE order_items
    ADD COLUMN IF NOT EXISTS variant_id BIGINT REFERENCES product_variants(id);

CREATE INDEX IF NOT EXISTS idx_order_item_variant_id ON order_items(variant_id);
