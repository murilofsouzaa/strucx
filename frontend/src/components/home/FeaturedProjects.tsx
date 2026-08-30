import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PROJECTS_DATA } from '../../data/mockData';
import { 
  ArrowUpRight, 
  MapPin, 
  Ruler, 
  Stack, 
  ArrowRight 
} from '@phosphor-icons/react';

export function FeaturedProjects() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Todos os Projetos' },
    { id: 'Comercial', label: 'Torres Altas' },
    { id: 'Infraestrutura', label: 'Infraestrutura' },
    { id: 'Industrial', label: 'Indústria' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeFilter);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
        <div>
          <span className="text-[11px] font-condensed uppercase tracking-widest text-[#0284C7] font-bold block mb-2">
            Portfólio de Engenharia
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight leading-tight">
            Obras de alta complexidade calculadas com rigor absoluto
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-sm border border-slate-200">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-3.5 py-1.5 rounded-sm font-condensed text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeFilter === cat.id
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'text-slate-700 hover:text-[#0F172A] hover:bg-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.slice(0, 6).map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="bg-white border border-slate-200 rounded-sm overflow-hidden flex flex-col justify-between hover:border-[#0284C7] transition-all shadow-xs group cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-sm bg-white/95 backdrop-blur-md text-[10px] font-condensed uppercase tracking-wider font-bold text-[#0F172A] shadow-xs">
                  {project.category}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white font-condensed uppercase tracking-wider">
                <span className="flex items-center gap-1 bg-slate-900/80 px-2 py-0.5 rounded-sm backdrop-blur-xs">
                  <MapPin size={13} className="text-[#0284C7]" />
                  <span>{project.location}</span>
                </span>
                <span className="flex items-center gap-1 bg-slate-900/80 px-2 py-0.5 rounded-sm backdrop-blur-xs font-bold text-sky-300">
                  {project.year}
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-heading text-xl font-bold text-[#0F172A] mb-1 group-hover:text-[#0284C7] transition-colors">
                  {project.title}
                </h3>
                <p className="font-body text-xs text-[#334155] mb-4 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>

                {/* Specs Box */}
                <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-sm border border-slate-100 mb-5 font-condensed">
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-slate-400 block font-semibold">Área</span>
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      <Ruler size={13} className="text-slate-400" />
                      {project.area}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest text-slate-400 block font-semibold">Sistema</span>
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1 truncate">
                      <Stack size={13} className="text-slate-400" />
                      {project.specs.system}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[9px] uppercase tracking-widest text-slate-400 block font-semibold">Vão Máximo</span>
                    <span className="text-xs font-bold text-[#0284C7]">{project.specs.maxSpan}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-condensed text-slate-600 font-semibold">
                  Cliente: <strong className="text-slate-900">{project.client}</strong>
                </span>
                <Link
                  to={`/projetos#${project.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-condensed uppercase tracking-wider font-bold text-[#0284C7] hover:text-[#0F172A] transition-colors cursor-pointer"
                >
                  <span>Ficha Técnica</span>
                  <ArrowUpRight size={13} weight="bold" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-14 text-center">
        <Link
          to="/projetos"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-sm bg-slate-100 hover:bg-[#0F172A] text-[#0F172A] hover:text-white font-condensed text-xs uppercase tracking-wider font-bold transition-all border border-slate-300 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
        >
          <span>Ver Todos os Projetos Estruturais</span>
          <ArrowRight size={14} weight="bold" />
        </Link>
      </div>
    </motion.section>
  );
}
