import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Cpu, Eye, ShieldCheck } from '@phosphor-icons/react';

export function CinematicVideoSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  return (
    <section 
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#0F172A] text-white border-y border-slate-800 shadow-2xl"
    >
      {/* Full-Width Background Video Player */}
      <div className="relative w-full h-[65vh] sm:h-[75vh] lg:h-[85vh] min-h-[480px] max-h-[900px] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105 transform-gpu opacity-75"
        >
          <source src="/videos/video2.mp4" type="video/mp4" />
          <source src="/videos/video1.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Multi-Layer Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-[#0F172A]/70 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0F172A]/30 to-[#0F172A]/80 pointer-events-none" />

        {/* Center Content Overlay */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between py-12 sm:py-16">
          
          {/* Top Header Tag */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-sky-500/10 border border-sky-400/30 backdrop-blur-md text-[11px] font-condensed uppercase tracking-widest text-sky-400 font-bold">
              <Eye size={14} weight="bold" />
              <span>Simulação & Modelagem Visual</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-condensed uppercase tracking-wider text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>GPU Render Stream</span>
            </div>
          </div>

          {/* Core Architectural Headline */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl space-y-4"
          >
            <span className="text-xs font-condensed uppercase tracking-widest text-[#38BDF8] font-bold block">
              Gêmeos Digitais & Análise Não-Linear
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white">
              Visualização em escala real de geometrias complexas e esforços estruturais.
            </h2>
            <p className="font-body text-xs sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Integração completa entre cálculos de elementos finitos (FEA), túnel de vento computacional e detalhamento executivo BIM LOD 400 para eliminar imprevistos em canteiro.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/tecnologia"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-sm bg-[#0284C7] hover:bg-[#0369a1] text-white font-condensed text-xs uppercase tracking-wider font-bold transition-all shadow-md shadow-[#0284C7]/20 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
              >
                <span>Conhecer Tecnologia & Softwares</span>
                <ArrowRight size={14} weight="bold" />
              </Link>

              <Link
                to="/projetos"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-sm bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-condensed text-xs uppercase tracking-wider font-semibold transition-all border border-white/20 hover:border-white/40 cursor-pointer"
              >
                <span>Ver Obras Executadas</span>
              </Link>
            </div>
          </motion.div>

          {/* Bottom Highlights & Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2.5">
              <Cpu size={20} className="text-[#38BDF8] shrink-0" />
              <div>
                <span className="font-heading font-bold text-white block text-sm">GPU Solver</span>
                <span className="font-body text-[11px] text-slate-400">Análise de Elementos Finitos</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <ShieldCheck size={20} className="text-emerald-400 shrink-0" />
              <div>
                <span className="font-heading font-bold text-white block text-sm">BIM LOD 400</span>
                <span className="font-body text-[11px] text-slate-400">Detalhamento Construtivo</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
              <div>
                <span className="font-heading font-bold text-white block text-sm">Túnel de Vento CFD</span>
                <span className="font-body text-[11px] text-slate-400">Cargas Aerodinâmicas</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
              <div>
                <span className="font-heading font-bold text-white block text-sm">Telemetria SHM</span>
                <span className="font-body text-[11px] text-slate-400">Monitoramento IoT 24/7</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
