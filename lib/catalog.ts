import { categoryCatalog, products } from "@/data/products";
import type { Product } from "@/types/product";

export type SortOption = "featured" | "best-selling" | "price-low" | "price-high" | "rating" | "newest";
export type CatalogFilters = { brands: string[]; minPrice: number; maxPrice: number; rating: number; inStock: boolean; discountOnly: boolean };

export const defaultFilters = (maxPrice = 1200): CatalogFilters => ({ brands: [], minPrice: 0, maxPrice, rating: 0, inStock: false, discountOnly: false });
export const categorySlug = (value: string) => value.toLowerCase() === "home" ? "home-living" : value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
export const categoryFromSlug = (slug: string) => categoryCatalog.find((category) => category.slug === slug);
export const productFromSlug = (slug: string) => products.find((product) => product.slug === slug);

export function searchProducts(query: string, source = products) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return source;
  return source.filter((product) => [product.name, product.category, product.subcategory, product.brand, product.description, product.shortDescription].join(" ").toLowerCase().includes(normalized));
}

export function filterProducts(source: Product[], filters: CatalogFilters) {
  return source.filter((product) => product.price >= filters.minPrice && product.price <= filters.maxPrice && (!filters.brands.length || filters.brands.includes(product.brand)) && (!filters.rating || product.rating >= filters.rating) && (!filters.inStock || (product.stock ?? 99) > 0) && (!filters.discountOnly || product.discount > 0));
}

export function sortProducts(source: Product[], sort: SortOption) {
  return [...source].sort((a, b) => {
    if (sort === "price-low") return a.price - b.price;
    if (sort === "price-high") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "newest") return Number(b.isNew) - Number(a.isNew) || b.id - a.id;
    if (sort === "best-selling") return Number(b.isBestSeller) - Number(a.isBestSeller) || b.reviews - a.reviews;
    return Number(b.isFeatured) - Number(a.isFeatured) || b.rating - a.rating;
  });
}

export const catalogBrands = Array.from(new Set(products.map((product) => product.brand)));
