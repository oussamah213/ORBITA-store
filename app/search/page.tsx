import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CatalogListing } from "@/components/catalog/catalog-listing";
import { searchProducts } from "@/lib/catalog";
import { products } from "@/data/products";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const query = ((await searchParams).q ?? "").trim();
  const results = searchProducts(query, products);
  return <><Header /><main className="commerce-page"><div className="page-shell"><Breadcrumbs items={[{ label: "Search" }]} /><CatalogListing products={results} title="Search" query={query} resultLabel="Search ORBITA" description={query ? "A considered selection matched to your search." : "Explore the full ORBITA catalog and find something made for your everyday."} /></div></main><Footer /></>;
}
