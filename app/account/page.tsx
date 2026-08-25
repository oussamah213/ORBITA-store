import { redirect } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { AccountView } from "@/components/account/account-view";
import { getSessionUser } from "@/lib/auth";

export default async function AccountPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login?callbackUrl=/account");
  return <><Header /><main className="commerce-page"><div className="page-shell"><Breadcrumbs items={[{ label: "Account" }]} /><AccountView initialUser={user} /></div></main><Footer /></>;
}
