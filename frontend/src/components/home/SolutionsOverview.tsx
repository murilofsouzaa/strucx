import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SOLUTIONS_DATA } from '../../data/mockData';
import { ArrowRight } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

export function SolutionsOverview() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Cálculo exato de deslocamento horizontal
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const windowWidth = window.innerWidth;
        return Math.max(0, trackWidth - windowWidth + 80);
      };

      // Timeline do ScrollTrigger com buffer/timeout inicial de respiro para entrada ultra-suave
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'center center',
          end: () => `+=${Math.max(1800, getScrollAmount() * 1.6)}`,
          pin: true,
          pinSpacing: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        }
      });

      // 1. Timeout / Buffer de Entrada: A seção fixa no centro e fica parada para absorção do usuário
      tl.to({}, { duration: 0.45 });

      // 2. Translação Horizontal: Deslocamento gradual e orgânico com aceleração/desaceleração
      tl.to(track, {
        x: () => -getScrollAmount(),
        duration: 2.4,
        ease: 'power1.inOut',
        force3D: true,
      });

      // 3. Buffer de Saída: Pausa no último card antes de retomar a rolagem vertical
      tl.to({}, { duration: 0.35 });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full flex flex-col justify-center overflow-hidden bg-white border-y border-slate-200/80 shadow-xs py-12 sm:py-16"
    >
      {/* Pinned Section Header (Proporcionado e Elegante) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-6 sm:mb-8 shrink-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="text-[11px] font-condensed uppercase tracking-widest text-[#0284C7] font-bold block mb-1.5">
              Engenharia Estrutural de Ponta a Ponta
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F172A] tracking-tight leading-tight">
              Disciplinas integradas para viabilizar geometrias audaciosas
            </h2>
          </div>

          <div className="flex items-center gap-3.5 self-start md:self-auto">
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-condensed uppercase tracking-wider text-slate-500 font-semibold bg-slate-50 px-3.5 py-1.5 rounded-sm border border-slate-200">
              <span>Role para explorar horizontalmente</span>
              <ArrowRight size={13} weight="bold" className="text-[#0284C7] animate-pulse" />
            </div>

            <Link
              to="/solucoes"
              className="inline-flex items-center gap-2 text-xs font-condensed uppercase tracking-wider font-bold text-[#0F172A] hover:text-[#0284C7] transition-colors group cursor-pointer"
            >
              <span>VER TODAS</span>
              <ArrowRight size={14} weight="bold" className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Horizontal Pinned Track com Aceleração de Hardware na GPU */}
      <div className="w-full overflow-visible">
        <div
          ref={trackRef}
          className="flex flex-nowrap items-stretch gap-5 sm:gap-6 w-max pl-4 sm:pl-8 lg:pl-16 pr-12 sm:pr-24 lg:pr-32 will-change-transform transform-gpu"
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
              className="w-[280px] sm:w-[330px] lg:w-[360px] shrink-0 flex flex-col justify-between bg-white border border-slate-200 rounded-sm p-6 sm:p-7 group transform-gpu shadow-2xs"
              style={{
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              <div>
                {/* Header ID */}
                <div className="mb-3">
                  <span className="text-[10px] font-condensed uppercase tracking-widest text-[#0284C7] font-bold">
                    DISCIPLINA #{sol.id.slice(-2)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-lg sm:text-xl font-bold text-[#0F172A] mb-1.5 group-hover:text-[#0284C7] transition-colors leading-tight">
                  {sol.title}
                </h3>

                {/* 1-Line Description */}
                <p className="font-body text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {sol.subtitle}
                </p>
              </div>

              {/* Card Footer: Main Metric & Detail Link */}
              <div className="pt-5 mt-6 border-t border-slate-100 flex items-center justify-between">
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
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-slate-50 hover:bg-[#0284C7] text-slate-700 hover:text-white font-condensed text-xs uppercase tracking-wider font-bold transition-colors border border-slate-200 hover:border-[#0284C7] cursor-pointer"
                >
                  <span>Detalhes</span>
                  <ArrowRight size={12} weight="bold" />
                </Link>
              </div>
            </div>
          ))}

          {/* Final CTA Card on the Horizontal Track */}
          <div 
            className="w-[260px] sm:w-[290px] shrink-0 flex flex-col justify-between bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-white rounded-sm p-6 sm:p-7 transform-gpu shadow-xs"
            style={{
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            <div>
              <span className="text-[10px] font-condensed uppercase tracking-widest text-sky-400 font-bold block mb-2">
                INTEGRAÇÃO COMPLETA
              </span>
              <h3 className="font-heading text-lg sm:text-xl font-bold mb-1.5 leading-tight">
                Engenharia de precisão
              </h3>
              <p className="font-body text-xs text-slate-300 line-clamp-2 leading-relaxed">
                Consulte o memorial descritivo e as especificações técnicas.
              </p>
            </div>

            <Link
              to="/solucoes"
              className="inline-flex items-center justify-center gap-2 py-2 px-3.5 rounded-sm bg-[#0284C7] hover:bg-[#0369a1] text-white font-condensed text-xs uppercase tracking-wider font-bold transition-colors shadow-sm cursor-pointer mt-4"
            >
              <span>Ver Soluções</span>
              <ArrowRight size={13} weight="bold" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
