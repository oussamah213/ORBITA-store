"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Filter, SlidersHorizontal, Star, X } from "lucide-react";
import { ProductGrid } from "@/components/product/product-card";
import { catalogBrands, defaultFilters, filterProducts, sortProducts, type CatalogFilters, type SortOption } from "@/lib/catalog";
import type { Product } from "@/types/product";

const sortLabels: Record<SortOption, string> = { featured: "Featured", "best-selling": "Best selling", "price-low": "Price: Low to High", "price-high": "Price: High to Low", rating: "Highest rated", newest: "Newest" };

export function CatalogListing({ products, title, description, resultLabel, query }: { products: Product[]; title: string; description: string; resultLabel?: string; query?: string }) {
  const maxPrice = Math.max(1200, ...products.map((product) => product.price));
  const [filters, setFilters] = useState<CatalogFilters>(() => defaultFilters(maxPrice));
  const [sort, setSort] = useState<SortOption>("featured");
  const [filterOpen, setFilterOpen] = useState(false);
  const filtered = useMemo(() => sortProducts(filterProducts(products, filters), sort), [filters, products, sort]);

  useEffect(() => {
    if (!filterOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setFilterOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [filterOpen]);

  const update = (changes: Partial<CatalogFilters>) => setFilters((current) => ({ ...current, ...changes }));
  const toggleBrand = (brand: string) => update({ brands: filters.brands.includes(brand) ? filters.brands.filter((item) => item !== brand) : [...filters.brands, brand] });
  const clearAll = () => setFilters(defaultFilters(maxPrice));
  const activeCount = filters.brands.length + Number(filters.rating > 0) + Number(filters.inStock) + Number(filters.discountOnly) + Number(filters.minPrice > 0 || filters.maxPrice < maxPrice);

  return <>
    <div className="listing-heading"><div><p className="eyebrow">{resultLabel ?? "The ORBITA edit"}</p><h1>{query ? <>Search results for <span className="query-highlight">&quot;{query}&quot;</span></> : title}</h1><p>{description}</p></div><div className="listing-count"><strong>{filtered.length}</strong><span>{filtered.length === 1 ? "product" : "products"}</span></div></div>
    <div className="listing-toolbar"><button className="filter-toggle" onClick={() => setFilterOpen(true)}><SlidersHorizontal size={17} />Filters{activeCount > 0 && <b>{activeCount}</b>}</button><div className="active-filters">{filters.brands.map((brand) => <button key={brand} onClick={() => toggleBrand(brand)}>{brand}<X size={13} /></button>)}{filters.rating > 0 && <button onClick={() => update({ rating: 0 })}>{filters.rating}+ stars<X size={13} /></button>}{filters.inStock && <button onClick={() => update({ inStock: false })}>In stock<X size={13} /></button>}{filters.discountOnly && <button onClick={() => update({ discountOnly: false })}>On sale<X size={13} /></button>}{activeCount > 0 && <button className="clear-filters" onClick={clearAll}>Clear all</button>}</div><label className="sort-control"><span>Sort by</span><select value={sort} onChange={(event) => setSort(event.target.value as SortOption)}>{Object.entries(sortLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select><ChevronDown size={15} /></label></div>
    <div className="listing-layout"><aside className="filter-sidebar"><FilterPanel filters={filters} maxPrice={maxPrice} update={update} toggleBrand={toggleBrand} clearAll={clearAll} /></aside><div className="listing-results">{filtered.length ? <ProductGrid products={filtered} /> : <EmptyResults query={query} clearAll={clearAll} />}</div></div>
    <AnimatePresence>{filterOpen && <motion.div className="filter-drawer-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.currentTarget === event.target && setFilterOpen(false)}><motion.aside className="filter-drawer" role="dialog" aria-modal="true" aria-labelledby="filter-title" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}><div className="drawer-head"><h2 id="filter-title">Filter products</h2><button onClick={() => setFilterOpen(false)} aria-label="Close filters"><X /></button></div><FilterPanel filters={filters} maxPrice={maxPrice} update={update} toggleBrand={toggleBrand} clearAll={clearAll} /><button className="button button-primary drawer-apply" onClick={() => setFilterOpen(false)}>View {filtered.length} results</button></motion.aside></motion.div>}</AnimatePresence>
  </>;
}

function FilterPanel({ filters, maxPrice, update, toggleBrand, clearAll }: { filters: CatalogFilters; maxPrice: number; update: (changes: Partial<CatalogFilters>) => void; toggleBrand: (brand: string) => void; clearAll: () => void }) {
  return <div className="filter-panel"><div className="filter-panel-title"><h2>Filter by</h2><button onClick={clearAll}>Reset</button></div><fieldset><legend>Brands</legend>{catalogBrands.map((brand) => <label className="check-row" key={brand}><input type="checkbox" checked={filters.brands.includes(brand)} onChange={() => toggleBrand(brand)} /><span className="fake-check"><Check size={12} /></span>{brand}</label>)}</fieldset><fieldset><legend>Price range</legend><div className="price-inputs"><label><span>From</span><input type="number" min="0" value={filters.minPrice} onChange={(event) => update({ minPrice: Number(event.target.value) })} /></label><label><span>To</span><input type="number" min="0" value={filters.maxPrice} onChange={(event) => update({ maxPrice: Number(event.target.value) })} /></label></div><input className="range-input" type="range" min="0" max={maxPrice} value={filters.maxPrice} onChange={(event) => update({ maxPrice: Number(event.target.value) })} aria-label="Maximum price" /></fieldset><fieldset><legend>Rating</legend>{[4, 3].map((rating) => <label className="check-row" key={rating}><input type="radio" name="rating" checked={filters.rating === rating} onChange={() => update({ rating })} /><span className="radio-check" />{rating}+ <Star size={13} fill="currentColor" /></label>)}<button className="filter-clear-row" onClick={() => update({ rating: 0 })}>Any rating</button></fieldset><fieldset><legend>Availability</legend><label className="check-row"><input type="checkbox" checked={filters.inStock} onChange={(event) => update({ inStock: event.target.checked })} /><span className="fake-check"><Check size={12} /></span>In stock only</label></fieldset><fieldset><legend>Offers</legend><label className="check-row"><input type="checkbox" checked={filters.discountOnly} onChange={(event) => update({ discountOnly: event.target.checked })} /><span className="fake-check"><Check size={12} /></span>On sale</label></fieldset></div>;
}

function EmptyResults({ query, clearAll }: { query?: string; clearAll: () => void }) {
  return <div className="empty-results"><div className="empty-orbit"><Filter size={25} /></div><h2>{query ? `We couldn't find anything for "${query}"` : "No products match these filters"}</h2><p>Try a broader search or clear a few filters to find your next favorite.</p><div><button className="button button-primary" onClick={clearAll}>Clear filters</button><Link className="button button-secondary" href="/category/electronics">Browse categories</Link></div></div>;
}
