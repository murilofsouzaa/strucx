import { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  PaperPlaneTilt, 
  EnvelopeSimple, 
  LinkedinLogo, 
  GithubLogo, 
  CheckCircle,
  ArrowRight,
  ChatCircleDots,
  Clock
} from '@phosphor-icons/react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0284C7', '#0F172A', '#25D366']
      });
    } catch {
      // Ignore if canvas-confetti is not loaded
    }
  };

  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-sky-50 border border-sky-200 text-xs font-condensed uppercase tracking-wider text-[#0284C7] mb-4 font-semibold">
          <ChatCircleDots size={14} weight="bold" />
          <span>Contato & Novos Projetos</span>
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#0F172A] tracking-tight mb-4 leading-tight">
          Vamos construir algo extraordinário juntos.
        </h1>
        <p className="font-body text-sm sm:text-base text-slate-600 leading-relaxed">
          Tem uma ideia de projeto, precisa de uma consultoria ou quer desenvolver uma experiência web de alto impacto e performance? Envie uma mensagem ou inicie uma conversa direta.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Direct Connection & Socials (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* WhatsApp Direct Card */}
          <div className="bg-white p-6 sm:p-7 rounded-sm border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-heading text-lg font-bold text-[#0F172A]">
              Conversa Imediata
            </h3>
            <p className="font-body text-xs text-slate-600 leading-relaxed">
              Prefere um contato mais ágil e direto para discutir ideias e prazos? Fale diretamente pelo WhatsApp.
            </p>

            <a
              href="https://wa.me/5533999026628?text=Ol%C3%A1!%20Gostaria%20de%20conversar%20sobre%20um%20projeto%20web."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-sm bg-[#25D366] hover:bg-[#20bd5a] text-white font-condensed text-xs uppercase tracking-wider font-bold transition-all shadow-md shadow-[#25D366]/20 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
            >
              <img src="/icons/whatsapp.svg" alt="WhatsApp" className="w-5 h-5 object-contain" />
              <span>Chamar no WhatsApp (33) 99902-6628</span>
              <ArrowRight size={14} weight="bold" />
            </a>
          </div>

          {/* Social Links & Direct Channels */}
          <div className="bg-white p-6 sm:p-7 rounded-sm border border-slate-200 shadow-xs space-y-4">
            <h3 className="font-heading text-lg font-bold text-[#0F172A]">
              Conexões & Redes
            </h3>

            <div className="space-y-2.5 text-xs font-body">
              <a
                href="https://www.linkedin.com/in/murilofsouzaa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-slate-50 hover:bg-sky-50 rounded-sm border border-slate-200 hover:border-[#0284C7] transition-all group cursor-pointer text-slate-700 hover:text-[#0284C7]"
              >
                <div className="flex items-center gap-3">
                  <LinkedinLogo size={20} weight="bold" className="text-[#0A66C2]" />
                  <span className="font-semibold font-condensed uppercase tracking-wider">LinkedIn / murilofsouzaa</span>
                </div>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://github.com/murilofsouzaa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-sm border border-slate-200 hover:border-slate-400 transition-all group cursor-pointer text-slate-700 hover:text-slate-900"
              >
                <div className="flex items-center gap-3">
                  <GithubLogo size={20} weight="bold" className="text-[#0F172A]" />
                  <span className="font-semibold font-condensed uppercase tracking-wider">GitHub / murilofsouzaa</span>
                </div>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="mailto:onemurilo@gmail.com"
                className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-sm border border-slate-200 transition-all text-slate-600 hover:text-[#0284C7] cursor-pointer"
              >
                <EnvelopeSimple size={20} className="text-[#0284C7] shrink-0" />
                <div>
                  <span className="font-condensed uppercase tracking-wider block text-[10px] text-slate-400 font-bold">Email Direto</span>
                  <span className="font-semibold text-slate-800">onemurilo@gmail.com</span>
                </div>
              </a>
            </div>

            <div className="pt-2 flex items-center gap-2 text-[11px] font-condensed uppercase tracking-wider text-slate-500 font-semibold">
              <Clock size={15} className="text-emerald-600" />
              <span>Resposta em até 24 horas úteis</span>
            </div>
          </div>

        </div>

        {/* Right Column: Minimalist Direct Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-10 rounded-sm border border-slate-200 shadow-xs">
            
            {submitted ? (
              <div className="py-12 text-center space-y-6">
                <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle size={32} weight="fill" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-heading text-2xl font-bold text-[#0F172A]">
                    Mensagem Enviada com Sucesso!
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Obrigado pelo contato. Responderei sua mensagem no e-mail informado o mais breve possível.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-sm bg-slate-100 text-slate-800 hover:bg-slate-200 font-condensed text-xs uppercase tracking-wider font-bold border border-slate-200 cursor-pointer"
                >
                  Enviar Outra Mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="pb-4 border-b border-slate-200">
                  <h3 className="font-heading text-xl font-bold text-[#0F172A]">
                    Envie uma Mensagem
                  </h3>
                  <p className="text-xs text-slate-500 font-body mt-1">
                    Preencha os campos abaixo com o resumo da sua solicitação.
                  </p>
                </div>

                {/* Name */}
                <div>
                  <label className="text-xs font-condensed uppercase tracking-wider text-slate-700 block mb-1 font-bold">
                    Seu Nome *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Como você prefere ser chamado?"
                    className="w-full bg-white border border-slate-300 rounded-sm px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0284C7]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-condensed uppercase tracking-wider text-slate-700 block mb-1 font-bold">
                    Seu E-mail *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seu.email@empresa.com"
                    className="w-full bg-white border border-slate-300 rounded-sm px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0284C7]"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs font-condensed uppercase tracking-wider text-slate-700 block mb-1 font-bold">
                    Mensagem / Sobre o Projeto *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Conte um pouco sobre sua ideia, os objetivos do projeto, funcionalidades desejadas ou dúvidas..."
                    className="w-full bg-white border border-slate-300 rounded-sm p-3.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0284C7]"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-sm bg-[#0F172A] hover:bg-[#0284C7] text-white font-condensed text-xs uppercase tracking-wider font-bold transition-all shadow-sm hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
                >
                  <PaperPlaneTilt size={16} weight="bold" />
                  <span>Enviar Mensagem</span>
                </button>
              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
