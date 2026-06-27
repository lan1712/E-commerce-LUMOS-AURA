import imgSandalwood from "../imports/HomeLumosAura/f5be82208bfdc5e4d93a71451009595a34deb872.png";
import imgAmberFig from "../imports/HomeLumosAura/cd8216ef4f20895fa9a8b5cae663a04cfe51fc83.png";
import imgVetiver from "../imports/HomeLumosAura/4af68bbcbc48cd55a4d8e10fdbaa906eae5d7be7.png";
import imgBergamot from "../imports/HomeLumosAura/ce929be74c7889399fda17ceda0d74bb35f840ed.png";
import imgMidnight from "../imports/HomeLumosAura/e20461d26cc4b2b2ed29be51e67b95a078876351.png";
import imgSolarFlare from "../imports/HomeLumosAura/92121682ba5b0af343e646dd9225d8d81ac38661.png";
import imgEtherealBloomColl from "../imports/HomeLumosAura/e6aa01c6daf65ce594ba372b7d9f259a62aeb204.png";
import imgShopProduct1 from "../imports/ShopAllCandlesLumosAura/7083cbd9b52d1a7ac79f639fc672d086eb09e983.png";
import imgShopProduct2 from "../imports/ShopAllCandlesLumosAura/cc5576f87db596d7d3969c0dc08758ae2e97536f.png";
import imgShopProduct3 from "../imports/ShopAllCandlesLumosAura/ce446b6485ef17726ef8aac500d30af016e37a5d.png";
export { default as imgEtherealBloomCandle } from "../imports/EtherealBloomProductDetail/ad1ac47c617506b69eafc6d246eecf7b11798d0b.png";
export { default as imgThumb1 } from "../imports/EtherealBloomProductDetail/ebc92afcb81783e9c18a34dcc8393940a49858ce.png";
export { default as imgThumb2 } from "../imports/EtherealBloomProductDetail/5b8be29cb7a673dc58024f67981342104d1fb7cb.png";
export { default as imgThumb3 } from "../imports/EtherealBloomProductDetail/5c1d7c6b55b8b440ae09818e4921207724310037.png";
export { default as imgHero } from "../imports/HomeLumosAura/351aa6ce61a879337822c71b4b73a7a8723a4de0.png";
export { default as imgAbstractScent } from "../imports/HomeLumosAura/27380e3a1a433b59bbb47b71e4b73282ec75268f.png";
export { default as imgBrandTexture } from "../imports/HomeLumosAura/9c4ffb73b493fa4731ca8267c88f54440ce40380.png";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  tags: string[];
  scentNotes: string; // "Sandalwood, Amber, Vetiver" style
  description: string;
  details: string;
  image: string;
  thumbnails?: string[];
  burnTime: string;
  burnHours: number; // for filtering
  size: string;
}

export const products: Product[] = [
  {
    id: "sandalwood-moonstone",
    name: "Sandalwood & Moonstone",
    price: 48,
    category: "Woody",
    tags: ["Woody"],
    scentNotes: "Sandalwood, White Musk, Vanilla",
    description: "A warm, grounding fragrance that evokes ancient forests and moonlit temples. Rich sandalwood base notes weave through soft white musk and a touch of creamy vanilla.",
    details: "Hand-poured into a matte ceramic vessel. 100% natural soy wax with cotton wick. Cruelty-free and vegan.",
    image: imgSandalwood,
    burnTime: "45–55 hrs",
    burnHours: 45,
    size: "220g / 7.7 oz",
  },
  {
    id: "amber-fig",
    name: "Amber & Fig",
    price: 52,
    category: "Fruity",
    tags: ["Fruity", "Warm"],
    scentNotes: "Amber, Fig, Labdanum, Toasted Wood",
    description: "Sun-warmed amber resin meets lush Mediterranean fig. Hints of labdanum and toasted wood give it a rich, addictive depth.",
    details: "Hand-poured in small batches. Premium fragrance oils in a clear glass vessel. Phthalate-free.",
    image: imgAmberFig,
    burnTime: "50–60 hrs",
    burnHours: 50,
    size: "250g / 8.8 oz",
  },
  {
    id: "vetiver-smoke",
    name: "Vetiver & Smoke",
    price: 48,
    category: "Earthy",
    tags: ["Earthy"],
    scentNotes: "Vetiver, Charred Birch, Black Pepper",
    description: "Smoky vetiver root, charred birch and black pepper create an atmospheric, contemplative scent.",
    details: "Frosted glass vessel. All-natural essential oil blend. Lead-free wick.",
    image: imgVetiver,
    burnTime: "45–55 hrs",
    burnHours: 45,
    size: "220g / 7.7 oz",
  },
  {
    id: "bergamot-silk",
    name: "Bergamot & Silk",
    price: 45,
    category: "Fresh",
    tags: ["Fresh"],
    scentNotes: "Bergamot, White Tea, Iris",
    description: "Bright Calabrian bergamot opens onto a silky floral heart of white tea and iris. Clean, luminous and endlessly uplifting.",
    details: "Minimalist clear glass jar with linen label. Sustainably sourced wax blend.",
    image: imgBergamot,
    burnTime: "40–50 hrs",
    burnHours: 40,
    size: "200g / 7.0 oz",
  },
  {
    id: "midnight-constellation",
    name: "Midnight Constellation",
    price: 68,
    category: "Woody",
    tags: ["Woody"],
    scentNotes: "Oud, Cosmic Musk, Black Rose",
    description: "Dark oud, cosmic musk and a whisper of black rose create an enigmatic nocturnal fragrance.",
    details: "Dark glass vessel with gold accents. Premium oud oil blend. Limited edition.",
    image: imgMidnight,
    burnTime: "55–65 hrs",
    burnHours: 55,
    size: "280g / 9.9 oz",
  },
  {
    id: "solar-flare",
    name: "Solar Flare",
    price: 62,
    category: "Fresh",
    tags: ["Fresh", "Fruity"],
    scentNotes: "Yuzu, Blood Orange, Warm Amber",
    description: "Sun-drenched yuzu, blood orange and warm amber resin — a burst of pure golden energy.",
    details: "White ceramic vessel. Natural soy and coconut wax blend. Cruelty-free.",
    image: imgSolarFlare,
    burnTime: "50–60 hrs",
    burnHours: 50,
    size: "250g / 8.8 oz",
  },
  {
    id: "ethereal-bloom",
    name: "Ethereal Bloom",
    price: 55,
    category: "Floral",
    tags: ["Floral"],
    scentNotes: "Peony, Magnolia, Dewy Green",
    description: "Peony, magnolia blossom and dewy green notes create a hazy, dreamlike floral.",
    details: "Frosted glass with pressed flower label. Pure essential oil blend. Vegan and cruelty-free.",
    image: imgEtherealBloomColl,
    burnTime: "48–58 hrs",
    burnHours: 48,
    size: "240g / 8.5 oz",
  },
  {
    id: "cedar-rain",
    name: "Midnight Cedar",
    price: 45,
    category: "Woody",
    tags: ["Woody"],
    scentNotes: "Sandalwood, Amber, Vetiver",
    description: "Crisp cedar and damp stone grounded in amber. An olfactory meditation on mountain air after a storm.",
    details: "Aged clay vessel. 100% natural botanical ingredients.",
    image: imgShopProduct1,
    burnTime: "40–50 hrs",
    burnHours: 40,
    size: "220g / 7.7 oz",
  },
  {
    id: "palo-santo",
    name: "Palo Santo Glow",
    price: 52,
    category: "Woody",
    tags: ["Woody"],
    scentNotes: "Palo Santo, Myrrh, Bergamot",
    description: "Sacred palo santo meets resinous myrrh and bright bergamot. Purifying, warming, deeply grounding.",
    details: "Matte terracotta vessel. Sustainably sourced palo santo oil.",
    image: imgShopProduct2,
    burnTime: "50–60 hrs",
    burnHours: 50,
    size: "250g / 8.8 oz",
  },
  {
    id: "wild-fig",
    name: "Wild Fig",
    price: 48,
    category: "Fresh",
    tags: ["Fresh"],
    scentNotes: "Fig Leaf, Galbanum, Cedarwood",
    description: "Fig leaf, galbanum and smooth cedarwood — wild, green, and quietly intoxicating.",
    details: "Handcrafted porcelain vessel. 100% natural soy wax.",
    image: imgShopProduct3,
    burnTime: "40–50 hrs",
    burnHours: 40,
    size: "220g / 7.7 oz",
  },
];
