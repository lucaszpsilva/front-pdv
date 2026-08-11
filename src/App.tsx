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
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 h-12 px-4 text-gray-600 text-lg rounded-xl border border-gray-300 focus:border-emerald-500 outline-none transition"
              placeholder="Leitura de código de barras ou digitação manual..."
            />
            <button className="px-6 h-12 bg-emerald-500 hover:bg-emerald-600 rounded-xl font-bold text-white flex items-center justify-center gap-2 cursor-pointer transition">
              Adicionar
              <span className="px-2 py-0.5 text-xs font-normal rounded bg-white text-gray-500">
                Enter
              </span>
            </button>
          </div>

          {/* Área da Tabela de Itens (Ocupa todo o resto da altura disponível) */}
          <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-4 flex flex-col justify-center items-center text-gray-400">
            {/* O componente da Tabela ou estado "Nenhum item" entra aqui */}
            <p className="text-4xl">Nenhum item selecionado</p>
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
              <button className="px-8 py-2 h-10 hover:bg-emerald-600 hover:text-white rounded-xl border font-bold text-gray-500 flex items-center justify-center gap-2 cursor-pointer transition">
                Débito
              </button>
              <button className="px-8 py-2 h-10 hover:bg-emerald-600 hover:text-white rounded-xl border font-bold text-gray-500 flex items-center justify-center gap-2 cursor-pointer transition">
                Crédito
              </button>
              <button className="px-8 py-2 h-10 hover:bg-emerald-600 hover:text-white rounded-xl border font-bold text-gray-500 flex items-center justify-center gap-2 cursor-pointer transition">
                Pix
              </button>
              <button className="px-8 py-2 h-10 hover:bg-emerald-600 hover:text-white rounded-xl border font-bold text-gray-500 flex items-center justify-center gap-2 cursor-pointer transition">
                VA/VR
              </button>
            </div>
            <div className="flex flex-col gap-1 w-full max-w-xs">
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
