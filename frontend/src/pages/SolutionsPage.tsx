import { Link } from 'react-router-dom';
import { SOLUTIONS_DATA } from '../data/mockData';
import { 
  ArrowRight, 
  CheckCircle 
} from '@phosphor-icons/react';
import { CtaSection } from '../components/home/CtaSection';

export function SolutionsPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      
      {/* Header Direto e Elegante (Sem badges artificiais) */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-heading text-3xl sm:text-5xl font-bold text-[#0F172A] tracking-tight mb-4 leading-tight">
          Soluções estruturais completas, do conceito ao canteiro
        </h1>
        <p className="font-body text-sm sm:text-base text-slate-600 leading-relaxed">
          Projetos executivos racionais desenvolvidos com análise não-linear, otimização de materiais e compatibilização BIM para eliminar imprevistos.
        </p>
      </div>

      {/* Grid de Soluções Direto e Intuitivo (Sem ícones) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
        {SOLUTIONS_DATA.map((sol) => (
          <div
            key={sol.id}
            id={sol.slug}
            className="bg-white border border-slate-200 rounded-sm p-7 sm:p-8 flex flex-col justify-between hover:border-[#0284C7] hover:shadow-md transition-all group"
          >
            <div className="space-y-4">
              {/* Title & Subtitle */}
              <div>
                <h3 className="font-heading text-xl font-bold text-[#0F172A] group-hover:text-[#0284C7] transition-colors leading-tight mb-1.5">
                  {sol.title}
                </h3>
                <p className="text-xs font-condensed uppercase tracking-wider text-slate-500 font-semibold">
                  {sol.subtitle}
                </p>
              </div>

              {/* Core Value Description (Concise & Clear) */}
              <p className="font-body text-xs text-slate-600 leading-relaxed">
                {sol.shortDescription}
              </p>

              {/* Key Deliverables Bullet Points */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-[10px] font-condensed uppercase tracking-wider text-slate-400 font-bold block mb-1">
                  Entregáveis Principais:
                </span>
                {sol.deliverables.slice(0, 3).map((item) => (
                  <div key={item} className="flex items-start gap-2 text-xs font-body text-slate-700">
                    <CheckCircle size={14} weight="fill" className="text-[#0284C7] shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Footer: Metric & Action */}
            <div className="pt-5 mt-6 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-condensed uppercase tracking-widest text-slate-400 block font-semibold">
                  Impacto Estimado
                </span>
                <span className="text-xs font-condensed font-bold text-[#0284C7]">
                  {sol.metrics[0].value} {sol.metrics[0].label}
                </span>
              </div>

              <Link
                to="/contato"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-[#0F172A] group-hover:bg-[#0284C7] text-white font-condensed text-xs uppercase tracking-wider font-bold transition-colors shadow-xs cursor-pointer"
              >
                <span>Orçamento</span>
                <ArrowRight size={12} weight="bold" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* 3-Step Clean & Intuitive Workflow Strip */}
      <div className="bg-slate-50 border border-slate-200 rounded-sm p-6 sm:p-10 mb-20">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[10px] font-condensed uppercase tracking-widest text-[#0284C7] font-bold block mb-1">
            FLUXO DE TRABALHO
          </span>
          <h2 className="font-heading text-xl sm:text-2xl font-bold text-[#0F172A]">
            Como integramos os projetos à sua obra
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-sm border border-slate-200 space-y-2">
            <span className="font-heading text-2xl font-bold text-[#0284C7] block">01.</span>
            <h3 className="font-heading text-sm font-bold text-[#0F172A]">Diagnóstico & Concepção</h3>
            <p className="font-body text-xs text-slate-600 leading-relaxed">
              Análise de sondagens, arquitetura e definição da tipologia estrutural mais econômica.
            </p>
          </div>

          <div className="bg-white p-5 rounded-sm border border-slate-200 space-y-2">
            <span className="font-heading text-2xl font-bold text-[#0284C7] block">02.</span>
            <h3 className="font-heading text-sm font-bold text-[#0F172A]">Cálculo FEA & Otimização</h3>
            <p className="font-body text-xs text-slate-600 leading-relaxed">
              Modelagem numérica tridimensional e redução de armaduras com análise não-linear.
            </p>
          </div>

          <div className="bg-white p-5 rounded-sm border border-slate-200 space-y-2">
            <span className="font-heading text-2xl font-bold text-[#0284C7] block">03.</span>
            <h3 className="font-heading text-sm font-bold text-[#0F172A]">Detalhamento BIM LOD 400</h3>
            <p className="font-body text-xs text-slate-600 leading-relaxed">
              Plantas executivas sem interferências e suporte técnico direto no canteiro.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <CtaSection />
    </div>
  );
}
