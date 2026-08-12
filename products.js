/* products.js - centralized product data for Rohan Deals
   This is the ONLY file you need to edit when adding, removing, or updating products.

   Guidelines (beginner-friendly):
   - Add a new product object to the `products` array.
   - Required fields: `id`, `name`, `image`, and `affiliateLink`.
   - Recommended: include `createdAt` (ISO 8601 timestamp). This is the PRIMARY field used to
     determine which product is newest (e.g. "2026-08-11T14:30:00Z"). If `createdAt` is missing,
     `dateAdded` (YYYY-MM-DD) will be used as a fallback. If both are missing, `id` is used
     deterministically as a final fallback.
   - Optional fields (you may add these to help manage affiliate products):
     - `brand` : string (e.g. "BEHOMA")
     - `tags` : array of strings (e.g. ["home","decor"]) — useful for internal filtering
     - `features` : array of strings (e.g. ["Hand-hammered","Cylindrical"]) — shown in tooltips later
     - `dealType` : string (e.g. "limited", "clearance", "standard")
     These fields are fully optional; the site will continue to work if they are absent.
   - Keep product images inside the `/images` folder and reference them by path like
     "images/behoma-gold-floor-vase.jpg".
   - Do NOT include fake ratings, reviews, or prices. Use real verified values only.
*/

const products = [
  {
    id: 7,
    name: "BEHOMA Premium Hand-Hammered Gold Metal Floor Vase",
    category: "Home & Kitchen",
    description: "Elegant hand-hammered gold metal floor vase with a tapered cylindrical design. Ideal for artificial flowers, dried branches, pampas grass and as a decorative accent for living rooms, bedrooms, offices and entryways.",
    image: "images/behoma-gold-floor-vase.jpg",
    price: "₹3,798",
    originalPrice: "₹4,499",
    discount: "16% OFF",
    rating: "4.5",
    reviews: "12",
    affiliateLink: "https://link.amazon/B0frutAG9",
    material: "Iron",
    colour: "Golden Hammered",
    shape: "Cylindrical",
    dimensions: "20L × 20W × 62H cm",
    set: "Single",
    // Primary timestamp used to determine newest product. Use ISO 8601 format when adding new items.
    createdAt: "2026-08-11T12:00:00Z",
    // Optional legacy field (kept for compatibility). Not required if `createdAt` is present.
    dateAdded: "2026-08-11"
  },

  {
    id: 8,
    name: "WOODLAND Lace Up Lightweight Breathable Comfortable Daily Use Casuals For Men",
    category: "Fashion",
    description: "WOODLAND casual lace-up shoes designed for everyday wear, featuring a lightweight and breathable design with a classic camel/brown look. A versatile option for casual and daily wear.",
    image: "images/woodland-camel-casual-shoes.jpeg",
    price: "₹1,798",
    originalPrice: "₹4,995",
    discount: "64% OFF",
    rating: "3.8",
    reviews: "90",
    affiliateLink: "https://fktr.in/XBaL1Oe",
    brand: "WOODLAND",
    colour: "Camel / Brown",
    productType: "Casual Shoes",
    tags: ["Men's Shoes", "Casual Shoes", "WOODLAND", "Footwear", "Fashion", "Daily Wear"],
    features: [
        "Lace-up casual design",
        "Lightweight everyday footwear",
        "Breathable design",
        "Camel/brown colour",
        "Suitable for casual and daily wear"
    ],
    createdAt: "2026-08-11T13:30:00Z",
    dateAdded: "2026-08-11"
},
  {
    id: 9,
    name: "Xstore® Home Decor Lucky Deer Family Matte Finish Ceramic Figures",
    category: "Home & Kitchen",
    description: "Elegant matte-finish ceramic deer figurines designed to add a stylish decorative touch to living rooms, shelves, tables, cabinets and other home interiors.",
    image: "images/xtore-lucky-deer-family-ceramic-figures.jpg",
    price: "₹786",
    originalPrice: "₹1,999",
    discount: "61% OFF",
    rating: "4.3",
    reviews: "7,493",
    brand: "Xstore",
    colour: "Matte Brown",
    productType: "Decorative Ceramic Figures",
    set: "Set of 3",
    tags: [
      "Home Decor",
      "Ceramic Decor",
      "Deer Figurines",
      "Living Room Decor",
      "Table Decor",
      "Decorative Figures"
    ],
    features: [
      "Set of 3 decorative deer figures",
      "Matte finish ceramic construction",
      "Brown colour",
      "Suitable for home decoration",
      "Ideal for shelves, tables and cabinets"
    ],
    affiliateLink: "https://link.amazon/B06pJMNAn",
    createdAt: "2026-08-12T08:48:00Z",
    dateAdded: "2026-08-12"
  },

    {
    id: 10,
    name: "BEHOMA Golden Metal Vase for Home & Office Decor",
    category: "Home & Kitchen",
    description: "Elegant golden metal flower vase designed for living rooms, dining tables and corners. A stylish home decoration piece suitable for fresh and artificial flowers.",
    image: "images/behoma-golden-metal-vase-home-office.jpg",
    price: "₹663",
    originalPrice: "₹1,599",
    discount: "59% OFF",
    rating: "4.2",
    reviews: "155",
    affiliateLink: "https://link.amazon/B0c9lXEmQ",
    brand: "BEHOMA",
    productType: "Metal Flower Vase",
    colour: "Golden",
    tags: [
      "Home Decor",
      "Flower Vase",
      "Golden Vase",
      "Living Room Decor",
      "Office Decor",
      "Table Decor"
    ],
    features: [
      "Elegant golden finish",
      "Suitable for fresh and artificial flowers",
      "Ideal for living room and dining table",
      "Suitable for home and office decoration"
    ],
    createdAt: "2026-08-12T13:30:00Z",
    dateAdded: "2026-08-12"
  },

//   {
//   id: 11,
//   name: "FASHOR Women's Kurta Set",
//   category: "Fashion",
//   description: "Elegant lime green women's kurta set from FASHOR, featuring an ethnic design with a matching dupatta. A stylish choice for festive occasions, family gatherings and traditional everyday wear.",
//   image: "images/fashor-lime-green-womens-kurta-set.jpg",
//   price: "₹2,399",
//   originalPrice: "₹5,899",
//   discount: "59% OFF",
//   affiliateLink: "https://link.amazon/B0dHxmola",
//   brand: "FASHOR",
//   colour: "Lime Green",
//   productType: "Women's Kurta Set",
//   tags: [
//     "Women's Fashion",
//     "Kurta Set",
//     "Ethnic Wear",
//     "Indian Wear",
//     "FASHOR",
//     "Lime Green",
//     "Women's Clothing",
//     "Festive Wear"
//   ],
//   features: [
//     "Lime green colour",
//     "Ethnic-inspired design",
//     "Women's kurta set",
//     "Includes matching dupatta",
//     "Suitable for festive and traditional occasions"
//   ],
//   createdAt: "2026-08-12T20:50:00+05:30",
//   dateAdded: "2026-08-12"
// }
];

