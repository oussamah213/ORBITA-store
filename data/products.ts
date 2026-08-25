import type { Product, ProductCategory } from "@/types/product";

const descriptions: Record<ProductCategory, string> = {
  Electronics: "Refined everyday technology, thoughtfully designed for effortless performance.",
  Gaming: "Responsive performance and considered ergonomics for every session.",
  Fashion: "A modern essential made with premium-feel materials and an easy silhouette.",
  Home: "A functional statement piece created to make daily living feel better.",
  Beauty: "A gentle, effective formula developed for a brighter daily ritual.",
  Sports: "Lightweight support and reliable performance, from warm-up to finish line.",
  Accessories: "A useful finishing touch with a clean form and lasting construction.",
  Appliances: "Smart, quiet convenience built for the rhythm of a modern home.",
};

type Seed = Omit<Product, "description" | "slug" | "subcategory" | "brand" | "originalPrice" | "discount" | "shortDescription" | "images" | "colors" | "sizes" | "specifications" | "features" | "isFeatured" | "isNew" | "isBestSeller">;
const realistic = (name: string) => `/products/realistic/${name}.webp`;

const seed: Seed[] = [
  { id: 1, name: "Orbit X9 Wireless Headphones", category: "Electronics", price: 129.99, oldPrice: 189.99, rating: 4.8, reviews: 842, badge: "SALE", image: realistic("headphones"), accent: "#5965e8", claimed: 72, trending: 1 },
  { id: 2, name: "NovaBook Air 14", category: "Electronics", price: 899, oldPrice: 1099, rating: 4.7, reviews: 326, badge: "SALE", image: realistic("laptop"), accent: "#7c8ba1", claimed: 64, trending: 3 },
  { id: 3, name: "Pulse Pro Gaming Mouse", category: "Gaming", price: 59.99, oldPrice: 84.99, rating: 4.9, reviews: 1237, badge: "BEST SELLER", image: realistic("mouse"), accent: "#8b5cf6", claimed: 86, trending: 2 },
  { id: 4, name: "Halo Smartwatch S2", category: "Electronics", price: 179, oldPrice: 239, rating: 4.6, reviews: 591, badge: "SALE", image: realistic("smartwatch"), accent: "#2563eb", claimed: 58 },
  { id: 5, name: "AeroFit Running Shoes", category: "Sports", price: 94, oldPrice: 130, rating: 4.7, reviews: 414, badge: "SALE", image: realistic("shoes"), accent: "#f97316", claimed: 79, trending: 4 },
  { id: 6, name: "LumiDesk Smart Lamp", category: "Home", price: 74.99, oldPrice: 99.99, rating: 4.8, reviews: 205, badge: "SALE", image: realistic("lamp"), accent: "#fbbf24", claimed: 47 },
  { id: 7, name: "Arc Mini Bluetooth Speaker", category: "Electronics", price: 69.99, rating: 4.6, reviews: 731, image: realistic("speaker"), accent: "#10b981", trending: 5 },
  { id: 8, name: "Vanta Mechanical Keyboard", category: "Gaming", price: 119, oldPrice: 149, rating: 4.8, reviews: 692, badge: "BEST SELLER", image: realistic("keyboard"), accent: "#ef4444" },
  { id: 9, name: "CloudForm Lounge Chair", category: "Home", price: 329, oldPrice: 399, rating: 4.7, reviews: 119, image: realistic("chair"), accent: "#d97706" },
  { id: 10, name: "Mira Everyday Crossbody", category: "Fashion", price: 79, rating: 4.5, reviews: 288, badge: "NEW", image: realistic("bag"), accent: "#be185d" },
  { id: 11, name: "ClearGlow Renewal Serum", category: "Beauty", price: 38, oldPrice: 48, rating: 4.8, reviews: 954, badge: "BEST SELLER", image: realistic("bottle"), accent: "#ec4899" },
  { id: 12, name: "Flux USB-C Travel Hub", category: "Accessories", price: 44.99, rating: 4.6, reviews: 487, image: realistic("hub"), accent: "#475569" },
  { id: 13, name: "Ember Temperature Mug", category: "Home", price: 64, rating: 4.5, reviews: 174, image: realistic("mug"), accent: "#ea580c" },
  { id: 14, name: "Vertex 4K Action Camera", category: "Electronics", price: 219, oldPrice: 279, rating: 4.7, reviews: 352, badge: "SALE", image: realistic("camera"), accent: "#0f172a" },
  { id: 15, name: "Nexa City Runner Jacket", category: "Fashion", price: 119, rating: 4.6, reviews: 221, badge: "NEW", image: realistic("jacket"), accent: "#4f46e5" },
  { id: 16, name: "CoreFlex Training Set", category: "Sports", price: 52, oldPrice: 68, rating: 4.5, reviews: 344, image: realistic("shoes"), accent: "#16a34a" },
  { id: 17, name: "Solis Polarized Sunglasses", category: "Accessories", price: 89, rating: 4.7, reviews: 198, badge: "NEW", image: realistic("sunglasses"), accent: "#0891b2" },
  { id: 18, name: "Brew One Compact Coffee Maker", category: "Appliances", price: 139, oldPrice: 179, rating: 4.8, reviews: 509, badge: "BEST SELLER", image: realistic("coffeemaker"), accent: "#92400e" },
  { id: 19, name: "Astra Handheld Console", category: "Gaming", price: 249, oldPrice: 299, rating: 4.9, reviews: 876, badge: "SALE", image: realistic("console"), cutoutImage: "/products/realistic/cutouts/console-cutout.webp", accent: "#7c3aed", stock: 4 },
  { id: 20, name: "Velora Silk Touch Blouse", category: "Fashion", price: 68, rating: 4.6, reviews: 142, badge: "NEW", image: realistic("blouse"), accent: "#db2777" },
  { id: 21, name: "AirPure Mini Purifier", category: "Appliances", price: 109, oldPrice: 149, rating: 4.7, reviews: 384, image: realistic("purifier"), cutoutImage: "/products/realistic/cutouts/purifier-cutout.webp", accent: "#0ea5e9", stock: 7 },
  { id: 22, name: "Rove Weekender Carryall", category: "Accessories", price: 98, rating: 4.8, reviews: 261, badge: "NEW", image: realistic("bag"), accent: "#0369a1" },
  { id: 23, name: "Dawn Hydration Cream", category: "Beauty", price: 42, rating: 4.9, reviews: 1108, badge: "BEST SELLER", image: realistic("bottle"), cutoutImage: "/products/realistic/cutouts/bottle-cutout.webp", accent: "#f472b6", stock: 12 },
  { id: 24, name: "Stride Recovery Roller", category: "Sports", price: 34.99, rating: 4.5, reviews: 197, image: realistic("roller"), cutoutImage: "/products/realistic/cutouts/roller-cutout.webp", accent: "#059669", stock: 9 },
  { id: 25, name: "Echo ANC Earbuds", category: "Electronics", price: 99, oldPrice: 139, rating: 4.7, reviews: 658, badge: "SALE", image: realistic("headphones"), accent: "#4338ca" },
  { id: 26, name: "Frame Digital Photo Display", category: "Home", price: 129, rating: 4.4, reviews: 103, badge: "NEW", image: realistic("display"), accent: "#b45309" },
  { id: 27, name: "Quanta Wireless Controller", category: "Gaming", price: 69, oldPrice: 89, rating: 4.8, reviews: 522, image: realistic("console"), cutoutImage: "/products/realistic/cutouts/console-cutout.webp", accent: "#2563eb", stock: 6 },
  { id: 28, name: "Studio Compact Hair Styler", category: "Beauty", price: 84, rating: 4.6, reviews: 310, badge: "NEW", image: realistic("hairstyler"), accent: "#c026d3" },
  { id: 29, name: "Terra Woven Throw", category: "Home", price: 58, rating: 4.8, reviews: 165, badge: "NEW", image: realistic("throw"), accent: "#c2410c" },
  { id: 30, name: "Motion Pro Fitness Watch", category: "Sports", price: 149, oldPrice: 189, rating: 4.7, reviews: 420, image: realistic("smartwatch"), accent: "#15803d", stock: 11 },
];

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const subcategories: Record<ProductCategory, string> = {
  Electronics: "Smart devices",
  Gaming: "Gaming gear",
  Fashion: "Modern wardrobe",
  Home: "Home & living",
  Beauty: "Beauty essentials",
  Sports: "Active lifestyle",
  Accessories: "Everyday accessories",
  Appliances: "Smart appliances",
};
const brands: Record<ProductCategory, string> = {
  Electronics: "ORBITA Labs",
  Gaming: "ORBITA Play",
  Fashion: "ORBITA Studio",
  Home: "ORBITA Living",
  Beauty: "ORBITA Ritual",
  Sports: "ORBITA Motion",
  Accessories: "ORBITA Supply",
  Appliances: "ORBITA Home",
};
const swatches = ["Midnight", "Cloud", "Indigo", "Sand"];

export const products: Product[] = seed.map((product) => {
  const originalPrice = product.oldPrice ?? product.price;
  const discount = originalPrice > product.price ? Math.round(((originalPrice - product.price) / originalPrice) * 100) : 0;
  return {
    ...product,
    slug: slugify(product.name),
    subcategory: subcategories[product.category],
    brand: brands[product.category],
    originalPrice,
    discount,
    shortDescription: descriptions[product.category],
    description: `${descriptions[product.category]} ${product.name} brings considered details, dependable performance and a premium finish to the moments that matter every day.`,
    images: [product.image],
    colors: swatches.slice(0, product.category === "Fashion" || product.category === "Accessories" ? 4 : 3),
    sizes: product.category === "Fashion" || product.category === "Sports" ? ["XS", "S", "M", "L", "XL"] : undefined,
    specifications: {
      Brand: brands[product.category],
      Category: product.category === "Home" ? "Home & Living" : product.category,
      Collection: "ORBITA 2026 Edit",
      "Care & finish": "Designed for everyday use",
    },
    features: ["Premium materials and considered construction", "Designed for effortless everyday use", "Backed by ORBITA support"],
    isFeatured: product.id % 3 !== 0,
    isNew: product.badge === "NEW",
    isBestSeller: product.badge === "BEST SELLER",
  };
});

export const dailyDeals = products.slice(0, 5);
export const trendingProducts = products.filter((product) => product.trending).sort((a, b) => (a.trending ?? 0) - (b.trending ?? 0));
export const bestSellers = products.filter((product) => product.badge === "BEST SELLER").slice(0, 4);
export const limitedStock = products.filter((product) => product.stock).slice(0, 5);
export const newArrivals = products.filter((product) => product.badge === "NEW").slice(0, 5);
export const recommended = [products[6], products[11], products[12], products[16], products[21], products[25]];

export const categoryNames: ProductCategory[] = ["Electronics", "Fashion", "Home", "Beauty", "Gaming", "Sports", "Accessories", "Appliances"];

export const categoryCatalog = categoryNames.map((name) => ({
  name,
  slug: name === "Home" ? "home-living" : slugify(name),
  description: descriptions[name],
  image: products.find((product) => product.category === name)?.cutoutImage ?? products.find((product) => product.category === name)?.image ?? "",
}));
