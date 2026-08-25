"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Star, X } from "lucide-react";
import { useStore } from "@/context/store-context";
import { formatPrice } from "@/lib/format";

export function QuickViewModal() {
  const { quickView: product, closeQuickView, addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);

  const handleClose = () => {
    setQuantity(1);
    closeQuickView();
  };

  useEffect(() => {
    if (!product) return;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && closeQuickView();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [product, closeQuickView]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.currentTarget === event.target && handleClose()}>
          <motion.div className="quick-modal" role="dialog" aria-modal="true" aria-labelledby="quick-view-title" initial={{ opacity: 0, y: 30, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.98 }} transition={{ duration: 0.25 }}>
            <button className="modal-close" onClick={handleClose} aria-label="Close quick view"><X /></button>
            <div className="modal-media" style={{ "--accent": product.accent } as React.CSSProperties}>
              <Image src={product.image} alt={product.name} width={600} height={500} priority />
            </div>
            <div className="modal-content">
              <p className="eyebrow">{product.category}</p>
              <h2 id="quick-view-title">{product.name}</h2>
              <div className="rating-row"><Star size={15} fill="currentColor" /><strong>{product.rating}</strong><span>{product.reviews.toLocaleString()} verified reviews</span></div>
              <div className="modal-price"><strong>{formatPrice(product.price)}</strong>{product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}</div>
              <p>{product.description}</p>
              <div className="modal-meta"><span>Free delivery over $75</span><span>30-day returns</span></div>
              <div className="modal-cart-row">
                <div className="quantity-control" aria-label="Quantity selector">
                  <button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity"><Minus size={16} /></button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity"><Plus size={16} /></button>
                </div>
                <button className="button button-primary modal-add" onClick={() => { addToCart(product, quantity); handleClose(); }}><ShoppingBag size={18} /> Add to cart</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
