ALTER TABLE orders
    ADD COLUMN IF NOT EXISTS cancellation_reason VARCHAR(500),
    ADD COLUMN IF NOT EXISTS cancelled_at TIMESTAMP,
    ADD COLUMN IF NOT EXISTS refund_status VARCHAR(30);

CREATE INDEX IF NOT EXISTS idx_orders_refund_status ON orders(refund_status);
