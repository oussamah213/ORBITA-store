"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles } from "lucide-react";

export function PromoBanner() {
  const section = useRef<HTMLElement>(null);
  const visual = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo(visual.current, { y: 50, rotate: -3 }, { y: -35, rotate: 2, ease: "none", scrollTrigger: { trigger: section.current, start: "top bottom", end: "bottom top", scrub: 1 } });
      gsap.from(".promo-word", { yPercent: 100, opacity: 0, stagger: 0.08, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: section.current, start: "top 75%", once: true } });
    }, section);
    return () => context.revert();
  }, []);
  return (
    <section className="promo-banner page-shell" id="promo" ref={section}>
      <div className="promo-copy"><p className="promo-kicker"><Sparkles size={16} /> ORBITA Tech Event · This week only</p><h2><span className="promo-word">Future Technology.</span><span className="promo-word accent-word">Better Prices.</span></h2><p>Save on selected laptops, smartphones and smart devices engineered to make every day work better.</p><Link className="button button-light" href="/category/electronics?deals=true">Explore Tech Deals <ArrowRight size={18} /></Link></div>
      <div className="promo-art" ref={visual}><span className="promo-glow" /><div className="promo-device-stage"><Image src="/products/realistic/cutouts/laptop-cutout.webp" alt="NovaBook Air 14 laptop" width={900} height={900} /><Image className="promo-watch" src="/products/realistic/cutouts/smartwatch-cutout.webp" alt="Halo smartwatch" width={600} height={600} /></div><span className="promo-price"><small>Event price</small><strong>$899</strong></span></div>
      <div className="promo-watermark">TECH / 26</div>
    </section>
  );
}
