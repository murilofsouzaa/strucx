import { HelmetVideoScroller } from '../components/home/HelmetVideoScroller';
import { HeroSection } from '../components/home/HeroSection';
import { SolutionsOverview } from '../components/home/SolutionsOverview';
import { CtaSection } from '../components/home/CtaSection';

export function HomePage() {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      {/* 3D Helmet Scroll-Scrubbing Background (Persists until end of homepage) */}
      <HelmetVideoScroller />

      {/* Clean, Spacious Editorial Content Flow */}
      <div className="relative z-10 space-y-16 sm:space-y-24">
        <HeroSection />
        <SolutionsOverview />
        <CtaSection />
      </div>
    </div>
  );
}
