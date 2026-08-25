import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flame, Sparkles } from "lucide-react";
import { dailyDeals, bestSellers, limitedStock, newArrivals, recommended, trendingProducts } from "@/data/products";
import { ProductCard, ProductGrid } from "@/components/product/product-card";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Countdown } from "@/components/home/countdown";
import { CategoryEditorial } from "@/components/home/category-editorial";
import { FeaturedTabs } from "@/components/home/featured-tabs";
import { PromoBanner } from "@/components/home/promo-banner";
import { BrandMarquee } from "@/components/home/brand-marquee";
import { formatPrice } from "@/lib/format";

export function HomeSections() {
  return (
    <>
      <section className="section daily-section" id="daily-deals">
        <div className="page-shell">
          <div className="deals-heading"><div><p className="eyebrow red"><Flame size={15} fill="currentColor" /> Limited time</p><h2>Today&apos;s Best Deals</h2></div><Countdown /><Link className="text-link" href="/category/electronics?deals=true">View all deals <ArrowRight size={16} /></Link></div>
          <div className="horizontal-products deal-row"><ProductGrid products={dailyDeals} variant="deal" /></div>
        </div>
      </section>

      <ScrollReveal><section className="section page-shell"><SectionHeader eyebrow="Discover your next favorite" title="Shop by Category" description="Curated worlds for every part of your life." /><CategoryEditorial /></section></ScrollReveal>

      <section className="section featured-section" id="featured"><div className="page-shell"><SectionHeader eyebrow="Handpicked for you" title="Featured for You" description="A considered edit of standout products, refreshed often." /><FeaturedTabs /></div></section>

      <PromoBanner />

      <ScrollReveal><section className="section page-shell trending-section"><SectionHeader eyebrow="What everyone wants" title="Trending Now" description="The products moving fastest across ORBITA." /><div className="product-carousel">{trendingProducts.map((product, index) => <ProductCard key={product.id} product={product} variant="trending" rank={index + 1} />)}</div></section></ScrollReveal>

      <section className="brands-section"><div className="page-shell"><SectionHeader eyebrow="Names worth knowing" title="Shop Top Brands" action={false} /><BrandMarquee /></div></section>

      <ScrollReveal><section className="section page-shell best-sellers"><SectionHeader eyebrow="Tried. Loved. Reordered." title="Best Sellers" /><div className="best-seller-layout"><Link href="/category/electronics" className="seller-story"><div><p>THE EVERYDAY EDIT</p><h3>Great design,<br />in daily rotation.</h3><span>Shop the collection <ArrowRight size={17} /></span></div><Image src="/products/realistic/cutouts/headphones-cutout.webp" alt="Orbit headphones" width={900} height={900} /></Link><div className="seller-grid">{bestSellers.map((product) => <ProductCard key={product.id} product={product} variant="compact" />)}</div></div></section></ScrollReveal>

      <section className="section limited-section"><div className="page-shell"><SectionHeader eyebrow="Last chance" title="Almost Gone" description="Low-stock favorites. Still considered, never chaotic." /><div className="stock-list">{limitedStock.map((product) => <article className="stock-item" key={product.id}><div className="stock-image" style={{ "--accent": product.accent } as React.CSSProperties}><Image src={product.cutoutImage ?? product.image} alt={product.name} width={900} height={900} /></div><div className="stock-copy"><p>{product.category}</p><h3>{product.name}</h3><strong>{formatPrice(product.price)}</strong><div className="stock-status"><span><Flame size={14} />Only {product.stock} left</span><div><i style={{ width: `${Math.max(12, (product.stock ?? 1) * 6)}%` }} /></div></div></div></article>)}</div></div></section>

      <ScrollReveal><section className="section page-shell arrivals-section"><SectionHeader eyebrow="Freshly landed" title="Just Arrived" description="New shapes, smarter details, better everyday choices." /><ProductGrid products={newArrivals} /></section></ScrollReveal>

      <section className="section recommendations"><div className="page-shell"><SectionHeader eyebrow="Picked around your taste" title="Recommended for You" action="Refresh picks" /><div className="product-carousel compact-carousel">{recommended.map((product) => <ProductCard key={product.id} product={product} variant="compact" />)}</div></div></section>

      <section className="newsletter page-shell" id="newsletter"><div className="newsletter-icon"><Sparkles /></div><div><p className="eyebrow">Members get more</p><h2>Get More from ORBITA</h2><p>Be the first to hear about exclusive offers, new arrivals and members-only deals.</p></div><form><label className="sr-only" htmlFor="email">Email address</label><input id="email" type="email" required placeholder="Enter your email address" /><button className="button button-primary">Join ORBITA <ArrowRight size={18} /></button><small>By joining, you agree to our Privacy Policy. Unsubscribe anytime.</small></form></section>
    </>
  );
}
