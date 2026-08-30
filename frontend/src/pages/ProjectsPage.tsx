import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS_DATA, type Project } from '../data/mockData';
import { 
  X,
  Leaf,
  ShieldCheck,
  FilmStrip,
  Image as ImageIcon
} from '@phosphor-icons/react';
import { CtaSection } from '../components/home/CtaSection';

export function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedClipIndex, setSelectedClipIndex] = useState<number>(0);
  const [mediaMode, setMediaMode] = useState<'video' | 'image'>('video');

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
    setSelectedClipIndex(0);
    setMediaMode(project.video ? 'video' : 'image');
  };

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#0F172A] tracking-tight mb-4 leading-tight">
          Grandes obras que moldam o horizonte urbano
        </h1>
        <p className="font-body text-sm sm:text-base text-slate-600 leading-relaxed">
          Mais de 4.2 milhões de metros quadrados calculados com excelência técnica, otimização de materiais e sustentabilidade.
        </p>
      </div>

      {/* Pristine Editorial Projects Grid (Sem filtros e sem badges invasivas) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-24">
        {PROJECTS_DATA.map((project) => (
          <div
            key={project.id}
            id={project.slug}
            onClick={() => handleOpenProject(project)}
            className="group cursor-pointer flex flex-col space-y-4"
          >
            {/* Pristine Large Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-slate-100 border border-slate-200 shadow-2xs">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
            </div>

            {/* Editorial Typography Below Image */}
            <div className="space-y-1">
              <h3 className="font-heading text-xl font-bold text-[#0F172A] tracking-tight group-hover:text-[#0284C7] transition-colors leading-snug">
                {project.title}
              </h3>
              <p className="font-condensed text-xs uppercase tracking-wider text-slate-500 font-medium">
                {project.location} · {project.year} · {project.category}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Clean Project Detail Modal with Video Clip Player */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-slate-200 rounded-sm max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 relative shadow-2xl">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-sm bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer z-20"
              aria-label="Fechar"
            >
              <X size={20} weight="bold" />
            </button>

            <div className="flex items-center gap-2 text-xs font-condensed uppercase tracking-wider text-[#0284C7] font-bold mb-2">
              <ShieldCheck size={16} weight="fill" />
              <span>MEMORIAL TÉCNICO EXECUTIVO</span>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#0F172A] mb-1">
              {selectedProject.title}
            </h2>
            <div className="text-xs font-condensed uppercase tracking-wider text-slate-500 mb-6">
              {selectedProject.client} · {selectedProject.location} · {selectedProject.year} · {selectedProject.area}
            </div>

            {/* Interactive Video / Photo Preview Container */}
            <div className="relative aspect-[16/9] rounded-sm overflow-hidden mb-4 border border-slate-200 bg-slate-900 shadow-inner">
              {mediaMode === 'video' && (selectedProject.videoClips || selectedProject.video) ? (
                <video
                  key={selectedProject.videoClips ? selectedProject.videoClips[selectedClipIndex]?.src : selectedProject.video}
                  autoPlay
                  controls
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source 
                    src={selectedProject.videoClips ? selectedProject.videoClips[selectedClipIndex]?.src : selectedProject.video} 
                    type="video/mp4" 
                  />
                  Seu navegador não suporta reprodução de vídeo.
                </video>
              ) : (
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Media Selector Tabs (Se houver vídeo) */}
            {selectedProject.videoClips && (
              <div className="mb-6 p-2 bg-slate-50 border border-slate-200 rounded-sm">
                <span className="text-[10px] font-condensed uppercase tracking-wider text-slate-400 font-bold block mb-2 px-1">
                  Selecione o Clipe de Simulação ou Foto:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.videoClips.map((clip, idx) => {
                    const isCurrent = mediaMode === 'video' && selectedClipIndex === idx;
                    return (
                      <button
                        key={clip.title}
                        type="button"
                        onClick={() => {
                          setSelectedClipIndex(idx);
                          setMediaMode('video');
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-condensed text-xs uppercase tracking-wider transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-[#0284C7] text-white font-bold shadow-xs'
                            : 'bg-white text-slate-700 border border-slate-200 hover:border-[#0284C7]'
                        }`}
                      >
                        <FilmStrip size={13} weight="bold" />
                        <span>{clip.title} ({clip.duration})</span>
                      </button>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => setMediaMode('image')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm font-condensed text-xs uppercase tracking-wider transition-all cursor-pointer ${
                      mediaMode === 'image'
                        ? 'bg-[#0F172A] text-white font-bold shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <ImageIcon size={13} weight="bold" />
                    <span>Fotografia</span>
                  </button>
                </div>
              </div>
            )}

            <p className="font-body text-sm text-slate-600 leading-relaxed mb-6">
              {selectedProject.description}
            </p>

            {/* Technical Specifications Table */}
            <h4 className="text-xs font-condensed uppercase tracking-widest text-slate-800 font-bold mb-3">
              Especificações Quantitativas & Materiais
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 font-condensed text-xs">
              <div className="p-3 bg-slate-50 rounded-sm border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase block font-semibold">Sistema</span>
                <span className="font-bold text-[#0F172A] text-xs">{selectedProject.specs.system}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-sm border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase block font-semibold">Aço CA-50 / Perfis</span>
                <span className="font-bold text-[#0F172A] text-xs">{selectedProject.specs.steelWeight}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-sm border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase block font-semibold">Volume Concreto</span>
                <span className="font-bold text-[#0F172A] text-xs">{selectedProject.specs.concreteVolume}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-sm border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase block font-semibold">Vão Máximo</span>
                <span className="font-bold text-[#0284C7] text-xs">{selectedProject.specs.maxSpan}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-sm border border-slate-200 col-span-2">
                <span className="text-[10px] text-emerald-600 uppercase flex items-center gap-1 font-semibold">
                  <Leaf size={12} weight="fill" />
                  <span>Redução de CO2 Equivalente</span>
                </span>
                <span className="font-bold text-emerald-700 text-xs">{selectedProject.specs.co2Savings}</span>
              </div>
            </div>

            {/* Key Engineering Features */}
            <h4 className="text-xs font-condensed uppercase tracking-widest text-slate-800 font-bold mb-3">
              Destaques de Engenharia & Inovações
            </h4>
            <ul className="space-y-2 mb-6">
              {selectedProject.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2 text-xs font-body text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0284C7] shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-body text-slate-500">
                Quer especificações similares para sua obra?
              </div>
              <Link
                to="/contato"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-6 rounded-sm bg-[#0F172A] hover:bg-[#0284C7] text-white font-condensed text-xs uppercase tracking-wider font-bold transition-all shadow-xs cursor-pointer"
              >
                <span>Solicitar Consulta Técnica</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <CtaSection />
    </div>
  );
}
