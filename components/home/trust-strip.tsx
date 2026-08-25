import { Headphones, RotateCcw, ShieldCheck, Truck } from "lucide-react";

const benefits = [
  { icon: Truck, title: "Free Shipping", text: "On orders over $75" },
  { icon: ShieldCheck, title: "Secure Payments", text: "Protected at every step" },
  { icon: RotateCcw, title: "Easy Returns", text: "30-day return window" },
  { icon: Headphones, title: "24/7 Support", text: "Real help, anytime" },
];

export function TrustStrip() {
  return <section className="trust-strip page-shell" aria-label="Shopping benefits">{benefits.map(({ icon: Icon, title, text }) => <div key={title}><span><Icon size={22} /></span><p><strong>{title}</strong><small>{text}</small></p></div>)}</section>;
}
