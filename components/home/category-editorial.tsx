import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categorySlug } from "@/lib/catalog";

const categories = [
  { name: "Electronics", count: "2,400+ products", image: "/products/realistic/cutouts/headphones-cutout.webp", className: "category-large", accent: "#e9ebfb" },
  { name: "Fashion", count: "New season", image: "/products/realistic/cutouts/blouse-cutout.webp", className: "category-tall", accent: "#f5e9ee" },
  { name: "Home & Living", count: "Make it yours", image: "/products/realistic/cutouts/chair-cutout.webp", className: "category-wide", accent: "#f1ece5" },
  { name: "Gaming", count: "Play without limits", image: "/products/realistic/cutouts/console-cutout.webp", className: "category-small", accent: "#eeeafa" },
  { name: "Beauty", count: "Daily essentials", image: "/products/realistic/cutouts/bottle-cutout.webp", className: "category-small", accent: "#faeef2" },
  { name: "Sports", count: "Move better", image: "/products/realistic/cutouts/shoes-cutout.webp", className: "category-small", accent: "#ebf2ed" },
  { name: "Accessories", count: "Finish the look", image: "/products/realistic/cutouts/sunglasses-cutout.webp", className: "category-small", accent: "#eaf1f3" },
  { name: "Appliances", count: "Smarter routines", image: "/products/realistic/cutouts/coffeemaker-cutout.webp", className: "category-wide", accent: "#edf0f3" },
];

export function CategoryEditorial() {
  return <div className="category-editorial">{categories.map((category) => <Link href={`/category/${categorySlug(category.name)}`} className={`category-card ${category.className}`} key={category.name} style={{ "--category-accent": category.accent } as React.CSSProperties}><div><p>{category.count}</p><h3>{category.name}</h3><span>Shop category <ArrowUpRight size={16} /></span></div><Image src={category.image} alt="" width={600} height={500} /></Link>)}</div>;
}
