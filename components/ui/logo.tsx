import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="brand-logo" aria-label="ORBITA Store home">
      <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
      <span className={compact ? "brand-text" : ""}>ORBITA<span>Store</span></span>
    </Link>
  );
}
