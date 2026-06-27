-- Seed promo codes for testing
INSERT INTO promo_codes (code, discount_type, discount_value, active)
VALUES
  ('LUMOS10', 'PERCENTAGE', 10.00, true),
  ('LUMOS20', 'PERCENTAGE', 20.00, true),
  ('WELCOME15', 'PERCENTAGE', 15.00, true),
  ('SAVE10', 'FIXED', 10.00, true);
