export interface Solution {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  tags: string[];
  deliverables: string[];
  metrics: { label: string; value: string }[];
  applications: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'Comercial' | 'Residencial' | 'Infraestrutura' | 'Industrial' | 'Retrofit';
  client: string;
  location: string;
  year: string;
  area: string;
  status: 'Concluído' | 'Em Execução' | 'Projetado';
  highlight: string;
  description: string;
  image: string;
  specs: {
    system: string;
    steelWeight: string;
    concreteVolume: string;
    maxSpan: string;
    co2Savings: string;
  };
  features: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  crea: string;
  specialty: string;
  bio: string;
  experience: string;
}

export const SOLUTIONS_DATA: Solution[] = [
  {
    id: "sol-1",
    slug: "calculo-estrutural-avancado",
    title: "Cálculo Estrutural Avançado",
    subtitle: "Concreto Armado, Protendido, Estruturas Metálicas e Mistas",
    shortDescription: "Dimensionamento de alta precisão com análise não-linear física e geométrica para megaestruturas e vãos arrojados.",
    fullDescription: "Desenvolvemos projetos executivos estruturais que combinam segurança matemática intransigente, otimização extrema de consumo de aço/concreto e facilidade de montagem no canteiro de obras. Nossos modelos utilizam análise de elementos finitos (FEA) de última geração para prever comportamentos dinâmicos, efeitos de vento e solicitações sísmicas.",
    iconName: "Buildings",
    tags: ["Concreto Protendido", "Aço Estrutural", "Análise Não-Linear", "Normas ABNT/Eurocode/AISC"],
    deliverables: [
      "Memoriais de cálculo analítico e computacional detalhados",
      "Plantas executivas de formas, armações e cortes em BIM",
      "Quantitativos automatizados de ferragens e insumos",
      "Especificações de materiais e procedimentos de desforma"
    ],
    metrics: [
      { label: "Economia média de aço", value: "14.8%" },
      { label: "Precisão dimensional", value: "±2mm" },
      { label: "Projetos calculados", value: "+450" }
    ],
    applications: ["Arranha-céus", "Shoppings & Centros Comerciais", "Edifícios Corporativos", "Complexos Hospitalares"]
  },
  {
    id: "sol-2",
    slug: "engenharia-bim-5d",
    title: "Modelagem & Coordenação BIM 5D",
    subtitle: "Integração 3D, Cronograma 4D e Orçamento 5D",
    shortDescription: "Gêmeos digitais precisos que eliminam 100% dos conflitos interdisciplinares antes do primeiro dia de obra.",
    fullDescription: "A engenharia moderna não tolera retrabalhos. Através da modelagem estrutural em LOD 400 (Level of Development), sincronizamos a geometria do esqueleto aos projetos hidrossanitários, elétricos e de climatização, atrelando cada elemento ao cronograma físico-financeiro de execução.",
    iconName: "Cube",
    tags: ["LOD 400", "Clash Detection", "Revit & Tekla", "Interoperabilidade IFC"],
    deliverables: [
      "Modelo paramétrico tridimensional unificado (IFC/RVT)",
      "Relatórios de detecção de interferências (Clash Detection)",
      "Simulação de fases construtivas (4D) e curva de desembolso (5D)",
      "Extração automatizada de listas de materiais para compras"
    ],
    metrics: [
      { label: "Redução de retrabalho", value: "98%" },
      { label: "Aderência ao prazo", value: "99.4%" },
      { label: "Conflitos mitigados", value: "12k+" }
    ],
    applications: ["Obras de grande porte", "Empreendimentos Fast-Track", "Incorporações Multiuso"]
  },
  {
    id: "sol-3",
    slug: "retrofit-reforco-estrutural",
    title: "Retrofit & Reforço Estrutural",
    subtitle: "Fibra de Carbono, Encamisamento e Macaqueamento Hidráulico",
    shortDescription: "Reabilitação e aumento de capacidade de carga de edificações existentes com técnicas não-destrutivas.",
    fullDescription: "Diagnóstico patológico aprofundado, ensaios esclerométricos, ultrassom e projetos de reforço sob medida para readequação de uso, sobrecargas adicionais de equipamentos pesados ou restauração de patrimônio histórico.",
    iconName: "Wrench",
    tags: ["CFRP (Fibra de Carbono)", "Perfil Metálico", "Injeção de Resinas", "Patologia das Estruturas"],
    deliverables: [
      "Laudo pericial com mapeamento termográfico e esclerometria",
      "Projeto executivo de reforço estrutural com cálculo de tensões residuais",
      "Plano de escoramento provisório e transferência de cargas",
      "ART técnica e acompanhamento in-loco da aplicação"
    ],
    metrics: [
      { label: "Aumento de capacidade", value: "até +180%" },
      { label: "Vida útil estendida", value: "+50 anos" },
      { label: "Estruturas recuperadas", value: "180+" }
    ],
    applications: ["Galpões com alteração de carga", "Prédios tombados", "Pontes e Viadutos antigos"]
  },
  {
    id: "sol-4",
    slug: "consultoria-geotecnica-fundacoes",
    title: "Geotecnia & Fundações Profundas",
    subtitle: "Estacas Hélice Contínua, Tubulões, Radier e Contenções",
    shortDescription: "Interação solo-estrutura precisa para garantir estabilidade máxima com a fundação mais racional para cada terreno.",
    fullDescription: "A interface entre o solo e a superestrutura é onde reside o maior risco de uma obra. Desenvolvemos análises acopladas considerando recalques diferenciais, empuxos hidrostáticos, ensaios CPTu/SPT e projetos de contenção em solo grampeado ou cortinas de estacas.",
    iconName: "ShieldCheck",
    tags: ["Interação Solo-Estrutura", "Análise de Recalques", "Cortinas Atirantadas", "Estacas de Grande Diâmetro"],
    deliverables: [
      "Dimensionamento geotécnico e estrutural das fundações",
      "Modelagem de cortinas de contenção com tirantes provisórios/definitivos",
      "Curvas de recalque estimadas e plano de instrumentação",
      "Diretrizes para provas de carga estáticas e dinâmicas (PDA)"
    ],
    metrics: [
      { label: "Segurança de fundação", value: "FS > 2.0" },
      { label: "Otimização de concreto", value: "18.5%" },
      { label: "Sondagens analisadas", value: "+3.200" }
    ],
    applications: ["Solos moles e litorâneos", "Escavações profundas urbanas", "Cargas de alta concentração"]
  },
  {
    id: "sol-5",
    slug: "monitoramento-iot-saude-estrutural",
    title: "Monitoramento IoT de Saúde Estrutural (SHM)",
    subtitle: "Sensores Ópticos, Acelerômetros e Telemetria Contínua",
    shortDescription: "Vigilância em tempo real de vibrações, deformações e tensões para manutenção preditiva de ativos críticos.",
    fullDescription: "Implementamos redes de sensores MEMS e fibra de Bragg em viadutos, silos e edifícios altos. Os dados são processados por nossa infraestrutura na nuvem com alertas automáticos de anomalias estruturais antes que microfissuras se tornem colapsos.",
    iconName: "ChartLineUp",
    tags: ["SHM (Structural Health Monitoring)", "Sensores Ópticos", "Machine Learning Preditivo", "Telemetria 24/7"],
    deliverables: [
      "Arquitetura de sensoriamento e telemetria dedicada",
      "Dashboard web em tempo real com níveis de alerta calibrados",
      "Relatórios periódicos de fadiga e ciclo de vida do ativo",
      "Integração com sistemas de alarme e evacuação de emergência"
    ],
    metrics: [
      { label: "Disponibilidade de telemetria", value: "99.99%" },
      { label: "Latência de alerta", value: "< 200ms" },
      { label: "Pontos monitorados", value: "8.500+" }
    ],
    applications: ["Pontes de grande vão", "Estádios e Arenas", "Barragens e Usinas", "Arranha-céus em zonas de vento"]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "proj-1",
    slug: "aurora-business-tower",
    title: "Torre Corporativa Aurora",
    category: "Comercial",
    client: "Cyrela & GTIS Partners",
    location: "São Paulo, SP",
    year: "2025",
    area: "84.000 m²",
    status: "Concluído",
    highlight: "Núcleo rígido em concreto fck 60 MPa com lajes nervuradas protendidas sem pilares internos.",
    description: "Edifício icônico de 42 pavimentos com balanço estrutural de 18 metros sobre a praça cívica. O projeto empregou amortecedor de massa sintonizado (TMD) no topo para garantir conforto acústico e biomecânico sob rajadas de vento de até 140 km/h.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    specs: {
      system: "Núcleo de Concreto + Lajes Protendidas",
      steelWeight: "3.420 toneladas",
      concreteVolume: "19.800 m³",
      maxSpan: "18.2 m (balanço)",
      co2Savings: "420 ton CO2 eq"
    },
    features: [
      "Certificação LEED Platinum alcançada no esqueleto estrutural",
      "Vãos livres contínuos permitindo flexibilidade total de layout",
      "Otimização de armadura com redução de 16% de bitolas pesadas"
    ]
  },
  {
    id: "proj-2",
    slug: "ponte-estaiada-transoceanica",
    title: "Ponte Estaiada do Delta",
    category: "Infraestrutura",
    client: "Consórcio Viário Nacional",
    location: "Santos, SP",
    year: "2024",
    area: "Extensão: 1.450 m",
    status: "Concluído",
    highlight: "Mastro único assimétrico em formato de diamante com 145 metros de altura e 48 pares de estais.",
    description: "Desafio de engenharia marítima em solo marinho compressível. Desenvolvemos fundações com estacas escavadas com camisa metálica perdida de 2,4m de diâmetro e sistema de monitoramento dinâmico contínuo.",
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=1200&auto=format&fit=crop",
    specs: {
      system: "Mastro Diamante em Concreto + Tabuleiro Misto Aço-Concreto",
      steelWeight: "8.900 toneladas",
      concreteVolume: "42.000 m³",
      maxSpan: "380 m (vão central navegável)",
      co2Savings: "1.100 ton CO2 eq"
    },
    features: [
      "Vão livre navegável de 380 metros sem pilares no canal",
      "Modelagem aerodinâmica em túnel de vento digital (CFD)",
      "Sistema autônomo de desumidificação dos cabos de aço"
    ]
  },
  {
    id: "proj-3",
    slug: "nexus-logistics-mega-hub",
    title: "Mega Hub Logístico Nexus 4.0",
    category: "Industrial",
    client: "GLP Logística",
    location: "Extrema, MG",
    year: "2024",
    area: "140.000 m²",
    status: "Concluído",
    highlight: "Piso industrial de altíssima planicidade (FF/FL 65) para tráfego de AGVs autônomos e robôs de estocagem.",
    description: "Estrutura pré-fabricada de concreto de montagem ultrarrápida (18.000 m²/mês) e cobertura metálica espacial com sheds para iluminação zenital natural.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    specs: {
      system: "Pré-moldado de Concreto + Treliça Espacial Metálica",
      steelWeight: "1.850 toneladas",
      concreteVolume: "28.500 m³",
      maxSpan: "36.0 m entre pilares",
      co2Savings: "680 ton CO2 eq"
    },
    features: [
      "Piso com capacidade de 10 ton/m² sem juntas serradas",
      "Pé-direito livre de 14 metros otimizado para verticalização",
      "Tempo total de montagem da estrutura reduzido em 35%"
    ]
  },
  {
    id: "proj-4",
    slug: "reserva-morumbi-sky-villas",
    title: "Reserva dos Lagos - Sky Villas",
    category: "Residencial",
    client: "JHSF Participações",
    location: "São Paulo, SP",
    year: "2025",
    area: "36.000 m²",
    status: "Em Execução",
    highlight: "Piscinas suspensas com borda infinita em balanço de 6 metros em todas as unidades.",
    description: "Torre residencial de altíssimo luxo onde cada apartamento conta com piscina privativa em balanço estrutural. O projeto exigiu análise de vibrações de fundo e isolamento hidrostático com juntas elastoméricas especiais.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    specs: {
      system: "Vigas-Parede de Concreto Armado Protendido",
      steelWeight: "1.620 toneladas",
      concreteVolume: "11.200 m³",
      maxSpan: "6.5 m (balanço de piscinas)",
      co2Savings: "290 ton CO2 eq"
    },
    features: [
      "Zero transmissão de ruídos de bombeamento entre lajes",
      "Paredes de contenção com ancoragem ativa em rocha sã",
      "Fachada com brises de concreto arquitetônico autolimpante"
    ]
  },
  {
    id: "proj-5",
    slug: "retrofit-teatro-nacional",
    title: "Retrofit & Ampliação do Teatro Centenário",
    category: "Retrofit",
    client: "Secretaria de Estado da Cultura",
    location: "Rio de Janeiro, RJ",
    year: "2023",
    area: "18.500 m²",
    status: "Concluído",
    highlight: "Reforço de pilares centenários com polímeros de fibra de carbono (CFRP) sem alteração volumétrica.",
    description: "Edificação histórica de 1912 adaptada para receber novas instalações de cenotecnia de 45 toneladas suspensas sobre a cúpula original. Criação de subsolo técnico sob fundações existentes com macaqueamento controlado.",
    image: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?q=80&w=1200&auto=format&fit=crop",
    specs: {
      system: "Estrutura Mista Original + Reforço em Fibra de Carbono e Micropilares",
      steelWeight: "480 toneladas",
      concreteVolume: "3.200 m³",
      maxSpan: "24.0 m (cúpula cênica)",
      co2Savings: "840 ton CO2 eq"
    },
    features: [
      "Preservação integral da arquitetura neoclássica tombada",
      "Monitoramento por inclinômetros a laser durante escavações",
      "Aumento de 220% na capacidade de carga da caixa de palco"
    ]
  },
  {
    id: "proj-6",
    slug: "complexo-metalurgico-votorantim",
    title: "Complexo Siderúrgico & Silos Verticais",
    category: "Industrial",
    client: "Gerdau S.A.",
    location: "Ouro Branco, MG",
    year: "2024",
    area: "92.000 m²",
    status: "Concluído",
    highlight: "Bateria de 8 silos cilíndricos em concreto protendido de 45 metros de altura para minério.",
    description: "Projeto para condições severas de fadiga térmica, abrasão mecânica e vibração induzida por britadores primários. Cálculo estrutural não-linear considerando fluxo de granéis e pressões dinâmicas de Janssen.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
    specs: {
      system: "Forma Deslizante em Concreto Protendido + Pórticos de Aço Pesado",
      steelWeight: "5.600 toneladas",
      concreteVolume: "34.000 m³",
      maxSpan: "Silos Ø 16m x 45m",
      co2Savings: "910 ton CO2 eq"
    },
    features: [
      "Execução com formas deslizantes contínuas 24/7 em 14 dias",
      "Concreto de alta durabilidade com sílica ativa e microssílica",
      "Resistência a solicitações sísmicas e choque de carga"
    ]
  }
];

export const STATS_DATA = [
  { label: "Metros Quadrados Calculados", value: "+4.2M", description: "Área total em megaestruturas entregues no Brasil e América Latina" },
  { label: "Aço Otimizado & Poupado", value: "38.5k", suffix: "ton", description: "Graças a algoritmos proprietários de análise de tensões" },
  { label: "Índice de Segurança Global", value: "100%", description: "Zero ocorrências patológicas graves em 18 anos de projetos" },
  { label: "Redução de Carbono Incorporado", value: "-22%", description: "Menor consumo de cimento por m² através de dosagens inteligentes" }
];

export const TECH_FEATURES = [
  {
    id: "tech-1",
    title: "StrucX FEA Cloud Engine",
    description: "Processamento paralelo em nuvem para matrizes de rigidez com mais de 50 milhões de graus de liberdade, reduzindo simulações de 18 horas para 8 minutos.",
    icon: "Cpu",
    codeSnippet: "Solver.RunNonLinear(geomMatrix, windPBE, tolerance: 1e-6)"
  },
  {
    id: "tech-2",
    title: "Algoritmos Generativos de Otimização",
    description: "Otimização topológica via inteligência computacional que elimina zonas de concreto sem tensão, aliviando o peso próprio da superestrutura.",
    icon: "GitBranch",
    codeSnippet: "TopologyOptimizer.MinimizeMass(constraints: Eurocode2)"
  },
  {
    id: "tech-3",
    title: "Gêmeo Digital com Sensores IoT",
    description: "Sincronização contínua do modelo matemático com acelerômetros e células de carga instalados na estrutura física para manutenção preditiva.",
    icon: "Radioactive",
    codeSnippet: "IoTStream.Subscribe('/sensors/deflection/pillar-04')"
  },
  {
    id: "tech-4",
    title: "Interoperabilidade BIM Nativa",
    description: "Conexão bidirecional sem perdas entre nossos motores de cálculo e as principais plataformas de projeto (Revit, Tekla Structures, ArchiCAD).",
    icon: "CirclesFour",
    codeSnippet: "IFC4_Parser.ExportFullLOD400(mesh, rebarSchedule)"
  }
];

export const TESTIMONIALS_DATA = [
  {
    quote: "A equipe da StrucX viabilizou nosso balanço de 18 metros que três outros escritórios diziam ser inviável economicamente. A precisão dos quantitativos na fase de fundação nos poupou mais de R$ 4 milhões.",
    author: "Eng. Marcos Albuquerque",
    role: "Diretor de Engenharia",
    company: "Cyrela Construtora",
    project: "Torre Corporativa Aurora"
  },
  {
    quote: "O nível de detalhamento BIM em LOD 400 da StrucX é cirúrgico. Zero conflitos entre a armação pesada e as tubulações hidráulicas em um hospital de 60 mil m².",
    author: "Arq. Beatriz Sampaio",
    role: "Head de Coordenação de Projetos",
    company: "HCor & Rede D'Or",
    project: "Complexo Hospitalar Vanguarda"
  },
  {
    quote: "No retrofit do Teatro Nacional, a análise de tensões residuais e a aplicação de fibra de carbono proposta pela StrucX salvou o cronograma da obra sem tocar nos afrescos centenários.",
    author: "Dr. Roberto Mendonça",
    role: "Consultor Técnico de Patrimônio",
    company: "Consórcio Restaura Brasil",
    project: "Teatro Centenário"
  }
];

export const TRUST_LOGOS = [
  { name: "Cyrela", slug: "cyrela" },
  { name: "Gerdau", slug: "gerdau" },
  { name: "GLP Logística", slug: "glp" },
  { name: "JHSF", slug: "jhsf" },
  { name: "Tishman Speyer", slug: "tishmanspeyer" },
  { name: "Andrade Gutierrez", slug: "andradegutierrez" }
];
