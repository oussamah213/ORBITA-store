import { AtSign, Camera, ChevronDown, MessageCircle, Send } from "lucide-react";
import Link from "next/link";
import { categorySlug } from "@/lib/catalog";
import { Logo } from "@/components/ui/logo";

const columns = [
  { title: "Shop", links: ["Electronics", "Fashion", "Home", "Gaming", "Beauty"] },
  { title: "Help", links: ["Contact Us", "Shipping", "Returns", "FAQs", "Order Tracking"] },
  { title: "About ORBITA", links: ["About", "Careers", "Sustainability", "Press"] },
  { title: "Account", links: ["My Account", "Orders", "Wishlist", "Rewards"] },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-main">
        <div className="footer-brand"><Logo /><p>Everything you want, thoughtfully brought together in one exceptional marketplace.</p><div className="socials"><a href="#social" aria-label="ORBITA photos"><Camera /></a><a href="#social" aria-label="ORBITA community"><MessageCircle /></a><a href="#social" aria-label="ORBITA updates"><Send /></a><a href="#social" aria-label="Email ORBITA"><AtSign /></a></div></div>
        {columns.map((column) => <div className="footer-column" key={column.title}><h3>{column.title}</h3>{column.links.map((link) => <Link key={link} href={column.title === "Shop" ? `/category/${categorySlug(link)}` : "#top"}>{link}</Link>)}</div>)}
      </div>
      <div className="page-shell footer-utility"><button>United States · English · USD <ChevronDown size={15} /></button><div className="payment-methods"><span>VISA</span><span>MC</span><span>AMEX</span><span>Pay</span></div></div>
      <div className="page-shell footer-bottom"><p>© 2026 ORBITA Store. Demo e-commerce project.</p><nav><a href="#privacy">Privacy Policy</a><a href="#terms">Terms</a><a href="#cookies">Cookies</a></nav></div>
    </footer>
  );
}
