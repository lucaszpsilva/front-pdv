import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { MdSupportAgent } from "react-icons/md";

export const Suporte = () => {
  const navigate = useNavigate();

  return (
    <main className="w-screen h-screen bg-slate-50 flex flex-col select-none overflow-hidden">
      {/* Header Superior */}
      <header className="h-12 flex items-center justify-between bg-white px-6 border-b border-gray-200 shrink-0">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/")}
            className="border-r border-gray-200 pr-4 cursor-pointer text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            ← Início
          </button>
          <MdSupportAgent className="ml-3 bg-blue-50 w-8 h-6 rounded-lg" />
          <h2 className="ml-2 font-semibold text-gray-700">Suporte</h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-emerald-600 font-semibold text-xs">
            Atendimento disponível →
          </span>
          <span className="text-gray-400 text-xs font-medium">
            Seg-Sex, 8h-18h
          </span>
        </div>
      </header>

      {/* Container Centralizado */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-8 max-w-md w-full flex flex-col items-center text-center">
          {/* Ícone do WhatsApp com badge verde */}
          <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mb-4 text-3xl">
            <FontAwesomeIcon icon={faWhatsapp} />
          </div>

          <h1 className="text-xl font-bold text-gray-800">
            Precisa de suporte?
          </h1>

          <p className="mt-2 text-sm text-gray-400 font-medium leading-relaxed px-4">
            Nossa equipe está pronta para te ajudar. Clique abaixo e fale direto
            com a gente pelo WhatsApp.
          </p>

          {/* Botão de Ação Principal (WhatsApp) */}
          <a
            href="https://api.whatsapp.com/send?phone=11930228881&text=Ol%C3%A1,%20gostaria%20de%20suporte%20para%20o%20FRONT-PDV."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-6"
          >
            <button className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl font-bold text-white bg-emerald-500 hover:bg-emerald-600 active:scale-[0.99] transition shadow-lg shadow-emerald-500/20 cursor-pointer">
              <FontAwesomeIcon icon={faWhatsapp} className="text-lg" />
              <span>Falar no WhatsApp</span>
            </button>
          </a>

          {/* Divisor com texto */}
          <div className="flex items-center w-full my-6">
            <div className="flex-1 border-t border-gray-100"></div>
            <span className="px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              ou entre em contato por
            </span>
            <div className="flex-1 border-t border-gray-100"></div>
          </div>

          {/* Grid de Contatos Secundários */}
          <div className="grid grid-cols-2 gap-3 w-full">
            {/* E-mail */}
            <a
              href="mailto:suporte@fluxocaixa.com.br"
              className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-2xl transition cursor-pointer text-left group"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-blue-50 text-blue-500 group-hover:scale-105 transition-transform shrink-0">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  E-mail
                </span>
                <span className="text-xs font-semibold text-gray-700 truncate">
                  lucaszpsilva@gmail.com
                </span>
              </div>
            </a>

            {/* Telefone */}
            <a
              href="tel:+55 (11) 93022-8881"
              className="flex items-center gap-3 p-3 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-2xl transition cursor-pointer text-left group"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-purple-50 text-purple-500 group-hover:scale-105 transition-transform shrink-0">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  Telefone
                </span>
                <span className="text-xs font-semibold text-gray-700 truncate">
                  +55 (11)93022-8881
                </span>
              </div>
            </a>
          </div>

          {/* Horário de Atendimento */}
          <p className="mt-6 text-[11px] font-medium text-gray-400">
            Atendimento de segunda a sexta, das 8h às 18h
          </p>
        </div>
      </div>
    </main>
  );
};
