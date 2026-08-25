"use client";

import Link from "next/link";
import { Check, Package, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useStore } from "@/context/store-context";
import { formatPrice } from "@/lib/format";

export default function OrderSuccessPage() {
  const { cartItems, clearCart } = useStore();
  const orderNumber = "ORB-2026-1048";
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return <><Header /><main className="success-page"><div className="success-card"><div className="success-icon"><Check size={30} /></div><p className="eyebrow">Order confirmed</p><h1>Thank you for shopping in orbit.</h1><p className="success-lead">Your demo order <strong>{orderNumber}</strong> is on its way to becoming a very real-feeling delivery.</p><div className="delivery-callout"><Package size={20} /><span><strong>Estimated delivery</strong><small>Thursday, September 3 · Demo timeline</small></span></div><div className="success-summary"><div><span>Order total</span><strong>{formatPrice(subtotal + subtotal * 0.08)}</strong></div><div><span>Items</span><strong>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</strong></div></div><p className="demo-footnote">This is a portfolio checkout. No payment was processed and no order was sent to a server.</p><div className="success-actions"><Link href="/" className="button button-primary" onClick={clearCart}>Continue shopping <ArrowRight size={17} /></Link><Link href="/category/electronics" className="button button-secondary" onClick={clearCart}>Browse products</Link></div></div></main><Footer /></>;
}
