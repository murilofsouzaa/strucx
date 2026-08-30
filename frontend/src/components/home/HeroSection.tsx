import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CaretDown } from '@phosphor-icons/react';

export function HeroSection() {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight * 0.85,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-between pt-28 sm:pt-36 pb-12 sm:pb-14 px-4 sm:px-6 lg:px-8 z-10 max-w-7xl mx-auto w-full">
      
      {/* Center Value Proposition */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full flex flex-col items-center text-center my-auto"
      >

        {/* Main Headline */}
        <h1 className="font-heading text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-[#0F172A] max-w-5xl leading-[1.12] sm:leading-[1.08] mb-3 sm:mb-6">
          A inteligência por trás das maiores <span className="text-[#0284C7]">megaestruturas</span> da América Latina.
        </h1>

        {/* Subtitle */}
        <p className="font-body text-xs sm:text-base lg:text-lg text-[#334155] max-w-2xl font-normal leading-relaxed my-3 sm:mb-10 px-2">
          Projetamos o esqueleto de arranha-céus, pontes estaiadas e complexos industriais onde a precisão matemática e a eficiência construtiva são intransigentes.
        </p>

        {/* High-Impact Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto mt-2 sm:mt-0">
          <Link
            to="/contato"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-sm bg-[#0F172A] hover:bg-[#0284C7] text-white font-condensed text-xs uppercase tracking-wider font-bold transition-all duration-200 shadow-sm hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
          >
            <span>Iniciar Projeto Estrutural</span>
            <ArrowRight size={15} weight="bold" />
          </Link>

          <Link
            to="/projetos"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-sm bg-white hover:bg-slate-50 text-[#0F172A] font-condensed text-xs uppercase tracking-wider font-semibold transition-all duration-200 border border-slate-300 shadow-2xs hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
          >
            <span>Explorar Obras</span>
          </Link>
        </div>

      </motion.div>

      {/* High-Contrast Glassmorphic Scroll Prompt */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="flex flex-col items-center justify-center text-center mt-6"
      >
        <button
          onClick={scrollToNext}
          className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/85 backdrop-blur-md border border-slate-200/90 shadow-sm text-slate-800 hover:text-[#0284C7] hover:border-[#0284C7] hover:bg-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none"
          aria-label="Rolar para a próxima seção"
        >
          <span className="text-[11px] font-condensed uppercase tracking-wider font-bold">
            Role para explorar
          </span>
          <div className="w-5 h-5 rounded-full bg-slate-100 group-hover:bg-sky-50 flex items-center justify-center transition-colors">
            <CaretDown size={13} weight="bold" className="animate-bounce text-[#0284C7]" />
          </div>
        </button>
      </motion.div>

    </section>
  );
}
