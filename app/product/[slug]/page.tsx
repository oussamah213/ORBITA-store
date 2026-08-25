import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ProductDetailView } from "@/components/product/product-detail-view";
import { productFromSlug } from "@/lib/catalog";
import { products } from "@/data/products";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const product = productFromSlug((await params).slug);
  return { title: product ? `${product.name} | ORBITA Store` : "Product | ORBITA Store" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = productFromSlug((await params).slug);
  if (!product) notFound();
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);
  return <><Header /><main className="commerce-page"><div className="page-shell"><Breadcrumbs items={[{ label: product.category, href: `/category/${product.category === "Home" ? "home-living" : product.category.toLowerCase()}` }, { label: product.name }]} /><ProductDetailView product={product} related={related} /></div></main><Footer /></>;
}
