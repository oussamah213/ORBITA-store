import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/store-context";
import { QuickViewModal } from "@/components/product/quick-view-modal";
import { CartToast } from "@/components/ui/cart-toast";

export const metadata: Metadata = {
  title: "ORBITA Store — Everything You Want. One Place.",
  description: "Discover technology, fashion, home, beauty and more in one exceptional global marketplace.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body><StoreProvider>{children}<QuickViewModal /><CartToast /></StoreProvider></body>
    </html>
  );
}
