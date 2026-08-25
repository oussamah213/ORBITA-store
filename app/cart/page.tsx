"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { OrderSummary } from "@/components/commerce/order-summary";
import { useStore } from "@/context/store-context";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { cartItems, updateCartQuantity, removeFromCart, toggleWishlist } = useStore();
  return <><Header /><main className="commerce-page"><div className="page-shell"><Breadcrumbs items={[{ label: "Cart" }]} />{cartItems.length ? <><div className="commerce-title"><div><p className="eyebrow">Your orbit</p><h1>Your shopping cart</h1><p>{cartItems.length} {cartItems.length === 1 ? "item" : "items"} saved for checkout.</p></div><Link href="/" className="text-link">Continue shopping <ArrowRight size={16} /></Link></div><div className="cart-layout"><section className="cart-items" aria-label="Cart items">{cartItems.map(({ product, quantity }) => <article className="cart-item" key={product.id}><Link href={`/product/${product.slug}`} className="cart-item-image"><Image src={product.image} alt={product.name} fill sizes="120px" /></Link><div className="cart-item-copy"><p>{product.category} · {product.brand}</p><h2><Link href={`/product/${product.slug}`}>{product.name}</Link></h2><span className="cart-variant">Midnight · Standard finish</span><div className="cart-item-bottom"><div className="quantity-control"><button onClick={() => updateCartQuantity(product.id, quantity - 1)} aria-label={`Decrease ${product.name} quantity`}><Minus size={15} /></button><span>{quantity}</span><button onClick={() => updateCartQuantity(product.id, quantity + 1)} aria-label={`Increase ${product.name} quantity`}><Plus size={15} /></button></div><button className="save-action" onClick={() => toggleWishlist(product)}><Heart size={15} /> Save for later</button><button className="remove-action" onClick={() => removeFromCart(product.id)}><Trash2 size={15} /> Remove</button></div></div><strong className="cart-item-price">{formatPrice(product.price * quantity)}</strong></article>)}</section><OrderSummary items={cartItems} shipping={cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0) >= 75 ? 0 : 8.99} checkoutHref="/checkout" /></div></> : <EmptyCart />}</div></main><Footer /></>;
}

function EmptyCart() { return <div className="empty-cart"><div className="empty-orbit"><ShoppingBag size={27} /></div><p className="eyebrow">Nothing here yet</p><h1>Your cart is waiting for something great.</h1><p>Take another look around the ORBITA edit. Your next favorite could be one click away.</p><Link href="/" className="button button-primary">Continue shopping <ArrowRight size={17} /></Link></div>; }
