import "./App.css";
import { useState, useEffect } from "react";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { useNavigate } from "react-router-dom";

export const Index = () => {
  const [dataAtual, setDataAtual] = useState(new Date());

  const navigate = useNavigate();

  // ✅ Função para o Produtos (F2)
  const openProdutos = async () => {
    const existing = await WebviewWindow.getByLabel("produtos");
    if (existing) {
      existing.setFocus();
      return;
    }
    new WebviewWindow("produtos", {
      url: "index.html#produtos",
      title: "Produtos",
      maximized: true,
      center: true,
      resizable: true,
    });
  };

  // Relógio
  useEffect(() => {
    const timer = setInterval(() => setDataAtual(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatadorData = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  const dataBruta = formatadorData.format(dataAtual);
  const dataFormatada = dataBruta.charAt(0).toUpperCase() + dataBruta.slice(1);
  const horaFormatada = dataAtual.toLocaleTimeString("pt-BR");

  return (
    <main className="w-screen h-screen bg-gray-50 flex flex-col justify-between p-6 select-none overflow-hidden">
      {/* Header Superior */}
      <header className="h-12 flex items-center justify-between bg-white px-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center">
          <h1 className="font-extrabold tracking-tight text-gray-900 pr-6 border-r border-gray-200 text-lg">
            FRONT PDV
          </h1>
          <h2 className="ml-6 text-sm text-gray-400 font-medium">
            Menu Inicial
          </h2>
        </div>

        <div className="flex items-center gap-5 text-sm">
          <span className="text-gray-500 font-medium">{dataFormatada}</span>
          <span className="font-semibold text-gray-700">{horaFormatada}</span>
          <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-600 font-semibold text-xs">
              Sistema Online
            </span>
          </div>
        </div>
      </header>

      {/* Grid Central */}
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Botão Caixa */}
          <button
            onClick={() => navigate("/caixa")}
            className="group h-56 rounded-2xl bg-emerald-500 hover:bg-emerald-600 p-8 flex flex-col justify-between text-left shadow-lg shadow-emerald-500/15 hover:shadow-emerald-500/25 hover:-translate-y-1 transition-all duration-200 cursor-pointer border border-emerald-400/40"
          >
            <div className="flex items-center justify-between">
              <span className="p-3.5 bg-white/20 rounded-xl text-white backdrop-blur-sm group-hover:scale-105 transition-transform">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </span>
              <span className="text-xs font-bold tracking-wider text-emerald-800 bg-white/80 px-3 py-1 rounded-md shadow-xs">
                F1
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">Caixa</h2>
              <p className="text-emerald-100 text-sm font-medium">
                Abrir terminal de vendas e leitor de código
              </p>
            </div>
          </button>

          {/* Botão Produtos */}
          <button
            onClick={openProdutos}
            className="group h-56 rounded-2xl bg-white hover:bg-gray-50/80 border border-gray-200 hover:border-gray-300 p-8 flex flex-col justify-between text-left shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="p-3.5 bg-gray-100 rounded-xl text-gray-700 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </span>
              <span className="text-xs font-bold tracking-wider text-gray-500 bg-gray-100 px-3 py-1 rounded-md border border-gray-200">
                F2
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">
                Produtos
              </h2>
              <p className="text-gray-500 text-sm">
                Consultar catálogo, estoque e tabela de preços
              </p>
            </div>
          </button>
        </div>

        {/* Linha Inferior */}
        <div className="grid grid-cols-3 gap-6">
          <button
            onClick={() => navigate("/relatorios")}
            className="group h-36 rounded-2xl bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 p-5 flex flex-col justify-between text-left shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            <span className="p-2.5 bg-gray-100 rounded-lg w-fit text-gray-600 group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </span>
            <div>
              <h3 className="font-bold text-gray-800">Relatório</h3>
              <p className="text-xs text-gray-400">Fluxo diário e fechamento</p>
            </div>
          </button>

          <button
            onClick={() => navigate("/suporte")}
            className="group h-36 rounded-2xl bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 p-5 flex flex-col justify-between text-left shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            <span className="p-2.5 bg-gray-100 rounded-lg w-fit text-gray-600 group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </span>
            <div>
              <h3 className="font-bold text-gray-800">Suporte</h3>
              <p className="text-xs text-gray-400">Atendimento e chamados</p>
            </div>
          </button>

          {/* Botão Configurações com onClick correto */}
          <button
            onClick={() => navigate("/configuracoes")}
            className="group h-36 rounded-2xl bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 p-5 flex flex-col justify-between text-left shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            <span className="p-2.5 bg-gray-100 rounded-lg w-fit text-gray-600 group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </span>
            <div>
              <h3 className="font-bold text-gray-800">Configurações</h3>
              <p className="text-xs text-gray-400">
                Impressora, leitor e sistema
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-between text-xs text-gray-400 px-4">
        <div className="flex gap-4">
          <span>
            <kbd className="bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded text-[11px] font-semibold">
              F1
            </kbd>{" "}
            Caixa
          </span>
          <span>
            <kbd className="bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded text-[11px] font-semibold">
              F2
            </kbd>{" "}
            Produtos
          </span>
          <span>
            <kbd className="bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded text-[11px] font-semibold">
              Esc
            </kbd>{" "}
            Sair
          </span>
        </div>
        <span>v1.0.0</span>
      </footer>
    </main>
  );
};
