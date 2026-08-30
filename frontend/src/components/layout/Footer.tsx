import { Link } from 'react-router-dom';
import { 
  EnvelopeSimple, 
  LinkedinLogo, 
  GithubLogo, 
  Phone,
  ArrowUpRight
} from '@phosphor-icons/react';

export function Footer() {
  return (
    <footer className="bg-slate-50/80 backdrop-blur-xl border-t border-slate-200/80 relative z-20 overflow-hidden text-slate-600 shadow-2xs">
      {/* Top Accent Line */}
      <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-[#0284C7]/80 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          
          {/* Brand Col (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 cursor-pointer group">
              <div className="w-8 h-8 rounded-sm overflow-hidden shrink-0 transition-transform duration-200 group-hover:scale-105 shadow-2xs">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="100" height="100" rx="16" fill="#0F172A" />
                  <path d="M50 18 L82 78 L68 78 L50 44 L32 78 L18 78 Z" fill="#0284C7" />
                  <path d="M50 32 L68 72 L58 72 L50 56 L42 72 L32 72 Z" fill="#38BDF8" />
                  <polygon points="50,22 56,36 44,36" fill="#FFFFFF" />
                  <line x1="28" y1="62" x2="72" y2="62" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-[#0F172A] leading-none">
                STRUC<span className="text-[#0284C7]">X</span>
              </span>
            </Link>
            
            <p className="font-body text-xs text-slate-500 leading-relaxed max-w-sm">
              Engenharia de precisão para megaestruturas, infraestrutura pesada e geometrias complexas. Soluções estruturais racionais com modelagem não-linear e BIM 5D.
            </p>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3">
            <span className="font-heading text-xs font-bold uppercase tracking-wider text-[#0F172A] block mb-4">
              Serviços Estruturais
            </span>
            <ul className="space-y-2.5 text-xs font-condensed uppercase tracking-wider">
              <li>
                <Link to="/solucoes#calculo-estrutural-avancado" className="hover:text-[#0284C7] transition-colors cursor-pointer">
                  Torres & Supertall
                </Link>
              </li>
              <li>
                <Link to="/solucoes#consultoria-geotecnica-fundacoes" className="hover:text-[#0284C7] transition-colors cursor-pointer">
                  Pontes & Viadutos
                </Link>
              </li>
              <li>
                <Link to="/solucoes#retrofit-reforco-estrutural" className="hover:text-[#0284C7] transition-colors cursor-pointer">
                  Estruturas Industriais
                </Link>
              </li>
              <li>
                <Link to="/solucoes#engenharia-bim-5d" className="hover:text-[#0284C7] transition-colors cursor-pointer">
                  Engenharia BIM 5D
                </Link>
              </li>
              <li>
                <Link to="/solucoes#monitoramento-iot-saude-estrutural" className="hover:text-[#0284C7] transition-colors cursor-pointer">
                  Monitoramento SHM (IoT)
                </Link>
              </li>
            </ul>
          </div>

          {/* Institutional Links (2 cols) */}
          <div className="lg:col-span-2">
            <span className="font-heading text-xs font-bold uppercase tracking-wider text-[#0F172A] block mb-4">
              Institucional
            </span>
            <ul className="space-y-2.5 text-xs font-condensed uppercase tracking-wider">
              <li>
                <Link to="/sobre" className="hover:text-[#0284C7] transition-colors cursor-pointer">
                  Sobre a StrucX
                </Link>
              </li>
              <li>
                <Link to="/projetos" className="hover:text-[#0284C7] transition-colors cursor-pointer">
                  Portfólio de Obras
                </Link>
              </li>
              <li>
                <Link to="/tecnologia" className="hover:text-[#0284C7] transition-colors cursor-pointer">
                  Tecnologia & Softwares
                </Link>
              </li>
              <li>
                <Link to="/contato" className="hover:text-[#0284C7] transition-colors cursor-pointer">
                  Fale Conosco
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer Contact (3 cols) */}
          <div className="lg:col-span-3">
            <span className="font-heading text-xs font-bold uppercase tracking-wider text-[#0F172A] block mb-4">
              Contato do Desenvolvedor
            </span>
            <div className="space-y-2.5 text-xs font-body text-slate-600">
              <a
                href="mailto:onemurilo@gmail.com"
                className="flex items-center gap-2.5 text-slate-700 hover:text-[#0284C7] transition-colors cursor-pointer"
              >
                <EnvelopeSimple size={16} className="text-[#0284C7] shrink-0" />
                <span>onemurilo@gmail.com</span>
              </a>

              <a
                href="https://wa.me/5533999026628"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-700 hover:text-[#25D366] transition-colors cursor-pointer"
              >
                <Phone size={16} className="text-[#25D366] shrink-0" />
                <span>(33) 99902-6628</span>
              </a>

              <a
                href="https://www.linkedin.com/in/murilofsouzaa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-700 hover:text-[#0A66C2] transition-colors cursor-pointer"
              >
                <LinkedinLogo size={16} className="text-[#0A66C2] shrink-0" weight="bold" />
                <span>linkedin.com/in/murilofsouzaa</span>
                <ArrowUpRight size={12} className="text-slate-400" />
              </a>

              <a
                href="https://github.com/murilofsouzaa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <GithubLogo size={16} className="text-[#0F172A] shrink-0" weight="bold" />
                <span>github.com/murilofsouzaa</span>
                <ArrowUpRight size={12} className="text-slate-400" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} StrucX Engenharia Estrutural S/A.</span>
            <span>·</span>
            <span>Desenvolvido por Murilo Souza</span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://www.linkedin.com/in/murilofsouzaa" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-[#0A66C2] transition-colors cursor-pointer" 
              aria-label="LinkedIn"
            >
              <LinkedinLogo size={18} weight="bold" />
            </a>
            <a 
              href="https://github.com/murilofsouzaa" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-slate-900 transition-colors cursor-pointer" 
              aria-label="GitHub"
            >
              <GithubLogo size={18} weight="bold" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
