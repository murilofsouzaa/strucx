import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, ArrowRight } from '@phosphor-icons/react';

export function CtaSection() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
    >
      <div className="rounded-sm p-10 sm:p-16 bg-[#0F172A] border border-slate-800 text-center relative overflow-hidden shadow-lg">
        
        {/* Glow elements */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <h2 className="font-heading text-3xl sm:text-5xl font-bold text-white tracking-tight max-w-3xl mx-auto mb-6 leading-tight">
          Pronto para transformar complexidade estrutural em eficiência construtiva?
        </h2>

        <p className="font-body text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          Nossa equipe de engenheiros calculistas, doutores em mecânica das estruturas e especialistas em BIM está pronta para avaliar a viabilidade técnica do seu projeto.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contato"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-sm bg-[#0284C7] hover:bg-[#0369A1] text-white font-condensed text-xs uppercase tracking-wider font-bold transition-all shadow-md hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
          >
            <FileText size={16} weight="bold" />
            <span>Solicitar Estudo Estrutural</span>
            <ArrowRight size={14} weight="bold" />
          </Link>

          <a
            href="https://wa.me/5533999026628"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-sm bg-[#25D366] hover:bg-[#20bd5a] text-white font-condensed text-xs uppercase tracking-wider font-bold transition-all hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer shadow-md shadow-[#25D366]/20"
          >
            <img src="/icons/whatsapp.svg" alt="WhatsApp" className="w-4 h-4 object-contain" />
            <span>WhatsApp (33) 99902-6628</span>
          </a>
        </div>

      </div>
    </motion.section>
  );
}
