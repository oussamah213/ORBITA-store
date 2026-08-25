"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { categoryNames, products } from "@/data/products";
import { categorySlug, searchProducts } from "@/lib/catalog";
import { useStore } from "@/context/store-context";
import { Logo } from "@/components/ui/logo";

const messages = ["Free shipping on orders over $75", "Easy 30-Day Returns", "Secure Payments", "New Deals Every Day"];

export function Header() {
  const [message, setMessage] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { cartCount, wishlist, user, authLoading } = useStore();

  useEffect(() => {
    const mountedTimer = window.setTimeout(() => setMounted(true), 0);
    const rotation = window.setInterval(() => setMessage((value) => (value + 1) % messages.length), 3500);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.clearTimeout(mountedTimer); window.clearInterval(rotation); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <>
      <div className="announcement" id="top">
        <span className="announcement-label">ORBITA PERKS</span>
        <AnimatePresence mode="wait"><motion.p key={message} initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -7 }} transition={{ duration: 0.25 }}>{messages[message]}</motion.p></AnimatePresence>
        <div className="announcement-links"><a href="#newsletter">Join ORBITA+</a><span>EN / USD</span></div>
      </div>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="main-nav page-shell">
          <button className="mobile-menu-button" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu /></button>
          <Logo compact />
          <SearchBar />
          <nav className="account-nav" aria-label="Account links">
            <Link href={mounted && user ? "/account" : "/login"}><UserRound /><span><small>{!mounted || authLoading ? "Welcome to" : user ? `Hello, ${user.firstName}` : "Hello, sign in"}</small>Account</span></Link>
            <Link href="/wishlist"><Heart /><span><small>{wishlist.size} saved</small>Wishlist</span></Link>
            <Link className="cart-link" href="/cart" aria-label={`Cart with ${cartCount} items`}><motion.span key={cartCount} animate={{ rotate: [0, -8, 8, 0], scale: [1, 1.12, 1] }}><ShoppingBag /></motion.span><span><small>Your cart</small>Cart</span><b>{cartCount}</b></Link>
          </nav>
        </div>
        <div className="mobile-search page-shell"><SearchBar /></div>
        <nav className="category-nav" aria-label="Product categories">
          <div className="page-shell category-scroll">
            <button className="all-categories" onClick={() => setMegaOpen((value) => !value)} aria-expanded={megaOpen}><Menu size={17} />All Categories<ChevronDown size={15} /></button>
            {categoryNames.map((category) => <Link key={category} href={`/category/${categorySlug(category)}`}>{category === "Home" ? "Home & Living" : category}</Link>)}
            <Link className="nav-deal" href="/category/electronics?deals=true">Today&apos;s Deals</Link>
          </div>
          <AnimatePresence>{megaOpen && <MegaMenu close={() => setMegaOpen(false)} />}</AnimatePresence>
        </nav>
      </header>
      <AnimatePresence>{mobileOpen && <MobileMenu close={() => setMobileOpen(false)} />}</AnimatePresence>
    </>
  );
}

function SearchBar() {
  const router = useRouter();
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const suggestions = query.trim() ? searchProducts(query).slice(0, 4) : products.filter((product) => product.isBestSeller).slice(0, 3);
  const submit = (event: React.FormEvent) => { event.preventDefault(); if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`); };
  return (
    <form className="search-bar search-bar--live" role="search" onSubmit={submit}>
      <Search size={20} aria-hidden="true" />
      <input aria-label="Search products" placeholder="Search products, brands and categories..." value={query} onChange={(event) => setQuery(event.target.value)} onFocus={() => setFocused(true)} onBlur={() => window.setTimeout(() => setFocused(false), 160)} />
      <label className="search-category"><span className="sr-only">Search category</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option>All</option>{categoryNames.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={14} /></label>
      <button aria-label="Submit search"><Search size={19} /></button>
      {focused && suggestions.length > 0 && <div className="search-suggestions"><p>{query.trim() ? "Matching products" : "Popular on ORBITA"}</p>{suggestions.map((product) => <Link href={`/product/${product.slug}`} key={product.id} onMouseDown={(event) => event.preventDefault()}><span>{product.name}</span><small>{product.category}</small></Link>)}{query.trim() && <Link className="suggestion-all" href={`/search?q=${encodeURIComponent(query.trim())}`} onMouseDown={(event) => event.preventDefault()}>View all results <span>→</span></Link>}</div>}
    </form>
  );
}

function MegaMenu({ close }: { close: () => void }) {
  return (
    <motion.div className="mega-menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
      <div className="page-shell mega-inner">
        <div><h3>Tech & Gaming</h3><Link href="/category/electronics">Smartphones & Wearables</Link><Link href="/category/electronics">Computers & Tablets</Link><Link href="/category/electronics">Audio</Link><Link href="/category/gaming">Gaming Gear</Link></div>
        <div><h3>Style & Beauty</h3><Link href="/category/fashion">Women&apos;s Fashion</Link><Link href="/category/fashion">Men&apos;s Fashion</Link><Link href="/category/accessories">Accessories</Link><Link href="/category/beauty">Beauty Essentials</Link></div>
        <div><h3>Home & Life</h3><Link href="/category/home-living">Furniture</Link><Link href="/category/home-living">Kitchen</Link><Link href="/category/appliances">Smart Home</Link><Link href="/category/sports">Fitness & Outdoors</Link></div>
        <Link className="mega-promo" href="/category/electronics?deals=true" onClick={close}><span>ORBITA TECH EVENT</span><strong>Save up to 40%</strong><small>Explore the edit →</small></Link>
      </div>
    </motion.div>
  );
}

function MobileMenu({ close }: { close: () => void }) {
  return (
    <motion.div className="mobile-drawer-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.currentTarget === event.target && close()}>
      <motion.aside className="mobile-drawer" initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", stiffness: 320, damping: 32 }}>
        <div className="drawer-head"><Logo /><button onClick={close} aria-label="Close menu"><X /></button></div>
        <p className="drawer-label">Shop by category</p>
        {categoryNames.map((category) => <Link href={`/category/${categorySlug(category)}`} key={category} onClick={close}>{category === "Home" ? "Home & Living" : category}<span>→</span></Link>)}
        <div className="drawer-footer"><Link href="/cart" onClick={close}>Cart</Link><Link href="/wishlist" onClick={close}>Wishlist</Link><a href="#newsletter" onClick={close}>Help & Support</a></div>
      </motion.aside>
    </motion.div>
  );
}
