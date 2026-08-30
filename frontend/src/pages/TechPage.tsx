import { useState } from 'react';
import { ShieldCheck } from '@phosphor-icons/react';
import { CtaSection } from '../components/home/CtaSection';

export function TechPage() {
  const [selectedTab, setSelectedTab] = useState<'fea' | 'topology' | 'iot' | 'bim'>('fea');

  const tabs = [
    { id: 'fea', label: 'FEA Solver em Nuvem' },
    { id: 'topology', label: 'Otimização Topológica' },
    { id: 'iot', label: 'Telemetria IoT (SHM)' },
    { id: 'bim', label: 'Pipeline BIM LOD 400' }
  ];

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#0F172A] tracking-tight mb-4 leading-tight">
          A fronteira entre a matemática pura e o concreto armado
        </h1>
        <p className="font-body text-sm sm:text-base text-slate-600 leading-relaxed">
          Nossa stack proprietária integra simulação de elementos finitos acelerada por GPU, algoritmos de otimização topológica e sensoriamento IoT contínuo.
        </p>
      </div>

      {/* Minimalist Tabs Selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-slate-100 border border-slate-200 rounded-sm max-w-3xl mx-auto mb-16">
        {tabs.map((tab) => {
          const isActive = selectedTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-sm font-condensed text-xs uppercase tracking-wider transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#0F172A] text-white font-bold shadow-xs'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-slate-200/70 font-semibold'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="bg-white rounded-sm p-6 sm:p-12 border border-slate-200 mb-20 shadow-xs">
        {selectedTab === 'fea' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-[10px] font-condensed uppercase tracking-widest text-[#0284C7] font-bold">
                MÓDULO DE CÁLCULO NUMÉRICO
              </span>
              <h2 className="font-heading text-3xl font-bold text-[#0F172A] leading-tight">
                Análise Física e Geométrica Não-Linear de Alta Ordem
              </h2>
              <p className="font-body text-xs sm:text-sm text-slate-600 leading-relaxed">
                Calculamos o comportamento real das estruturas sob solicitações extremas. Ao invés de suposições elásticas simplificadas, nosso motor simula a fissuração progressiva do concreto, a plastificação das armaduras de aço e os efeitos de instabilidade global (P-Delta) e vento dinâmico.
              </p>
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-xs font-body text-slate-700">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  <span>Resolução de até 50 milhões de equações simultâneas</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-body text-slate-700">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  <span>Análise dinâmica modal e espectral de rajadas de vento</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-body text-slate-700">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  <span>Cálculo automático de fluência e retração do concreto</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#0F172A] p-6 rounded-sm border border-slate-800 font-mono-code text-xs space-y-3 text-slate-200">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                <span>strucx_solver_matrix.cu</span>
                <span className="text-emerald-400 text-[10px] font-bold">CUDA 12.4 OPTIMIZED</span>
              </div>
              <pre className="text-slate-300 text-[11px] overflow-x-auto leading-relaxed">
{`__global__ void AssembleStiffnessMatrix(
    const ElementMesh* d_elements,
    float* d_GlobalK,
    int numNodes
) {
    int idx = blockIdx.x * blockDim.x + threadIdx.x;
    if (idx >= numNodes) return;
    
    // Non-linear Constitutive Tensor
    Matrix6x6 Ke = CalculateTangentStiffness(d_elements[idx]);
    AtomicAddBlock(d_GlobalK, Ke, idx);
}`}
              </pre>
            </div>
          </div>
        )}

        {selectedTab === 'topology' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-[10px] font-condensed uppercase tracking-widest text-[#0284C7] font-bold">
                DESIGN GENERATIVO
              </span>
              <h2 className="font-heading text-3xl font-bold text-[#0F172A] leading-tight">
                Otimização Topológica de Formas e Bitolas
              </h2>
              <p className="font-body text-xs sm:text-sm text-slate-600 leading-relaxed">
                Utilizamos algoritmos genéticos e método SIMP (Solid Isotropic Material with Penalization) para esculpir trajetórias ideais de tensões em vigas de transição e nós de pórtico.
              </p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-sm">
                <div className="text-xs font-bold font-heading text-slate-900 mb-1">Média de Redução de Aço</div>
                <div className="font-heading text-3xl font-bold text-[#0284C7]">-18.4%</div>
                <div className="text-[11px] text-slate-500 font-body mt-1">Comparado ao dimensionamento tradicional de bielas e tirantes</div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-50 p-6 rounded-sm border border-slate-200">
              <div className="space-y-4">
                <div className="text-xs font-condensed uppercase tracking-wider text-slate-800 font-bold">
                  Iterações do Algoritmo SIMP
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Iteração 01 (Massa Uniforme)</span>
                    <span className="font-bold">100% Volume</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-sm overflow-hidden">
                    <div className="bg-slate-400 h-full w-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Iteração 35 (Eliminação de Vazios)</span>
                    <span className="font-bold">78% Volume</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-sm overflow-hidden">
                    <div className="bg-[#0284C7] h-full w-[78%]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-900 font-bold">
                    <span>Iteração Final (Treliça Ideal de Tensões)</span>
                    <span className="text-[#0284C7]">58% Volume Ótimo</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-sm overflow-hidden">
                    <div className="bg-[#0F172A] h-full w-[58%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'iot' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-[10px] font-condensed uppercase tracking-widest text-[#0284C7] font-bold">
                MONITORAMENTO EM TEMPO REAL
              </span>
              <h2 className="font-heading text-3xl font-bold text-[#0F172A] leading-tight">
                Telemetria de Saúde Estrutural (SHM)
              </h2>
              <p className="font-body text-xs sm:text-sm text-slate-600 leading-relaxed">
                Sensores de fibra óptica de Bragg e acelerômetros MEMS triaxiais instalados nos pontos nevrálgicos da edificação, transmitindo dados de deformação, temperatura e vibração contínua para nossa nuvem.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-sm border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-condensed uppercase font-bold">Taxa de Amostragem</div>
                  <div className="text-base font-bold text-slate-900 font-condensed">1.000 Hz</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-sm border border-slate-200">
                  <div className="text-[10px] text-slate-400 font-condensed uppercase font-bold">Latência de Alerta</div>
                  <div className="text-base font-bold text-emerald-600 font-condensed">&lt; 150 ms</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[#0F172A] p-6 rounded-sm border border-slate-800 text-white font-mono-code text-xs space-y-3">
              <div className="text-slate-400 text-[10px] uppercase border-b border-slate-800 pb-2">
                Telemetria ao Vivo · Sensor #A-104 (Pilar P12)
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Tensão Normal (σ):</span>
                <span className="text-sky-400 font-bold">14.22 MPa (72% Capacidade)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Deslocamento Horizontal:</span>
                <span className="text-emerald-400 font-bold">0.84 mm (Dentro do Limite)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Frequência Dominante:</span>
                <span className="text-slate-200 font-bold">0.31 Hz</span>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'bim' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-[10px] font-condensed uppercase tracking-widest text-[#0284C7] font-bold">
                INTEGRAÇÃO EXECUTIVA
              </span>
              <h2 className="font-heading text-3xl font-bold text-[#0F172A] leading-tight">
                Modelagem Paramétrica BIM em LOD 400
              </h2>
              <p className="font-body text-xs sm:text-sm text-slate-600 leading-relaxed">
                Cada barra de aço, estribo e inserto metálico é modelado com precisão milimétrica e vinculado diretamente ao planejamento 4D de montagem e extração 5D de custos.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-body text-slate-700">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  <span>Compatibilização automática com Revit, Tekla e IFC4</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-body text-slate-700">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  <span>Extração de lista de corte e dobra para corte CNC automático</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 p-6 bg-slate-50 rounded-sm border border-slate-200 text-xs space-y-3 font-body">
              <div className="font-heading font-bold text-slate-900 text-sm mb-2">Padrões de Entrega BIM</div>
              <div className="p-3 bg-white rounded-sm border border-slate-200 flex items-center justify-between">
                <span className="font-bold font-condensed uppercase tracking-wider text-slate-700">Geometria Estrutural</span>
                <span className="text-[#0284C7] font-bold font-condensed">LOD 400 (Executivo)</span>
              </div>
              <div className="p-3 bg-white rounded-sm border border-slate-200 flex items-center justify-between">
                <span className="font-bold font-condensed uppercase tracking-wider text-slate-700">Armaduras & Insertos</span>
                <span className="text-[#0284C7] font-bold font-condensed">100% Detalhado em 3D</span>
              </div>
              <div className="p-3 bg-white rounded-sm border border-slate-200 flex items-center justify-between">
                <span className="font-bold font-condensed uppercase tracking-wider text-slate-700">Clash Detection</span>
                <span className="text-emerald-600 font-bold font-condensed">Zero Interferências</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <CtaSection />
    </div>
  );
}
