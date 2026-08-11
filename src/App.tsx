import { useState, useEffect } from "react";
import "./App.css";

export const App = () => {
  const [dataAtual, setDataAtual] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDataAtual(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatadorData = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long", // 'long' mostra o nome completo do dia
    day: "2-digit", // '2-digit' garante que o dia 4 fique '04'
    month: "long",
  });

  const dataBruta = formatadorData.format(dataAtual);
  const dataFormatada = dataBruta.charAt(0).toUpperCase() + dataBruta.slice(1);
  const horaFormatada = dataAtual.toLocaleTimeString("pt-BR");

  const [barCode, setBarcode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!barCode.trim()) return;
    console.log("Código lido pelo Leitor: ", barCode);
    setBarcode("");
  };

  return (
    <main className="bg-gray-50 w-screen h-screen flex flex-col overflow-hidden">
      {/* TOPSIDE (Header fixo no topo) */}
      <header className="h-12 flex border-b border-gray-300 bg-white items-center px-4 shrink-0">
        <div className="flex items-center">
          <h1 className="font-bold pr-6 border-r border-gray-300">FRONT PDV</h1>
          <h2 className="ml-6 text-gray-500">
            Venda <span className="text-gray-900">#0000</span>
          </h2>
        </div>
        <div className="flex items-center ml-auto">
          <span className="mr-5 text-gray-500">{dataFormatada}</span>
          <span className="mr-5 text-sm">{horaFormatada}</span>
          <div className="rounded-full p-1 bg-emerald-400 mr-1.5"></div>
          <span className="text-emerald-500 font-medium">Caixa aberto</span>
        </div>
      </header>

      {/* CORPO PRINCIPAL (Grid de 2 colunas: Esquerda e Direita) */}
      <div className="flex-1 grid grid-cols-12 gap-4 p-4 overflow-hidden">
        {/* COLUNA DA ESQUERDA (Tabela de Produtos e Busca) - Ocupa 8 ou 9 colunas de 12 */}
        <section className="col-span-8 lg:col-span-9 flex flex-col h-full gap-4">
          {/* Input + Botão */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={barCode}
              onChange={(e) => setBarcode(e.target.value)}
              className="flex-1 h-12 px-4 text-gray-600 text-lg rounded-xl border border-gray-300 focus:border-emerald-500 outline-none transition"
              placeholder="Leitura de código de barras ou digitação manual..."
              autoFocus
            />
            <button
              type="submit"
              className="px-6 h-12 bg-emerald-500 hover:bg-emerald-600 rounded-xl font-bold text-white flex items-center justify-center gap-2 cursor-pointer transition"
            >
              Adicionar
              <span className="px-2 py-0.5 text-xs font-normal rounded bg-white text-gray-500">
                Enter
              </span>
            </button>
          </form>
          {/* Área da Tabela de Itens (Ocupa todo o resto da altura disponível) */}
          {/* Área da Tabela de Itens */}
          <div className="flex-1 bg-white border border-gray-200 rounded-2xl flex flex-col justify-between overflow-hidden shadow-sm">
            {/* Cabeçalho da Tabela */}
            <div className="bg-slate-50 border-b border-gray-200 px-6 py-3 grid grid-cols-12 text-xs font-semibold text-slate-400 tracking-wider uppercase">
              <div className="col-span-1">#</div>
              <div className="col-span-5">Produto / Código</div>
              <div className="col-span-2 text-center">Qtd</div>
              <div className="col-span-2 text-right">Unit.</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {/* Corpo da Tabela (Estado Vazio ou Lista de Produtos) */}
            <div className="flex-1 flex flex-col justify-center items-center text-center p-6">
              {/* Ícone de caixa vazia */}
              <div className="w-12 h-12 mb-3 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 border border-dashed border-slate-300">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>

              <p className="text-slate-500 font-medium text-base">
                Nenhum item
              </p>
              <p className="text-slate-400 text-sm mt-1">
                Escaneie ou digite um código de barras
              </p>
            </div>

            {/* Rodapé da Tabela (Atalhos e Códigos de Teste) */}
            <div className="px-6 py-3 border-t border-gray-100 flex justify-between items-center text-xs text-slate-400 bg-slate-50/50">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 bg-slate-200 text-slate-600 font-medium rounded border border-slate-300 text-[10px]">
                    F2
                  </span>
                  <span>Nova venda</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 bg-slate-200 text-slate-600 font-medium rounded border border-slate-300 text-[10px]">
                    F5
                  </span>
                  <span>Finalizar</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 bg-slate-200 text-slate-600 font-medium rounded border border-slate-300 text-[10px]">
                    Esc
                  </span>
                  <span>Cancelar</span>
                </div>
              </div>

              <div className="text-slate-400">
                Códigos de teste:{" "}
                <span className="font-mono text-slate-500">7891000315507</span>{" "}
                ·{" "}
                <span className="font-mono text-slate-500">7891910000197</span>
              </div>
            </div>
          </div>
        </section>

        {/* COLUNA DA DIREITA (Menu de Pagamento e Totais) - Ocupa 4 ou 3 colunas de 12 */}
        <aside className="col-span-4 lg:col-span-3 bg-white border border-gray-200 rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-4">
              Resumo da Venda
            </h3>
            {/* Subtotal, Desconto e Total  */}
            <div className="flex justify-between items-center w-full text-gray-600 mb-2">
              <span>Subtotal</span>
              <span className="font-semibold text-gray-900">R$ 0,00</span>
            </div>
            <div className="flex justify-between items-center w-full text-gray-600 mb-2 border-b border-b-gray-400">
              <span>Desconto</span>
              <span className="font-semibold text-gray-900">R$ 0,00</span>
            </div>

            <div className="flex justify-between items-center w-full text-gray-600 mt-4">
              <span className="text-xl">Total</span>
              <span className=" text-xl font-semibold text-gray-900">
                R$ 0,00
              </span>
            </div>
            <div className="flex justify-between items-center flex-wrap mt-3 ">
              <h3 className="text-xl m-auto font-bold text-gray-400 tracking-wider uppercase mb-4">
                Pagamento
              </h3>
            </div>
            {/* Botões Dinheiro, Débito, Pix e botão Finalizar */}
            <div className="flex m-auto justify-center content-start max-w-full gap-x-4 gap-y-3 flex-wrap">
              <button className="px-8 py-2 h-10 bg-emerald-500 hover:bg-emerald-600 rounded-xl font-bold text-white flex items-center justify-center gap-2 cursor-pointer transition">
                Dinheiro
              </button>
              <button className="px-8 py-2 h-10 hover:border-emerald-600 hover:text-emerald-600 rounded-xl border font-bold text-gray-500 flex items-center justify-center gap-2 cursor-pointer transition">
                Débito
              </button>
              <button className="px-8 py-2 h-10 hover:border-emerald-600 hover:text-emerald-600 rounded-xl border font-bold text-gray-500 flex items-center justify-center gap-2 cursor-pointer transition">
                Crédito
              </button>
              <button className="px-8 py-2 h-10 hover:border-emerald-600 hover:text-emerald-600 rounded-xl border font-bold text-gray-500 flex items-center justify-center gap-2 cursor-pointer transition">
                Pix
              </button>
              <button className="px-8 py-2 h-10 hover:border-emerald-600 hover:text-emerald-600 rounded-xl border font-bold text-gray-500 flex items-center justify-center gap-2 cursor-pointer transition">
                VA/VR
              </button>
            </div>
            <div className="flex flex-col mt-4 gap-1 w-full max-w-xs">
              {/* Label superior */}
              <label className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
                Valor Recebido
              </label>

              {/* Wrapper que simula o campo de entrada */}
              <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition">
                {/* Prefixo R$ fixo e com cor própria */}
                <span className="text-slate-400 font-medium select-none">
                  R$
                </span>

                {/* Input alinhado à direita */}
                <input
                  type="text"
                  placeholder="0,00"
                  className="w-full text-right bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-400 font-medium"
                />
              </div>
            </div>
            <div>
              <button className="px-6 h-12 mt-4 m-auto bg-emerald-500 hover:bg-emerald-600 rounded-xl font-bold text-white flex items-center justify-center gap-2 cursor-pointer transition">
                Finalizar Venda
                <span className="px-2 py-0.5 text-xs font-normal rounded bg-white text-gray-500">
                  F5
                </span>
              </button>
              <button className="mt-4 m-auto text-red-500 flex items-center justify-center gap-2 cursor-pointer transition">
                Cancelar Venda
                <span className="px-2 py-0.5 text-xs font-normal rounded bg-gray-100 text-gray-500">
                  ESC
                </span>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};
