import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSlider } from "@/components/home/hero-slider";
import { TrustStrip } from "@/components/home/trust-strip";
import { HomeSections } from "@/components/home/home-sections";

export default function Home() {
  return <><Header /><main><HeroSlider /><TrustStrip /><HomeSections /></main><Footer /></>;
}
