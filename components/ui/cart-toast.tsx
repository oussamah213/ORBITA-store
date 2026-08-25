"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ShoppingBag } from "lucide-react";
import { useStore } from "@/context/store-context";

export function CartToast() {
  const { toast } = useStore();
  return (
    <AnimatePresence>
      {toast && (
        <motion.div className="cart-toast" role="status" initial={{ opacity: 0, x: 35, y: 8 }} animate={{ opacity: 1, x: 0, y: 0 }} exit={{ opacity: 0, x: 25 }}>
          <span><Check size={16} /></span><p>{toast}</p><ShoppingBag size={18} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
