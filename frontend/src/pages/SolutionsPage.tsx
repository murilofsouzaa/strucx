import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SOLUTIONS_DATA } from '../data/mockData';
import { ArrowRight, Cpu } from '@phosphor-icons/react';
import { CtaSection } from '../components/home/CtaSection';

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Análise Conceitual & Sondagens",
    desc: "Revisão dos projetos arquitetônicos, ensaios SPT/CPTu de solo e definição da tipologia estrutural mais eficiente para o empreendimento."
  },
  {
    step: "02",
    title: "Modelagem Tridimensional & FEA",
    desc: "Análise por elementos finitos contemplando cargas verticais, empuxos de vento, torções e efeitos de segunda ordem (P-Delta)."
  },
  {
    step: "03",
    title: "Otimização Topológica de Materiais",
    desc: "Algoritmos proprietários que eliminam nós ociosos de concreto e padronizam bitolas de aço para facilitar a execução no canteiro."
  },
  {
    step: "04",
    title: "Compatibilização BIM LOD 400",
    desc: "Exportação de modelos paramétricos unificados com detecção de 100% dos conflitos com instalações hidrossanitárias e de climatização."
  },
  {
    step: "05",
    title: "Acompanhamento Técnico (ATO)",
    desc: "Visitas técnicas de engenheiros calculistas seniores na armação e concretagem de lajes e pilares críticos."
  }
];

const SOFTWARE_STACK = [
  { name: "CSI ETABS Ultimate", role: "Análise de Edifícios Altos & Vento" },
  { name: "CSI SAP2000", role: "Pontes & Estruturas Especiais" },
  { name: "TQS Concreto", role: "Detalhamento de Formas & Armaduras NBR" },
  { name: "Tekla Structures", role: "Estruturas Metálicas & Detalhamento LOD 400" },
  { name: "Autodesk Revit Structure", role: "Coordenação BIM Interdisciplinar" },
  { name: "Plaxis 3D Geotechnical", role: "Interação Solo-Estrutura & Contenções" }
];

export function SolutionsPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const slug = location.hash.replace('#', '');
      const el = document.getElementById(slug);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.hash]);

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#0F172A] tracking-tight mb-4 leading-tight">
          Soluções estruturais projetadas para máxima eficiência e segurança
        </h1>
        <p className="font-body text-sm sm:text-base text-slate-600 leading-relaxed">
          Cobrimos todo o ciclo de vida estrutural: do cálculo conceitual e fundações à modelagem executiva BIM e monitoramento IoT contínuo.
        </p>
      </div>

      {/* Solutions Detail List */}
      <div className="space-y-12 mb-24">
        {SOLUTIONS_DATA.map((sol, index) => (
          <div
            key={sol.id}
            id={sol.slug}
            className="bg-white border border-slate-200 rounded-sm p-6 sm:p-10 lg:p-12 shadow-xs"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left col / Content */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-[10px] font-condensed text-[#0284C7] uppercase tracking-widest block font-bold mb-1">
                    DISCIPLINA #{index + 1}
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
                    {sol.title}
                  </h2>
                </div>

                <p className="text-xs font-condensed uppercase tracking-wider text-slate-500 font-bold">
                  {sol.subtitle}
                </p>

                <p className="font-body text-sm text-slate-600 leading-relaxed">
                  {sol.fullDescription}
                </p>

                {/* Deliverables Box */}
                <div className="p-5 bg-slate-50 rounded-sm border border-slate-200 space-y-3">
                  <h4 className="text-xs font-condensed uppercase tracking-wider text-slate-800 font-bold">
                    Entregáveis Executivos & Escopo:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {sol.deliverables.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs font-body text-slate-700">
                        <span className="text-[#0284C7] font-bold shrink-0">—</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Applications */}
                <div>
                  <span className="text-[10px] font-condensed text-slate-400 uppercase tracking-widest block mb-2 font-bold">
                    Aplicações Primárias:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {sol.applications.map((app) => (
                      <span
                        key={app}
                        className="px-3 py-1 rounded-sm bg-slate-100 border border-slate-200 text-xs font-condensed uppercase tracking-wider text-slate-700 font-semibold"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right col / Metrics & Tags */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6 bg-slate-50 p-6 sm:p-8 rounded-sm border border-slate-200">
                <div>
                  <h4 className="text-xs font-condensed uppercase tracking-wider text-slate-800 font-bold mb-4">
                    Métricas & Desempenho
                  </h4>

                  <div className="space-y-3 mb-8">
                    {sol.metrics.map((m) => (
                      <div key={m.label} className="p-3.5 bg-white rounded-sm border border-slate-200 flex items-center justify-between">
                        <span className="text-xs text-slate-600 font-body">{m.label}</span>
                        <span className="text-base font-bold font-condensed text-[#0F172A]">{m.value}</span>
                      </div>
                    ))}
                  </div>

                  <h4 className="text-xs font-condensed uppercase tracking-wider text-slate-800 font-bold mb-3">
                    Tecnologias & Normas
                  </h4>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {sol.tags.map((t) => (
                      <span key={t} className="text-[10px] font-condensed uppercase tracking-wider bg-white text-slate-700 px-2.5 py-1 rounded-sm border border-slate-200 font-semibold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to="/contato"
                  state={{ selectedDiscipline: sol.title }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-sm bg-[#0F172A] hover:bg-[#0284C7] text-white font-condensed text-xs uppercase tracking-wider font-bold transition-all shadow-sm cursor-pointer"
                >
                  <span>Solicitar Proposta Técnica</span>
                  <ArrowRight size={14} weight="bold" />
                </Link>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Engineering Workflow */}
      <div className="mb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-condensed uppercase tracking-widest text-[#0284C7] font-semibold block mb-2">
            Metodologia StrucX
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
            Como estruturamos cada empreendimento
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {WORKFLOW_STEPS.map((wf) => (
            <div
              key={wf.step}
              className="bg-white border border-slate-200 p-5 rounded-sm flex flex-col justify-between hover:border-[#0284C7] transition-all shadow-xs group"
            >
              <div>
                <div className="font-condensed text-2xl font-bold text-[#0284C7] mb-3 group-hover:translate-x-1 transition-transform">
                  {wf.step}
                </div>
                <h3 className="font-heading text-xs font-bold text-slate-900 mb-2 leading-snug">
                  {wf.title}
                </h3>
                <p className="font-body text-[12px] text-slate-500 leading-relaxed">
                  {wf.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Software Stack Section */}
      <div className="bg-white p-8 sm:p-10 rounded-sm border border-slate-200 mb-16 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] font-condensed text-[#0284C7] uppercase font-bold tracking-widest">
              Ecossistema Computacional Homologado
            </span>
            <h3 className="font-heading text-2xl font-bold text-[#0F172A] mt-1">
              Softwares e motores de cálculo de classe mundial
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-condensed uppercase tracking-wider text-slate-600 bg-slate-50 px-3 py-1.5 rounded-sm border border-slate-200 font-semibold">
            <Cpu size={16} className="text-[#0284C7]" />
            <span>Licenças Corporativas Oficiais</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SOFTWARE_STACK.map((soft) => (
            <div key={soft.name} className="p-4 bg-slate-50 rounded-sm border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-[#0F172A] font-condensed uppercase tracking-wider">{soft.name}</div>
                <div className="text-[11px] font-body text-slate-500">{soft.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CtaSection />
    </div>
  );
}
