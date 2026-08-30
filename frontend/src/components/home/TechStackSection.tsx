import { motion } from 'framer-motion';
import { TECH_FEATURES } from '../../data/mockData';
import { Terminal, ShieldCheck, CheckCircle } from '@phosphor-icons/react';

export function TechStackSection() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
    >
      <div className="bg-white border border-slate-200 rounded-sm p-8 sm:p-12 shadow-xs">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 pb-8 border-b border-slate-200">
          <div>
            <span className="text-[11px] font-condensed uppercase tracking-widest text-[#0284C7] font-bold block mb-2">
              Stack Computacional & Automação
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
              Modelagem não-linear, dinâmica e automação algorítmica
            </h2>
          </div>
          <p className="font-body text-xs text-[#334155] max-w-md leading-relaxed">
            Utilizamos algoritmos proprietários integrados aos motores de cálculo estrutural mais avançados do mundo para viabilizar geometrias hiper-complexas.
          </p>
        </div>

        {/* Tech Grid + Live Terminal Simulation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Tech Cards (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {TECH_FEATURES.map((tech) => (
              <motion.div
                key={tech.id}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-50 border border-slate-200 rounded-sm p-5 hover:border-[#0284C7] transition-all shadow-2xs group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-condensed text-xs uppercase tracking-wider font-bold text-[#0F172A] group-hover:text-[#0284C7] transition-colors">
                    {tech.title}
                  </span>
                  <span className="text-[9px] font-condensed uppercase tracking-widest text-slate-400 bg-white px-2 py-0.5 rounded-sm border border-slate-200 font-semibold">
                    MODULE #{tech.id.slice(-1)}
                  </span>
                </div>
                <p className="font-body text-[12px] text-[#334155] leading-relaxed mb-3">{tech.description}</p>
                <div className="p-2 bg-[#0F172A] rounded-sm border border-slate-800 font-mono-code text-[10px] text-sky-400 truncate">
                  {tech.codeSnippet}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Interactive Calculation Terminal (5 cols) */}
          <div className="lg:col-span-5 bg-[#0F172A] border border-slate-800 rounded-sm p-7 text-slate-200 shadow-md relative overflow-hidden font-mono-code">
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal size={16} className="text-sky-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">STRUCX-SOLVER v4.12</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>

            {/* Terminal Log */}
            <div className="space-y-3 text-xs text-slate-300">
              <div className="text-slate-500">&gt; Iniciando análise dinâmica não-linear...</div>
              <div className="text-slate-400">&gt; Malha de Elementos Finitos (FEM): <strong className="text-white">1.842.000 nós</strong></div>
              <div className="text-slate-400">&gt; Esforço cortante na base: <strong className="text-emerald-400">Vb = 48.200 kN</strong> (OK)</div>
              <div className="text-slate-400">&gt; Drift máximo de vento (NBR 6123): <strong className="text-sky-400">H/850</strong> (&lt; Limite H/500)</div>
              
              <div className="p-3.5 bg-slate-900/90 rounded-sm border border-slate-800 my-3">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1.5 font-bold">Status da Otimização Topológica</div>
                <div className="flex items-center justify-between text-xs text-white font-bold mb-1.5">
                  <span>Massa de Aço Otimizada</span>
                  <span className="text-sky-400">-16.4% vs baseline</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-sky-500 h-full w-[84%]" />
                </div>
              </div>

              <div className="text-sky-400">&gt; [TELEMETRY] Frequência natural: f1 = 0.28 Hz (TMD calibrado)</div>
              <div className="text-slate-500 flex items-center gap-1">
                <span>&gt; _</span>
                <span className="w-1.5 h-3.5 bg-sky-400 animate-pulse" />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-400" />
                Validado com NBR 6118 / AISC 360
              </span>
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <CheckCircle size={14} weight="fill" />
                Convergência 100%
              </span>
            </div>

          </div>

        </div>

      </div>
    </motion.section>
  );
}
