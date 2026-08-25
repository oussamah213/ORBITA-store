import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import type { CartItem } from "@/context/store-context";

export function OrderSummary({ items, shipping = 0, discount = 0, checkoutHref, compact = false }: { items: CartItem[]; shipping?: number; discount?: number; checkoutHref?: string; compact?: boolean }) {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax - discount;
  return <aside className={`order-summary ${compact ? "order-summary--compact" : ""}`}><div className="summary-heading"><p className="eyebrow">Your order</p><h2>Order summary</h2></div>{!compact && <div className="summary-products">{items.map((item) => <div className="summary-product" key={item.product.id}><Image src={item.product.image} alt="" width={68} height={58} /><span><strong>{item.product.name}</strong><small>Qty {item.quantity}</small></span><b>{formatPrice(item.product.price * item.quantity)}</b></div>)}</div>}<div className="summary-lines"><div><span>Subtotal</span><b>{formatPrice(subtotal)}</b></div><div><span>Shipping</span><b>{shipping === 0 ? "Free" : formatPrice(shipping)}</b></div><div><span>Estimated tax</span><b>{formatPrice(tax)}</b></div>{discount > 0 && <div className="summary-discount"><span>ORBITA10</span><b>-{formatPrice(discount)}</b></div>}</div><div className="summary-total"><span>Total</span><strong>{formatPrice(total)}</strong></div>{checkoutHref && <Link href={checkoutHref} className="button button-primary summary-cta">Proceed to checkout</Link>}<p className="summary-note">Taxes are estimated for this demo checkout.</p></aside>;
}

export function cartTotals(items: CartItem[], shipping = 0, discount = 0) {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  return { subtotal, tax, total: subtotal + shipping + tax - discount };
}
