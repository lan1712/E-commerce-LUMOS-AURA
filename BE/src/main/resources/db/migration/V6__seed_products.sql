-- Seed 10 candle products from the FE data.ts
-- Images use relative paths; FE will use its local imports as fallback

INSERT INTO products (slug, name, price, category, scent_notes, description, details, image, burn_time, burn_hours, size, active)
VALUES
  ('sandalwood-moonstone', 'Sandalwood & Moonstone', 48.00, 'Woody',
   'Sandalwood, White Musk, Vanilla',
   'A warm, grounding fragrance that evokes ancient forests and moonlit temples. Rich sandalwood base notes weave through soft white musk and a touch of creamy vanilla.',
   'Hand-poured into a matte ceramic vessel. 100% natural soy wax with cotton wick. Cruelty-free and vegan.',
   '/images/sandalwood-moonstone.png', '45–55 hrs', 45, '220g / 7.7 oz', true),

  ('amber-fig', 'Amber & Fig', 52.00, 'Fruity',
   'Amber, Fig, Labdanum, Toasted Wood',
   'Sun-warmed amber resin meets lush Mediterranean fig. Hints of labdanum and toasted wood give it a rich, addictive depth.',
   'Hand-poured in small batches. Premium fragrance oils in a clear glass vessel. Phthalate-free.',
   '/images/amber-fig.png', '50–60 hrs', 50, '250g / 8.8 oz', true),

  ('vetiver-smoke', 'Vetiver & Smoke', 48.00, 'Earthy',
   'Vetiver, Charred Birch, Black Pepper',
   'Smoky vetiver root, charred birch and black pepper create an atmospheric, contemplative scent.',
   'Frosted glass vessel. All-natural essential oil blend. Lead-free wick.',
   '/images/vetiver-smoke.png', '45–55 hrs', 45, '220g / 7.7 oz', true),

  ('bergamot-silk', 'Bergamot & Silk', 45.00, 'Fresh',
   'Bergamot, White Tea, Iris',
   'Bright Calabrian bergamot opens onto a silky floral heart of white tea and iris. Clean, luminous and endlessly uplifting.',
   'Minimalist clear glass jar with linen label. Sustainably sourced wax blend.',
   '/images/bergamot-silk.png', '40–50 hrs', 40, '200g / 7.0 oz', true),

  ('midnight-constellation', 'Midnight Constellation', 68.00, 'Woody',
   'Oud, Cosmic Musk, Black Rose',
   'Dark oud, cosmic musk and a whisper of black rose create an enigmatic nocturnal fragrance.',
   'Dark glass vessel with gold accents. Premium oud oil blend. Limited edition.',
   '/images/midnight-constellation.png', '55–65 hrs', 55, '280g / 9.9 oz', true),

  ('solar-flare', 'Solar Flare', 62.00, 'Fresh',
   'Yuzu, Blood Orange, Warm Amber',
   'Sun-drenched yuzu, blood orange and warm amber resin — a burst of pure golden energy.',
   'White ceramic vessel. Natural soy and coconut wax blend. Cruelty-free.',
   '/images/solar-flare.png', '50–60 hrs', 50, '250g / 8.8 oz', true),

  ('ethereal-bloom', 'Ethereal Bloom', 55.00, 'Floral',
   'Peony, Magnolia, Dewy Green',
   'Peony, magnolia blossom and dewy green notes create a hazy, dreamlike floral.',
   'Frosted glass with pressed flower label. Pure essential oil blend. Vegan and cruelty-free.',
   '/images/ethereal-bloom.png', '48–58 hrs', 48, '240g / 8.5 oz', true),

  ('cedar-rain', 'Midnight Cedar', 45.00, 'Woody',
   'Sandalwood, Amber, Vetiver',
   'Crisp cedar and damp stone grounded in amber. An olfactory meditation on mountain air after a storm.',
   'Aged clay vessel. 100% natural botanical ingredients.',
   '/images/cedar-rain.png', '40–50 hrs', 40, '220g / 7.7 oz', true),

  ('palo-santo', 'Palo Santo Glow', 52.00, 'Woody',
   'Palo Santo, Myrrh, Bergamot',
   'Sacred palo santo meets resinous myrrh and bright bergamot. Purifying, warming, deeply grounding.',
   'Matte terracotta vessel. Sustainably sourced palo santo oil.',
   '/images/palo-santo.png', '50–60 hrs', 50, '250g / 8.8 oz', true),

  ('wild-fig', 'Wild Fig', 48.00, 'Fresh',
   'Fig Leaf, Galbanum, Cedarwood',
   'Fig leaf, galbanum and smooth cedarwood — wild, green, and quietly intoxicating.',
   'Handcrafted porcelain vessel. 100% natural soy wax.',
   '/images/wild-fig.png', '40–50 hrs', 40, '220g / 7.7 oz', true);

-- Tags for each product
INSERT INTO product_tags (product_id, tag)
SELECT id, 'Woody' FROM products WHERE slug = 'sandalwood-moonstone';

INSERT INTO product_tags (product_id, tag)
SELECT id, tag FROM products, (VALUES ('Fruity'), ('Warm')) AS t(tag) WHERE slug = 'amber-fig';

INSERT INTO product_tags (product_id, tag)
SELECT id, 'Earthy' FROM products WHERE slug = 'vetiver-smoke';

INSERT INTO product_tags (product_id, tag)
SELECT id, 'Fresh' FROM products WHERE slug = 'bergamot-silk';

INSERT INTO product_tags (product_id, tag)
SELECT id, 'Woody' FROM products WHERE slug = 'midnight-constellation';

INSERT INTO product_tags (product_id, tag)
SELECT id, tag FROM products, (VALUES ('Fresh'), ('Fruity')) AS t(tag) WHERE slug = 'solar-flare';

INSERT INTO product_tags (product_id, tag)
SELECT id, 'Floral' FROM products WHERE slug = 'ethereal-bloom';

INSERT INTO product_tags (product_id, tag)
SELECT id, 'Woody' FROM products WHERE slug = 'cedar-rain';

INSERT INTO product_tags (product_id, tag)
SELECT id, 'Woody' FROM products WHERE slug = 'palo-santo';

INSERT INTO product_tags (product_id, tag)
SELECT id, 'Fresh' FROM products WHERE slug = 'wild-fig';
