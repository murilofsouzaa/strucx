import { HelmetVideoScroller } from '../components/home/HelmetVideoScroller';
import { HeroSection } from '../components/home/HeroSection';
import { SolutionsOverview } from '../components/home/SolutionsOverview';
import { CinematicVideoSection } from '../components/home/CinematicVideoSection';
import { CtaSection } from '../components/home/CtaSection';

export function HomePage() {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      {/* 3D Helmet Scroll-Scrubbing Background */}
      <HelmetVideoScroller />

      {/* Clean, Spacious Editorial Content Flow */}
      <div className="relative z-10">
        <div className="space-y-16 sm:space-y-24">
          <HeroSection />
          <SolutionsOverview />
          <CinematicVideoSection />
        </div>

        {/* Seção Pós-Vídeo com Fundo 100% Branco Sólido (Cobre o capacete completamente) */}
        <div className="w-full bg-white relative z-20 border-t border-slate-100 py-6 sm:py-10">
          <CtaSection />
        </div>
      </div>
    </div>
  );
}
