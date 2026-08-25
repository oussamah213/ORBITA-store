import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AuthForm } from "@/components/auth/auth-form";

function safeCallback(value: unknown) { return typeof value === "string" && value.startsWith("/") && !value.startsWith("//") ? value : "/account"; }

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ callbackUrl?: string }> }) {
  const callbackUrl = safeCallback((await searchParams).callbackUrl);
  return <><Header /><main className="auth-page"><AuthForm mode="register" callbackUrl={callbackUrl} /></main><Footer /></>;
}
