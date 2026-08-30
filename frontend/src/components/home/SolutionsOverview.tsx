import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SOLUTIONS_DATA } from '../../data/mockData';
import { ArrowRight, HandSwipeLeft } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

export function SolutionsOverview() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    // 1. Desktop & Tablet Mode (>= 768px): Pinned Track com Buffer Suave
    mm.add('(min-width: 768px)', () => {
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const windowWidth = window.innerWidth;
        return Math.max(0, trackWidth - windowWidth + 80);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'center center',
          end: () => `+=${Math.max(1400, getScrollAmount() * 1.35)}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${Math.max(5, Math.min(100, self.progress * 100))}%`;
            }
          },
        }
      });

      tl.to({}, { duration: 0.4 });
      tl.to(track, {
        x: () => -getScrollAmount(),
        duration: 2.2,
        ease: 'power1.inOut',
        force3D: true,
      });
      tl.to({}, { duration: 0.35 });
    });

    // 2. Mobile Mode (< 768px): Scroll Horizontal Ágil e Dinâmico (Sem travar o usuário)
    mm.add('(max-width: 767px)', () => {
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const windowWidth = window.innerWidth;
        return Math.max(0, trackWidth - windowWidth + 32);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 12%',
          end: () => `+=${Math.max(700, getScrollAmount() * 1.1)}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.5, // Resposta mais ágil e natural ao toque no celular
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${Math.max(5, Math.min(100, self.progress * 100))}%`;
            }
          },
        }
      });

      tl.to({}, { duration: 0.15 });
      tl.to(track, {
        x: () => -getScrollAmount(),
        duration: 1.8,
        ease: 'none',
        force3D: true,
      });
      tl.to({}, { duration: 0.15 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="servicos-section"
      ref={sectionRef}
      className="relative z-10 w-full flex flex-col justify-center overflow-hidden bg-white border-y border-slate-200/80 shadow-xs py-8 sm:py-14"
    >
      {/* Pinned Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-4 sm:mb-8 shrink-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4">
          <div className="max-w-2xl">
            <span className="text-[10px] sm:text-[11px] font-condensed uppercase tracking-widest text-[#0284C7] font-bold block mb-1">
              Engenharia Estrutural de Ponta a Ponta
            </span>
            <h2 className="font-heading text-xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] tracking-tight leading-tight">
              Serviços prestados para viabilizar geometrias audaciosas
            </h2>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3.5 pt-1 sm:pt-0">
            {/* Mobile Interaction Badge */}
            <div className="flex md:hidden items-center gap-1.5 text-[11px] font-condensed uppercase tracking-wider text-slate-500 font-semibold bg-slate-50 px-2.5 py-1 rounded-sm border border-slate-200">
              <HandSwipeLeft size={14} className="text-[#0284C7] animate-pulse" />
              <span>Role para explorar</span>
            </div>

            {/* Desktop Interaction Badge */}
            <div className="hidden md:flex items-center gap-1.5 text-xs font-condensed uppercase tracking-wider text-slate-500 font-semibold bg-slate-50 px-3.5 py-1.5 rounded-sm border border-slate-200">
              <span>Role para explorar horizontalmente</span>
              <ArrowRight size={13} weight="bold" className="text-[#0284C7] animate-pulse" />
            </div>

            <Link
              to="/solucoes"
              className="inline-flex items-center gap-1.5 text-xs font-condensed uppercase tracking-wider font-bold text-[#0F172A] hover:text-[#0284C7] transition-colors group cursor-pointer"
            >
              <span>VER TODOS</span>
              <ArrowRight size={13} weight="bold" className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Horizontal Pinned Track com Aceleração de Hardware */}
      <div className="w-full overflow-visible">
        <div
          ref={trackRef}
          className="flex flex-nowrap items-stretch gap-3.5 sm:gap-6 w-max pl-4 sm:pl-8 lg:pl-16 pr-6 sm:pr-24 lg:pr-32 will-change-transform transform-gpu"
          style={{
            willChange: 'transform',
            transform: 'translate3d(0, 0, 0)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          {SOLUTIONS_DATA.map((sol) => (
            <div
              key={sol.id}
              className="w-[80vw] max-w-[310px] sm:max-w-none sm:w-[330px] lg:w-[360px] shrink-0 flex flex-col justify-between bg-white border border-slate-200 rounded-sm p-5 sm:p-7 group transform-gpu shadow-2xs"
              style={{
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              <div>
                {/* Title */}
                <h3 className="font-heading text-base sm:text-xl font-bold text-[#0F172A] mb-1 group-hover:text-[#0284C7] transition-colors leading-snug">
                  {sol.title}
                </h3>

                {/* Subtitle / Short Description */}
                <p className="font-body text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {sol.subtitle}
                </p>
              </div>

              {/* Card Footer: Main Metric & Detail Link */}
              <div className="pt-4 sm:pt-5 mt-4 sm:mt-6 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-condensed uppercase tracking-widest text-slate-400 block font-semibold">
                    Métrica Principal
                  </span>
                  <span className="text-xs font-condensed font-bold text-[#0284C7]">
                    {sol.metrics[0].value} {sol.metrics[0].label}
                  </span>
                </div>

                <Link
                  to={`/solucoes#${sol.slug}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm bg-slate-50 hover:bg-[#0284C7] text-slate-700 hover:text-white font-condensed text-[11px] sm:text-xs uppercase tracking-wider font-bold transition-colors border border-slate-200 hover:border-[#0284C7] cursor-pointer"
                >
                  <span>Detalhes</span>
                  <ArrowRight size={11} weight="bold" />
                </Link>
              </div>
            </div>
          ))}

          {/* Final CTA Card on the Horizontal Track */}
          <div 
            className="w-[75vw] max-w-[280px] sm:max-w-none sm:w-[290px] shrink-0 flex flex-col justify-between bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white rounded-sm p-5 sm:p-7 transform-gpu shadow-xs"
            style={{
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            <div>
              <span className="text-[9px] sm:text-[10px] font-condensed uppercase tracking-widest text-sky-400 font-bold block mb-1.5">
                INTEGRAÇÃO COMPLETA
              </span>
              <h3 className="font-heading text-base sm:text-xl font-bold mb-1 leading-snug">
                Engenharia de precisão
              </h3>
              <p className="font-body text-xs text-slate-300 line-clamp-2 leading-relaxed">
                Consulte o memorial descritivo e as especificações técnicas.
              </p>
            </div>

            <Link
              to="/solucoes"
              className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-sm bg-[#0284C7] hover:bg-[#0369a1] text-white font-condensed text-xs uppercase tracking-wider font-bold transition-colors shadow-sm cursor-pointer mt-3"
            >
              <span>Ver Serviços</span>
              <ArrowRight size={12} weight="bold" />
            </Link>
          </div>
        </div>
      </div>

      {/* Dynamic Progress Line (Mobile & Desktop) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-4 sm:mt-6">
        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
          <div 
            ref={progressBarRef}
            className="h-full bg-[#0284C7] transition-all duration-75 ease-out rounded-full"
            style={{ width: '5%' }}
          />
        </div>
      </div>
    </section>
  );
}
