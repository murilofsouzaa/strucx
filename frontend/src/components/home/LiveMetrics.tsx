import { motion } from 'framer-motion';
import { STATS_DATA } from '../../data/mockData';
import { TrendUp, ShieldCheck, Leaf, Compass } from '@phosphor-icons/react';

const ICONS = [Compass, TrendUp, ShieldCheck, Leaf];

export function LiveMetrics() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
    >
      <div className="bg-white/95 border border-slate-200 rounded-sm p-8 sm:p-12 shadow-xs backdrop-blur-md">
        
        {/* Top Header Indicator */}
        <div className="pb-8 mb-10 border-b border-slate-200">
          <span className="text-[11px] font-condensed uppercase tracking-widest text-[#0284C7] font-bold block mb-1">
            Indicadores Estruturais Consolidados
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
            Precisão matemática comprovada em escala
          </h2>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS_DATA.map((stat, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <motion.div
                key={stat.label}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-50/90 border border-slate-200 rounded-sm p-6 hover:border-[#0284C7] transition-all shadow-2xs group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 rounded-sm bg-white border border-slate-200 flex items-center justify-center text-[#0284C7] group-hover:bg-[#0284C7] group-hover:text-white transition-colors shadow-2xs">
                    <Icon size={17} weight="bold" />
                  </div>
                  <span className="text-[10px] font-condensed uppercase tracking-wider text-slate-400 font-semibold">
                    METRIC #{index + 1}
                  </span>
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-heading text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
                    {stat.value}
                  </span>
                  {stat.suffix && (
                    <span className="text-sm font-condensed text-[#0284C7] font-bold">
                      {stat.suffix}
                    </span>
                  )}
                </div>

                <h3 className="text-xs font-condensed uppercase tracking-wider font-bold text-slate-900 mb-1">
                  {stat.label}
                </h3>
                <p className="text-[12px] font-body text-[#334155] leading-normal">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
