import { Link } from 'react-router-dom';
import { Warning, ArrowLeft } from '@phosphor-icons/react';

export function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-20">
      <div className="bg-white p-8 sm:p-12 rounded-sm border border-slate-200 max-w-lg w-full text-center space-y-6 shadow-xs">
        <div className="w-14 h-14 rounded-sm bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto text-[#0284C7]">
          <Warning size={30} weight="fill" />
        </div>

        <div>
          <span className="text-[10px] font-condensed uppercase tracking-widest text-[#0284C7] font-bold block mb-1">
            ERRO 404 · NÓ ESTRUTURAL NÃO ENCONTRADO
          </span>
          <h1 className="font-heading text-3xl font-bold text-[#0F172A]">
            Página Inexistente
          </h1>
          <p className="font-body text-xs text-slate-500 mt-2 leading-relaxed">
            As coordenadas solicitadas não correspondem a nenhuma disciplina, projeto ou documento ativo na infraestrutura StrucX.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-[#0F172A] hover:bg-[#0284C7] text-white font-condensed text-xs uppercase tracking-wider font-bold transition-all shadow-sm"
        >
          <ArrowLeft size={16} weight="bold" />
          <span>Retornar à Página Principal</span>
        </Link>
      </div>
    </div>
  );
}
