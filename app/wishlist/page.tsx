import { redirect } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { WishlistView } from "@/components/wishlist/wishlist-view";
import { getSessionUser } from "@/lib/auth";

export default async function WishlistPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login?callbackUrl=/wishlist");
  return <><Header /><main className="commerce-page"><div className="page-shell"><Breadcrumbs items={[{ label: "Wishlist" }]} /><WishlistView /></div></main><Footer /></>;
}
