"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Minus, Plus, ShieldCheck, ShoppingBag, Star, Truck, Undo2, ZoomIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { ProductGrid } from "@/components/product/product-card";
import { useStore } from "@/context/store-context";
import { discountPercent, formatPrice } from "@/lib/format";
import type { Product } from "@/types/product";

export function ProductDetailView({ product, related }: { product: Product; related: Product[] }) {
  const router = useRouter();
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const [activeImage, setActiveImage] = useState(product.images[0] ?? product.image);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes?.[2] ?? "");
  const wished = wishlist.has(product.id);
  const discount = discountPercent(product.price, product.oldPrice);
  const purchase = (goToCheckout = false) => { addToCart(product, quantity); if (goToCheckout) router.push("/checkout"); };

  return <>
    <div className="product-detail-layout"><div className="product-gallery"><div className="thumbnail-list" aria-label="Product images">{product.images.map((image, index) => <button key={image} className={activeImage === image ? "is-active" : ""} onClick={() => setActiveImage(image)} aria-label={`View image ${index + 1}`} aria-pressed={activeImage === image}><Image src={image} alt="" width={92} height={78} /></button>)}</div><div className="detail-main-image"><Image src={activeImage} alt={product.name} fill priority sizes="(max-width: 900px) 92vw, 55vw" /><span className="zoom-hint"><ZoomIn size={15} /> Product view</span></div></div>
      <div className="purchase-panel"><div className="detail-kicker"><Link href={`/category/${product.category === "Home" ? "home-living" : product.category.toLowerCase()}`}>{product.category}</Link><span>·</span>{product.brand}</div><h1>{product.name}</h1><div className="detail-rating"><span><Star size={15} fill="currentColor" /> {product.rating}</span><a href="#reviews">{product.reviews.toLocaleString()} verified reviews</a></div><div className="detail-price"><strong>{formatPrice(product.price)}</strong>{product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}{discount > 0 && <b>-{discount}%</b>}</div><p className="detail-short-description">{product.shortDescription}</p><div className="detail-option"><div><strong>Color</strong><span>{color}</span></div><div className="color-options">{product.colors.map((item) => <button key={item} className={color === item ? "is-active" : ""} onClick={() => setColor(item)} aria-label={`Choose ${item}`} aria-pressed={color === item}><i style={{ background: item === "Cloud" ? "#f1f3f6" : item === "Sand" ? "#c8a987" : item === "Indigo" ? "#4f46e5" : "#111827" }} /></button>)}</div></div>{product.sizes && <div className="detail-option"><div><strong>Size</strong><span>{size}</span></div><div className="size-options">{product.sizes.map((item) => <button key={item} className={size === item ? "is-active" : ""} onClick={() => setSize(item)}>{item}</button>)}</div></div>}<div className="detail-stock"><span className={(product.stock ?? 20) < 8 ? "low-stock" : "in-stock"}>{(product.stock ?? 20) < 8 ? `Only ${product.stock} left` : "In stock and ready to ship"}</span><small>Ships from ORBITA · Free over $75</small></div><div className="purchase-actions"><div className="quantity-control"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity"><Minus size={16} /></button><span>{quantity}</span><button onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity"><Plus size={16} /></button></div><button className="button button-primary" onClick={() => purchase()}><ShoppingBag size={18} /> Add to cart</button><button className={`wishlist-detail ${wished ? "is-active" : ""}`} onClick={() => toggleWishlist(product)} aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}><Heart size={19} fill={wished ? "currentColor" : "none"} /></button></div><button className="button button-dark buy-now" onClick={() => purchase(true)}>Buy now</button><div className="trust-grid"><span><Truck size={18} /><b>Free shipping</b><small>Orders over $75</small></span><span><Undo2 size={18} /><b>Easy returns</b><small>30-day returns</small></span><span><ShieldCheck size={18} /><b>Secure checkout</b><small>Protected payments</small></span></div></div></div>
    <div className="product-information"><div className="info-section"><p className="eyebrow">The details</p><h2>Highlights</h2><div className="highlight-grid">{product.features.map((feature) => <div key={feature}><span>01</span><p>{feature}</p></div>)}</div></div><div className="info-columns"><article><p className="eyebrow">About the product</p><h2>Product description</h2><p>{product.description}</p></article><article><p className="eyebrow">At a glance</p><h2>Specifications</h2><dl>{Object.entries(product.specifications).map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl></article></div><div className="detail-service"><div><Truck /><strong>Shipping & returns</strong><p>Free delivery over $75. Send it back within 30 days if it is not quite right.</p></div><div><Star /><strong>Reviews preview</strong><p>Customers rate this edit {product.rating}/5 from {product.reviews.toLocaleString()} verified reviews.</p><a href="#reviews">Read all reviews →</a></div></div></div>
    <section className="related-products page-shell"><div className="section-heading"><div><p className="eyebrow">Keep exploring</p><h2>You May Also Like</h2></div><Link href={`/category/${product.category === "Home" ? "home-living" : product.category.toLowerCase()}`}>View category →</Link></div><ProductGrid products={related} variant="compact" /></section>
    <div className="mobile-buy-bar"><span>{formatPrice(product.price)}</span><button className="button button-primary" onClick={() => purchase()}>Add to cart</button></div>
  </>;
}
