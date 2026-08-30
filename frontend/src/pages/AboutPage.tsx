import { 
  ShieldCheck, 
  Leaf, 
  Compass 
} from '@phosphor-icons/react';
import { CtaSection } from '../components/home/CtaSection';

const LEADERSHIP = [
  {
    name: "Dr. Marcelo Fagundes, D.Sc.",
    role: "Diretor Técnico & Sócio Fundador",
    crea: "CREA-SP 5061928",
    specialty: "Doutor em Estruturas de Concreto pela Poli-USP",
    bio: "Mais de 25 anos liderando o cálculo estrutural de edifícios acima de 40 pavimentos e pontes especiais na América Latina. Membro do comitê revisor da NBR 6118.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "M.Sc. Eduardo Vasconcelos",
    role: "Head de Estruturas Metálicas & FEA",
    crea: "CREA-RJ 2018442",
    specialty: "Mestre em Engenharia de Estruturas pela COPPE/UFRJ",
    bio: "Especialista em galpões de grande vão, estruturas espaciais e análise aerodinâmica em túnel de vento digital para edifícios esbeltos.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Engª. Camila Bittencourt",
    role: "Diretora de BIM & Integração 5D",
    crea: "CREA-SP 5092110",
    specialty: "Especialização em Virtual Design and Construction (VDC)",
    bio: "Pioneira na implementação de fluxos de trabalho OpenBIM LOD 400 no Brasil, coordenando mais de 2 milhões de metros quadrados de projetos integrados.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
  }
];

const TIMELINE = [
  { year: "2008", title: "Fundação da StrucX", desc: "Início como escritório boutique focado em estruturas de concreto protendido em São Paulo." },
  { year: "2014", title: "Expansão para Mega-Infraestruturas", desc: "Cálculo da primeira ponte estaiada com vão superior a 300 metros e grandes viadutos rodoviários." },
  { year: "2019", title: "Lançamento do StrucX FEA Cloud", desc: "Desenvolvimento do nosso motor proprietário de cálculo não-linear de elementos finitos." },
  { year: "2023", title: "Marco de 4 Milhões de m²", desc: "Certificação ISO 9001 e consolidação como parceiro de cálculo estrutural das maiores construtoras do país." }
];

export function AboutPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#0F172A] tracking-tight mb-4 leading-tight">
          Rigor estrutural guiado pela ciência e inovação
        </h1>
        <p className="font-body text-sm sm:text-base text-slate-600 leading-relaxed">
          Desde 2008, a StrucX atua como o alicerce silencioso de grandes obras de engenharia civil, transformando desafios arquitetônicos complexos em soluções estruturais racionais e seguras.
        </p>
      </div>

      {/* 3 Core Values Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-xs hover:border-[#0284C7] transition-all">
          <div className="w-12 h-12 rounded-sm bg-slate-50 border border-slate-200 flex items-center justify-center text-[#0284C7] mb-6">
            <ShieldCheck size={24} weight="fill" />
          </div>
          <h3 className="font-heading text-xl font-bold text-[#0F172A] mb-2">
            Segurança Intransigente
          </h3>
          <p className="font-body text-xs text-slate-600 leading-relaxed">
            Não adotamos atalhos no dimensionamento. Nossos coeficientes de segurança seguem com rigor absoluto as normas brasileiras e internacionais mais exigentes.
          </p>
        </div>

        <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-xs hover:border-[#0284C7] transition-all">
          <div className="w-12 h-12 rounded-sm bg-slate-50 border border-slate-200 flex items-center justify-center text-emerald-600 mb-6">
            <Leaf size={24} weight="fill" />
          </div>
          <h3 className="font-heading text-xl font-bold text-[#0F172A] mb-2">
            Eficiência de Recursos (ESG)
          </h3>
          <p className="font-body text-xs text-slate-600 leading-relaxed">
            A forma mais eficaz de descarbonizar a construção civil é usar menos material com melhor engenharia. Reduzimos o consumo de cimento e aço em cada pilar.
          </p>
        </div>

        <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-xs hover:border-[#0284C7] transition-all">
          <div className="w-12 h-12 rounded-sm bg-slate-50 border border-slate-200 flex items-center justify-center text-[#0284C7] mb-6">
            <Compass size={24} weight="fill" />
          </div>
          <h3 className="font-heading text-xl font-bold text-[#0F172A] mb-2">
            Engenharia Computacional
          </h3>
          <p className="font-body text-xs text-slate-600 leading-relaxed">
            Aliamos a experiência prática de canteiro aos mais avançados modelos de elementos finitos e algoritmos generativos de otimização estrutural.
          </p>
        </div>
      </div>

      {/* Leadership Team */}
      <div className="mb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-condensed uppercase tracking-widest text-[#0284C7] font-semibold block mb-2">
            Corpo Diretivo
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
            Liderança com sólida formação acadêmica e de campo
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LEADERSHIP.map((leader) => (
            <div
              key={leader.name}
              className="bg-white rounded-sm overflow-hidden border border-slate-200 flex flex-col justify-between hover:border-[#0284C7] transition-all shadow-xs group"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-14 h-14 rounded-sm object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="font-heading text-base font-bold text-[#0F172A] group-hover:text-[#0284C7] transition-colors">
                      {leader.name}
                    </h3>
                    <p className="text-xs font-condensed uppercase tracking-wider text-[#0284C7] font-bold">{leader.role}</p>
                    <span className="text-[10px] font-condensed text-slate-400 block">{leader.crea}</span>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-sm border border-slate-100 text-[11px] font-condensed text-slate-700 mb-3 font-semibold">
                  {leader.specialty}
                </div>

                <p className="font-body text-xs text-slate-600 leading-relaxed">
                  {leader.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-white p-8 sm:p-12 rounded-sm border border-slate-200 mb-20 shadow-xs">
        <div className="max-w-xl mb-10">
          <span className="text-[11px] font-condensed text-[#0284C7] uppercase font-bold tracking-widest">
            Trajetória & Marcos
          </span>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#0F172A] mt-1">
            Quase duas décadas calculando o progresso
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TIMELINE.map((item) => (
            <div key={item.year} className="bg-slate-50 p-5 rounded-sm border border-slate-200 space-y-2">
              <div className="text-2xl font-bold font-condensed text-[#0284C7]">{item.year}</div>
              <h4 className="font-heading text-xs font-bold text-[#0F172A]">{item.title}</h4>
              <p className="font-body text-[12px] text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <CtaSection />
    </div>
  );
}
