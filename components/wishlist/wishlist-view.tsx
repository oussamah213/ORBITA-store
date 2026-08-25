"use client";

import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import { ProductGrid } from "@/components/product/product-card";
import { useStore } from "@/context/store-context";
import { products } from "@/data/products";

export function WishlistView() { const { wishlist, authLoading } = useStore(); const savedProducts = products.filter((product) => wishlist.has(product.id)); if (authLoading) return <div className="wishlist-loading" role="status">Loading your wishlist…</div>; return savedProducts.length ? <div className="wishlist-content"><div className="commerce-title"><div><p className="eyebrow">Saved for later</p><h1>Your wishlist</h1><p>Keep the pieces you are still thinking about close by.</p></div><span className="wishlist-count">{savedProducts.length} {savedProducts.length === 1 ? "favorite" : "favorites"}</span></div><ProductGrid products={savedProducts} variant="compact" /></div> : <div className="wishlist-empty"><div className="empty-orbit"><Heart size={27} /></div><p className="eyebrow">A little room to dream</p><h1>Your wishlist is ready for your next favorite.</h1><p>Tap the heart on anything that catches your eye and we will keep it here.</p><Link href="/" className="button button-primary">Explore products <ArrowRight size={17} /></Link></div>; }
