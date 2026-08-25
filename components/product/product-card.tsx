"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Heart, Plus, Star } from "lucide-react";
import { useStore } from "@/context/store-context";
import { discountPercent, formatPrice } from "@/lib/format";
import type { Product } from "@/types/product";

export function ProductCard({ product, variant = "default", rank }: { product: Product; variant?: "default" | "deal" | "compact" | "trending"; rank?: number }) {
  const { wishlist, toggleWishlist, addToCart, openQuickView } = useStore();
  const wished = wishlist.has(product.id);
  const discount = discountPercent(product.price, product.oldPrice);

  return (
    <motion.article
      className={`product-card product-card--${variant}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="product-media" style={{ "--accent": product.accent } as React.CSSProperties}>
        {rank && <span className="rank-badge">#{rank} Trending</span>}
        {!rank && product.badge && <span className={`product-badge badge-${product.badge.toLowerCase().replace(" ", "-")}`}>{product.badge}</span>}
        {discount > 0 && variant === "deal" && <span className="discount-badge">-{discount}%</span>}
        <button className={`heart-button ${wished ? "is-active" : ""}`} onClick={() => toggleWishlist(product)} aria-label={`${wished ? "Remove" : "Add"} ${product.name} ${wished ? "from" : "to"} wishlist`}>
          <motion.span animate={wished ? { scale: [1, 1.35, 1] } : { scale: 1 }}><Heart size={18} fill={wished ? "currentColor" : "none"} /></motion.span>
        </button>
        <Link href={`/product/${product.slug}`} className="product-image-wrap" aria-label={`View ${product.name}`}>
          <Image src={product.image} alt={product.name} width={600} height={500} className="product-image primary-image" sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 20vw" />
          {product.alternateImage && <Image src={product.alternateImage} alt="" width={600} height={500} className="product-image alternate-image" sizes="(max-width: 640px) 46vw, 20vw" />}
        </Link>
        <div className="product-actions">
          <button onClick={() => openQuickView(product)} aria-label={`Quick view ${product.name}`}><Eye size={17} /><span>Quick view</span></button>
          <button className="quick-add" onClick={() => addToCart(product)} aria-label={`Add ${product.name} to cart`}><Plus size={17} /><span>Add</span></button>
        </div>
      </div>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3><Link href={`/product/${product.slug}`}>{product.name}</Link></h3>
        <div className="rating-row" aria-label={`${product.rating} out of 5 stars, ${product.reviews} reviews`}>
          <Star size={14} fill="currentColor" /><strong>{product.rating}</strong><span>({product.reviews.toLocaleString()})</span>
        </div>
        <div className="price-row">
          <strong>{formatPrice(product.price)}</strong>
          {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
        </div>
        {variant === "deal" && product.claimed && (
          <div className="deal-progress">
            <div><span>{product.claimed}% claimed</span><span>Going fast</span></div>
            <div className="progress-track"><i style={{ width: `${product.claimed}%` }} /></div>
          </div>
        )}
        {variant === "compact" && (
          <button className="compact-add" onClick={() => addToCart(product)}><Plus size={16} /> Quick add</button>
        )}
      </div>
    </motion.article>
  );
}

export function ProductGrid({ products, variant = "default", className = "" }: { products: Product[]; variant?: "default" | "deal" | "compact"; className?: string }) {
  return (
    <motion.div className={`product-grid ${className}`} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}>
      {products.map((product) => (
        <motion.div key={product.id} variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } }}>
          <ProductCard product={product} variant={variant} />
        </motion.div>
      ))}
    </motion.div>
  );
}
