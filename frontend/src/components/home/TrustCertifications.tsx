import { motion } from 'framer-motion';
import { TESTIMONIALS_DATA, TRUST_LOGOS } from '../../data/mockData';
import { Quotes, Certificate, Buildings, ShieldCheck } from '@phosphor-icons/react';

export function TrustCertifications() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
    >
      {/* Logos Strip */}
      <div className="mb-24">
        <span className="text-center block text-[11px] font-condensed uppercase tracking-widest text-slate-500 font-bold mb-8">
          Engenharia Estrutural Confiada pelas Maiores Construtoras e Fundos Imobiliários
        </span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TRUST_LOGOS.map((brand) => (
            <motion.div
              key={brand.name}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 px-4 py-3.5 rounded-sm bg-slate-50 border border-slate-200 w-full justify-center text-xs font-condensed uppercase tracking-wider text-[#0F172A] hover:border-[#0284C7] transition-all shadow-2xs cursor-pointer"
            >
              <Buildings size={16} className="text-[#0284C7]" />
              <span className="font-bold tracking-wider">{brand.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials Bento */}
      <div className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-condensed uppercase tracking-widest text-[#0284C7] font-bold block mb-2">
            Avaliações Técnicas
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
            O que diretores de engenharia dizem sobre a StrucX
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((item) => (
            <motion.div
              key={item.author}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-slate-200 rounded-sm p-7 sm:p-8 flex flex-col justify-between hover:border-[#0284C7] transition-all shadow-xs cursor-pointer"
            >
              <div>
                <Quotes size={28} weight="fill" className="text-[#0284C7]/40 mb-4" />
                <p className="font-body text-xs sm:text-sm text-[#334155] leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex flex-col">
                <span className="font-heading text-xs font-bold text-[#0F172A]">{item.author}</span>
                <span className="text-[11px] text-slate-500 font-condensed uppercase tracking-wider font-semibold">{item.role} · {item.company}</span>
                <span className="text-[10px] text-[#0284C7] font-condensed uppercase tracking-wider mt-1 font-bold">Obra: {item.project}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Technical Standards Bar */}
      <div className="p-7 rounded-sm bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-6 shadow-2xs">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-sm bg-white border border-slate-200 flex items-center justify-center text-[#0284C7] shadow-2xs">
            <Certificate size={22} weight="bold" />
          </div>
          <div>
            <span className="font-heading text-sm font-bold text-[#0F172A] block">
              Conformidade com Normas Nacionais e Internacionais
            </span>
            <span className="text-xs font-body text-[#334155]">
              Projetos auditados e em rigorosa conformidade com NBR 6118, NBR 8800, Eurocodes e ACI 318.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-condensed uppercase tracking-wider text-[#0F172A]">
          <span className="flex items-center gap-1.5 font-bold">
            <ShieldCheck size={16} className="text-[#0284C7]" />
            ART & RRT Emitidas
          </span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1.5 font-bold">
            Seguro RC R$ 20 Milhões
          </span>
        </div>
      </div>
    </motion.section>
  );
}
