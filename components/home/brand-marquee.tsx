const brands = ["AETHER", "NOVA", "PULSE", "LUMI", "VANTА", "AEROFIT", "HALO", "SOLIS"];

export function BrandMarquee() {
  const doubled = [...brands, ...brands];
  return <div className="brand-marquee" aria-label="Featured brands"><div className="brand-track">{doubled.map((brand, index) => <div key={`${brand}-${index}`} aria-hidden={index >= brands.length}><span className="brand-glyph">{brand.slice(0, 1)}</span>{brand}</div>)}</div></div>;
}
