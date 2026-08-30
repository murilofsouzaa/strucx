import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  List, 
  X, 
  ArrowRight
} from '@phosphor-icons/react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 15);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Início', path: '/' },
    { label: 'Soluções', path: '/solucoes' },
    { label: 'Projetos', path: '/projetos' },
    { label: 'Tecnologia', path: '/tecnologia' },
    { label: 'Sobre Nós', path: '/sobre' },
    { label: 'Contato', path: '/contato' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/60 backdrop-blur-xl border-b border-white/50 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] py-3.5'
            : 'bg-white/35 backdrop-blur-lg border-b border-white/40 shadow-xs py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo with Native Crisp Vector SVG */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group focus:outline-none rounded-sm cursor-pointer"
          >
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
            <div className="flex flex-col">
              <span className="font-heading text-xl font-bold tracking-tight text-slate-900 leading-none">
                STRUC<span className="text-[#0284C7]">X</span>
              </span>
              <span className="font-condensed text-[9px] uppercase tracking-widest text-slate-600 font-bold leading-tight mt-0.5">
                Structural Systems
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-1.5 rounded-sm font-condensed text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    active
                      ? 'text-[#0284C7] bg-slate-100/80 backdrop-blur-xs font-bold border-b-2 border-[#0284C7] shadow-2xs'
                      : 'text-slate-900 hover:text-[#0284C7] hover:bg-slate-100/50 font-semibold'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA Header Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/contato"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#0F172A] hover:bg-[#0284C7] text-white font-condensed text-xs uppercase tracking-wider font-bold transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-[0.98] cursor-pointer"
            >
              <span>Solicitar Estudo</span>
              <ArrowRight size={13} weight="bold" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-sm text-slate-800 hover:text-[#0284C7] hover:bg-slate-100/80 transition-colors cursor-pointer"
            aria-label="Abrir menu de navegação"
          >
            {mobileMenuOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
          </button>

        </div>
      </header>

      {/* Mobile Glass Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[70px] z-40 bg-white/90 backdrop-blur-2xl md:hidden border-b border-slate-200/80 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-lg font-heading font-semibold py-2.5 px-3 rounded-sm transition-colors cursor-pointer ${
                      active 
                        ? 'text-[#0284C7] bg-sky-50 font-bold border-l-4 border-[#0284C7]' 
                        : 'text-slate-900 hover:text-[#0284C7]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-6 border-t border-slate-200 flex flex-col gap-4">
              <Link
                to="/contato"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-sm bg-[#0F172A] hover:bg-[#0284C7] text-white font-condensed text-xs uppercase tracking-wider font-bold transition-all shadow-sm cursor-pointer"
              >
                <span>Solicitar Estudo Estrutural</span>
                <ArrowRight size={14} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
