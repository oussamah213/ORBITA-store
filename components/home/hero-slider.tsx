"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, MoveRight } from "lucide-react";

const slides = [
  { eyebrow: "Next-Gen Technology", title: "Upgrade Your Everyday Tech", text: "Discover premium devices with exclusive launch offers.", offer: "Up to 35% Off", cta: "Shop Electronics", secondary: "Explore Deals", image: "/products/realistic/cutouts/headphones-cutout.webp", tone: "indigo" },
  { eyebrow: "Gaming Week", title: "Built for the Next Level", text: "Performance gear, consoles and accessories for serious players.", offer: "Save up to 40%", cta: "Shop Gaming", secondary: "See What’s New", image: "/products/realistic/cutouts/console-cutout.webp", tone: "violet" },
  { eyebrow: "Home Refresh", title: "Make Your Space Feel New", text: "Smart appliances, considered furniture and everyday essentials.", offer: "Home edit from $29", cta: "Shop Home", secondary: "Explore the Edit", image: "/products/realistic/cutouts/chair-cutout.webp", tone: "amber" },
  { eyebrow: "Style Drop", title: "Fresh Looks. New Season.", text: "Discover directional fashion and effortless accessories.", offer: "New styles daily", cta: "Shop Fashion", secondary: "View Lookbook", image: "/products/realistic/cutouts/blouse-cutout.webp", tone: "rose" },
];
const slideLinks = ["/category/electronics", "/category/gaming", "/category/home-living", "/category/fashion"];

export function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused || reducedMotion) return;
    interval.current = setInterval(() => setActive((value) => (value + 1) % slides.length), 6500);
    return () => { if (interval.current) clearInterval(interval.current); };
  }, [paused, reducedMotion]);

  const change = (direction: number) => setActive((value) => (value + direction + slides.length) % slides.length);
  const slide = slides[active];

  return (
    <section className="hero-shell page-shell" aria-roledescription="carousel" aria-label="Featured offers" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className={`hero-slide hero-${slide.tone}`}>
        <AnimatePresence mode="wait">
          <motion.div className="hero-content" key={`copy-${active}`} initial={{ opacity: 0, y: reducedMotion ? 0 : 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reducedMotion ? 0 : -18 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
            <p className="hero-eyebrow"><span />{slide.eyebrow}</p>
            <h1>{slide.title}</h1>
            <p className="hero-copy">{slide.text}</p>
            <strong className="hero-offer">{slide.offer}</strong>
            <div className="hero-actions"><a className="button button-light" href={slideLinks[active]}>{slide.cta}<MoveRight size={18} /></a><a className="hero-secondary" href="#daily-deals">{slide.secondary}</a></div>
          </motion.div>
        </AnimatePresence>
        <div className="hero-visual" aria-hidden="true">
          <motion.div className="orbit orbit-one" animate={reducedMotion ? {} : { rotate: 360 }} transition={{ repeat: Infinity, duration: 24, ease: "linear" }}><i /></motion.div>
          <div className="orbit orbit-two" />
          <AnimatePresence mode="wait"><motion.div key={`image-${active}`} initial={{ opacity: 0, scale: 0.88, x: 40 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 1.06, x: -25 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}><Image src={slide.image} alt="" width={600} height={500} priority={active === 0} loading="eager" /></motion.div></AnimatePresence>
          <span className="floating-pill pill-one">Free express delivery</span><span className="floating-pill pill-two">4.9 ★ customer favorite</span>
        </div>
        <div className="hero-controls">
          <button onClick={() => change(-1)} aria-label="Previous offer"><ArrowLeft /></button><button onClick={() => change(1)} aria-label="Next offer"><ArrowRight /></button>
        </div>
        <div className="hero-pagination">{slides.map((item, index) => <button key={item.title} onClick={() => setActive(index)} className={index === active ? "is-active" : ""} aria-label={`Go to slide ${index + 1}`} aria-current={index === active ? "true" : undefined}><span /></button>)}</div>
        <div className="hero-count"><strong>0{active + 1}</strong><span>/ 0{slides.length}</span></div>
      </div>
    </section>
  );
}
