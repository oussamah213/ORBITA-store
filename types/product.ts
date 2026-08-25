export type ProductCategory =
  | "Electronics"
  | "Gaming"
  | "Fashion"
  | "Home"
  | "Beauty"
  | "Sports"
  | "Accessories"
  | "Appliances";

export type ProductBadge = "SALE" | "NEW" | "BEST SELLER";

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  slug: string;
  subcategory: string;
  brand: string;
  price: number;
  oldPrice?: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  shortDescription: string;
  badge?: ProductBadge;
  image: string;
  images: string[];
  cutoutImage?: string;
  alternateImage?: string;
  colors: string[];
  sizes?: string[];
  specifications: Record<string, string>;
  features: string[];
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  accent: string;
  description: string;
  claimed?: number;
  stock?: number;
  trending?: number;
}
