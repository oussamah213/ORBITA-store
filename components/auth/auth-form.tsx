"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, LockKeyhole, Mail, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/store-context";

export function AuthForm({ mode, callbackUrl = "/account" }: { mode: "login" | "register"; callbackUrl?: string }) {
  const router = useRouter();
  const { refreshSession } = useStore();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const isRegister = mode === "register";

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(""); setFieldErrors({});
    const form = new FormData(event.currentTarget); const values = Object.fromEntries(form.entries()); const nextErrors: Record<string, string> = {};
    if (isRegister && String(values.firstName ?? "").trim().length < 2) nextErrors.firstName = "Enter your first name.";
    if (isRegister && String(values.lastName ?? "").trim().length < 2) nextErrors.lastName = "Enter your last name.";
    if (!String(values.email ?? "").includes("@")) nextErrors.email = "Enter a valid email address.";
    if (String(values.password ?? "").length < 8) nextErrors.password = "Use at least 8 characters.";
    if (isRegister && values.password !== values.confirmPassword) nextErrors.confirmPassword = "Passwords do not match.";
    if (Object.keys(nextErrors).length) { setFieldErrors(nextErrors); return; }
    setLoading(true);
    try {
      const response = await fetch(`/api/auth/${mode}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const data = await response.json() as { error?: string };
      if (!response.ok) { setError(data.error ?? "Something went wrong. Please try again."); return; }
      await refreshSession(); router.push(callbackUrl); router.refresh();
    } catch { setError("We could not reach ORBITA right now. Please try again."); }
    finally { setLoading(false); }
  }

  return <div className="auth-card"><div className="auth-card-mark"><UserRound size={23} /></div><p className="eyebrow">{isRegister ? "Join the orbit" : "Welcome back"}</p><h1>{isRegister ? "Create your ORBITA account" : "Sign in to ORBITA"}</h1><p className="auth-intro">{isRegister ? "Save favorites and make every future visit feel more considered." : "Pick up where you left off across your wishlist and account."}</p><form className="auth-form" onSubmit={submit} noValidate>{isRegister && <div className="auth-name-grid"><AuthField label="First name" name="firstName" icon={<UserRound size={16} />} error={fieldErrors.firstName} /><AuthField label="Last name" name="lastName" icon={<UserRound size={16} />} error={fieldErrors.lastName} /></div>}<AuthField label="Email address" name="email" type="email" icon={<Mail size={16} />} error={fieldErrors.email} autoComplete="email" /><AuthField label="Password" name="password" type={showPassword ? "text" : "password"} icon={<LockKeyhole size={16} />} error={fieldErrors.password} autoComplete={isRegister ? "new-password" : "current-password"} trailing={<button type="button" className="password-toggle" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button>} />{isRegister && <AuthField label="Confirm password" name="confirmPassword" type={showPassword ? "text" : "password"} icon={<LockKeyhole size={16} />} error={fieldErrors.confirmPassword} autoComplete="new-password" />}{error && <p className="auth-error" role="alert">{error}</p>}<button className="button button-primary auth-submit" disabled={loading}>{loading ? "Working…" : isRegister ? "Create account" : "Sign in"}</button></form><p className="auth-switch">{isRegister ? "Already have an account?" : "New to ORBITA?"} <Link href={isRegister ? `/login${callbackUrl !== "/account" ? `?callbackUrl=${encodeURIComponent(callbackUrl)}` : ""}` : "/register"}>{isRegister ? "Sign in" : "Create an account"}</Link></p><small className="auth-demo-note">Secure demo account · No email verification in this portfolio phase.</small></div>;
}

function AuthField({ label, name, type = "text", icon, error, trailing, autoComplete }: { label: string; name: string; type?: string; icon: React.ReactNode; error?: string; trailing?: React.ReactNode; autoComplete?: string }) {
  return <label className="auth-field"><span>{label}</span><div className={error ? "has-error" : ""}>{icon}<input name={name} type={type} autoComplete={autoComplete} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} />{trailing}</div>{error && <small id={`${name}-error`}>{error}</small>}</label>;
}
