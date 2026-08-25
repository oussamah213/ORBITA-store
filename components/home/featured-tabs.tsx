"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";

const tabs = ["All", "Electronics", "Fashion", "Home", "Gaming"] as const;

export function FeaturedTabs() {
  const [active, setActive] = useState<(typeof tabs)[number]>("All");
  const visible = useMemo(() => (active === "All" ? products.slice(6, 16) : products.filter((product) => product.category === active).slice(0, 10)), [active]);
  return (
    <>
      <div className="tabs" role="tablist" aria-label="Featured product categories">
        {tabs.map((tab) => <button role="tab" aria-selected={active === tab} className={active === tab ? "is-active" : ""} onClick={() => setActive(tab)} key={tab}>{tab}</button>)}
      </div>
      <AnimatePresence mode="wait">
        <motion.div className="product-grid featured-grid" key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
          {visible.map((product) => <ProductCard product={product} key={product.id} />)}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
