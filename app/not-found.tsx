import Link from "next/link";
import { ArrowLeft, Orbit } from "lucide-react";

export default function NotFound() { return <main className="not-found-page"><div className="not-found-orbit"><Orbit size={34} /></div><p className="eyebrow">404 · Off course</p><h1>Looks like this product drifted out of orbit.</h1><p>Let&apos;s bring you back to the considered side of the internet.</p><div><Link href="/" className="button button-primary">Back to store</Link><Link href="/category/electronics" className="button button-secondary"><ArrowLeft size={16} /> Browse products</Link></div></main>; }
