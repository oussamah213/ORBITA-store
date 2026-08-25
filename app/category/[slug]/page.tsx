import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CatalogListing } from "@/components/catalog/catalog-listing";
import { categoryFromSlug } from "@/lib/catalog";
import { products } from "@/data/products";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const category = categoryFromSlug((await params).slug);
  if (!category) notFound();
  const categoryProducts = products.filter((product) => product.category === category.name);
  return <><Header /><main className="commerce-page"><div className="page-shell"><Breadcrumbs items={[{ label: "Shop", href: "/" }, { label: category.name === "Home" ? "Home & Living" : category.name }]} /><CatalogListing products={categoryProducts} title={category.name === "Home" ? "Home & Living" : category.name} description={category.description} resultLabel="Shop the collection" /></div></main><Footer /></>;
}
