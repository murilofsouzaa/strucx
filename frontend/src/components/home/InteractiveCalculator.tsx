import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  FilePdf, 
  ClockCounterClockwise,
  Info,
  Buildings,
  Factory,
  Bridge
} from '@phosphor-icons/react';

type BuildingType = 'commercial' | 'residential' | 'industrial' | 'infrastructure';
type StructuralSystem = 'concrete' | 'steel' | 'composite' | 'timber_hybrid';

interface SystemMetric {
  steelRateKgM2: number;
  concreteRateM3M2: number;
  co2KgM2: number;
  speedIndex: number;
  costIndex: number;
}

const METRICS_TABLE: Record<BuildingType, Record<StructuralSystem, SystemMetric>> = {
  commercial: {
    concrete: { steelRateKgM2: 78, concreteRateM3M2: 0.38, co2KgM2: 240, speedIndex: 1.0, costIndex: 1.0 },
    steel: { steelRateKgM2: 62, concreteRateM3M2: 0.18, co2KgM2: 210, speedIndex: 1.45, costIndex: 1.12 },
    composite: { steelRateKgM2: 54, concreteRateM3M2: 0.22, co2KgM2: 195, speedIndex: 1.5, costIndex: 1.08 },
    timber_hybrid: { steelRateKgM2: 28, concreteRateM3M2: 0.12, co2KgM2: 110, speedIndex: 1.3, costIndex: 1.25 },
  },
  residential: {
    concrete: { steelRateKgM2: 65, concreteRateM3M2: 0.32, co2KgM2: 205, speedIndex: 1.0, costIndex: 1.0 },
    steel: { steelRateKgM2: 55, concreteRateM3M2: 0.15, co2KgM2: 190, speedIndex: 1.35, costIndex: 1.15 },
    composite: { steelRateKgM2: 48, concreteRateM3M2: 0.20, co2KgM2: 180, speedIndex: 1.4, costIndex: 1.10 },
    timber_hybrid: { steelRateKgM2: 22, concreteRateM3M2: 0.10, co2KgM2: 95, speedIndex: 1.25, costIndex: 1.22 },
  },
  industrial: {
    concrete: { steelRateKgM2: 50, concreteRateM3M2: 0.28, co2KgM2: 180, speedIndex: 1.0, costIndex: 1.0 },
    steel: { steelRateKgM2: 38, concreteRateM3M2: 0.08, co2KgM2: 155, speedIndex: 1.6, costIndex: 0.95 },
    composite: { steelRateKgM2: 35, concreteRateM3M2: 0.12, co2KgM2: 150, speedIndex: 1.5, costIndex: 0.98 },
    timber_hybrid: { steelRateKgM2: 18, concreteRateM3M2: 0.06, co2KgM2: 85, speedIndex: 1.35, costIndex: 1.18 },
  },
  infrastructure: {
    concrete: { steelRateKgM2: 120, concreteRateM3M2: 0.65, co2KgM2: 380, speedIndex: 1.0, costIndex: 1.0 },
    steel: { steelRateKgM2: 95, concreteRateM3M2: 0.30, co2KgM2: 320, speedIndex: 1.3, costIndex: 1.2 },
    composite: { steelRateKgM2: 85, concreteRateM3M2: 0.35, co2KgM2: 290, speedIndex: 1.4, costIndex: 1.15 },
    timber_hybrid: { steelRateKgM2: 45, concreteRateM3M2: 0.18, co2KgM2: 160, speedIndex: 1.15, costIndex: 1.35 },
  },
};

export function InteractiveCalculator() {
  const [buildingType, setBuildingType] = useState<BuildingType>('commercial');
  const [areaM2, setAreaM2] = useState<number>(35000);
  const [system, setSystem] = useState<StructuralSystem>('composite');

  const calculations = useMemo(() => {
    const data = METRICS_TABLE[buildingType][system];
    const totalSteelTons = Math.round((areaM2 * data.steelRateKgM2) / 1000);
    const totalConcreteM3 = Math.round(areaM2 * data.concreteRateM3M2);
    const totalCo2Tons = Math.round((areaM2 * data.co2KgM2) / 1000);
    const carbonSavedTons = Math.round(
      (areaM2 * (METRICS_TABLE[buildingType].concrete.co2KgM2 - data.co2KgM2)) / 1000
    );
    const timeSavedMonths = data.speedIndex > 1.0 ? Math.round((data.speedIndex - 1.0) * 12) : 0;

    return {
      totalSteelTons,
      totalConcreteM3,
      totalCo2Tons,
      carbonSavedTons: Math.max(0, carbonSavedTons),
      timeSavedMonths,
      speedGain: Math.round((data.speedIndex - 1.0) * 100),
      steelKgM2: data.steelRateKgM2,
      concreteM3M2: data.concreteRateM3M2,
    };
  }, [buildingType, areaM2, system]);

  const buildingTypesList = [
    { id: 'commercial', label: 'Torre Corporativa / Alta Complexidade', icon: Buildings },
    { id: 'residential', label: 'Residencial High-End', icon: Buildings },
    { id: 'industrial', label: 'Galpão / Centro Logístico Industrial', icon: Factory },
    { id: 'infrastructure', label: 'Infraestrutura Pesada & Pontes', icon: Bridge },
  ];

  const structuralSystemsList = [
    { id: 'concrete', label: 'Concreto Armado / Protendido', desc: 'Solução clássica de alta inércia' },
    { id: 'steel', label: 'Estrutura 100% Metálica', desc: 'Máxima velocidade e grandes vãos' },
    { id: 'composite', label: 'Misto Aço-Concreto Otimizado', desc: 'Equilíbrio estrutural de alto desempenho' },
    { id: 'timber_hybrid', label: 'Híbrido Madeira Engenheirada (Mass Timber)', desc: 'Menor pegada de carbono do mercado' },
  ];

  const formatNumber = (num: number) => num.toLocaleString('pt-BR');

  return (
    <motion.section 
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
    >
      <div className="bg-white border border-slate-200 rounded-sm p-8 sm:p-12 shadow-xs">
        
        {/* Top Header */}
        <div className="pb-8 border-b border-slate-200 mb-12">
          <span className="text-[11px] font-condensed uppercase tracking-widest text-[#0284C7] font-bold block mb-2">
            Simulador Paramétrico de Estrutura
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
            Estime insumos, velocidade e pegada de carbono da sua obra
          </h2>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. Building Type */}
            <div>
              <label className="block text-xs font-condensed uppercase tracking-widest text-[#0F172A] font-bold mb-3">
                1. Tipologia da Estrutura
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {buildingTypesList.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setBuildingType(type.id as BuildingType)}
                      className={`px-4 py-3.5 rounded-sm text-xs font-condensed uppercase tracking-wider transition-all text-left flex flex-col justify-between h-20 border cursor-pointer ${
                        buildingType === type.id
                          ? 'bg-[#0F172A] text-white border-[#0F172A] font-bold shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:text-slate-900 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <Icon size={18} weight="bold" className={buildingType === type.id ? 'text-[#0284C7]' : 'text-slate-400'} />
                      <span>{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Area Slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-condensed uppercase tracking-widest text-[#0F172A] font-bold">
                  2. Área Construída Estimada
                </label>
                <div className="font-condensed text-lg font-bold text-[#0F172A] bg-slate-100 px-3.5 py-1 rounded-sm border border-slate-200">
                  {formatNumber(areaM2)} <span className="text-xs text-[#0284C7]">m²</span>
                </div>
              </div>

              <input
                type="range"
                min={2000}
                max={150000}
                step={1000}
                value={areaM2}
                onChange={(e) => setAreaM2(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-sm appearance-none cursor-pointer accent-[#0284C7] focus:outline-none"
              />

              <div className="flex justify-between text-[10px] font-condensed uppercase tracking-wider text-slate-500 mt-2 font-medium">
                <span>2.000 m² (Pequeno porte)</span>
                <span>50.000 m²</span>
                <span>150.000 m² (Megaestrutura)</span>
              </div>
            </div>

            {/* 3. Structural System Selection */}
            <div>
              <label className="block text-xs font-condensed uppercase tracking-widest text-[#0F172A] font-bold mb-3">
                3. Sistema Estrutural em Estudo
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {structuralSystemsList.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSystem(s.id as StructuralSystem)}
                    className={`px-4 py-3 rounded-sm text-xs font-condensed uppercase tracking-wider transition-all text-left border cursor-pointer ${
                      system === s.id
                        ? 'bg-[#0F172A] text-white border-[#0F172A] font-bold shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:text-slate-900 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-bold">{s.label}</div>
                    <div className={`text-[11px] font-body lowercase tracking-normal mt-1 ${system === s.id ? 'text-slate-300' : 'text-slate-500'}`}>
                      {s.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Outputs / Results Panel */}
          <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-sm p-7 relative overflow-hidden shadow-2xs">
            
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
              <span className="text-[11px] font-condensed uppercase tracking-widest text-[#0284C7] font-bold">
                Estimativa Paramétrica
              </span>
              <span className="text-[10px] font-condensed uppercase tracking-wider text-slate-600 bg-white px-2 py-0.5 rounded-sm border border-slate-200 font-medium">
                TOLERÂNCIA ± 5%
              </span>
            </div>

            {/* Primary KPI Results */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              
              <div className="bg-white p-4 rounded-sm border border-slate-200">
                <span className="text-[10px] font-condensed uppercase tracking-widest text-slate-400 block mb-1 font-semibold">
                  Aço Estrutural
                </span>
                <div className="font-heading text-2xl font-bold text-[#0F172A]">
                  {formatNumber(calculations.totalSteelTons)} <span className="text-xs font-condensed text-[#0284C7]">t</span>
                </div>
                <span className="text-[10px] font-condensed text-slate-600 block mt-1">
                  Taxa: {calculations.steelKgM2} kg/m²
                </span>
              </div>

              <div className="bg-white p-4 rounded-sm border border-slate-200">
                <span className="text-[10px] font-condensed uppercase tracking-widest text-slate-400 block mb-1 font-semibold">
                  Volume de Concreto
                </span>
                <div className="font-heading text-2xl font-bold text-[#0F172A]">
                  {formatNumber(calculations.totalConcreteM3)} <span className="text-xs font-condensed text-[#0284C7]">m³</span>
                </div>
                <span className="text-[10px] font-condensed text-slate-600 block mt-1">
                  Consumo: {calculations.concreteM3M2} m³/m²
                </span>
              </div>

              <div className="bg-white p-4 rounded-sm border border-slate-200">
                <span className="text-[10px] font-condensed uppercase tracking-widest text-slate-400 block mb-1 font-semibold">
                  Emissão Estimada CO₂
                </span>
                <div className="font-heading text-2xl font-bold text-[#0F172A]">
                  {formatNumber(calculations.totalCo2Tons)} <span className="text-xs font-condensed text-[#0284C7]">t CO₂e</span>
                </div>
                {calculations.carbonSavedTons > 0 && (
                  <span className="text-[10px] font-condensed text-emerald-700 block mt-1 font-bold">
                    -{formatNumber(calculations.carbonSavedTons)}t vs baseline
                  </span>
                )}
              </div>

              <div className="bg-white p-4 rounded-sm border border-slate-200">
                <span className="text-[10px] font-condensed uppercase tracking-widest text-slate-400 block mb-1 font-semibold">
                  Velocidade Construtiva
                </span>
                <div className="font-heading text-2xl font-bold text-[#0F172A]">
                  {calculations.speedGain > 0 ? `+${calculations.speedGain}%` : 'Baseline'}
                </div>
                {calculations.timeSavedMonths > 0 && (
                  <span className="text-[10px] font-condensed text-[#0284C7] block mt-1 font-bold flex items-center gap-1">
                    <ClockCounterClockwise size={12} weight="bold" />
                    ~{calculations.timeSavedMonths} meses economizados
                  </span>
                )}
              </div>

            </div>

            {/* Explanatory note */}
            <div className="flex items-start gap-2 text-[11px] font-body text-[#334155] mb-6 bg-white p-3 rounded-sm border border-slate-200">
              <Info size={16} className="text-[#0284C7] shrink-0 mt-0.5" />
              <span>
                Cálculos baseados em normas NBR 6118, NBR 8800 e banco histórico de 280+ megaestruturas auditadas pela StrucX.
              </span>
            </div>

            {/* Actions */}
            <div className="space-y-2.5">
              <Link
                to="/contato"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-sm bg-[#0F172A] hover:bg-[#0284C7] text-white font-condensed text-xs uppercase tracking-wider font-bold transition-all shadow-sm hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
              >
                <span>Solicitar Laudo Técnico com Esta Estimativa</span>
                <ArrowRight size={14} weight="bold" />
              </Link>

              <button
                onClick={() => window.print()}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-sm bg-white hover:bg-slate-100 text-[#0F172A] font-condensed text-xs uppercase tracking-wider font-semibold transition-all border border-slate-300 cursor-pointer"
              >
                <FilePdf size={16} weight="bold" />
                <span>Salvar Memória de Cálculo (PDF)</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </motion.section>
  );
}
