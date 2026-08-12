import { useState } from "react";

export const CaixaRapido = () => {
  interface testeProduto {
    id: number;
    name: string;
    barCode: number;
    qtd: number;
    unid: number;
    total: number;
  }

  const testeProdutos: testeProduto[] = [
    {
      id: 1,
      name: "produtoTeste",
      barCode: 123,
      qtd: 1,
      unid: 11.4,
      total: 11.4,
    },
    {
      id: 2,
      name: "testeProduto",
      barCode: 1234,
      qtd: 1,
      unid: 7.8,
      total: 7.8,
    },
  ];

  const [produtos, setProdutos] = useState(testeProdutos);

  const handleDeletarProduto = (idParaDeletar: number) => {
    setProdutos((produtosAtuais) =>
      produtosAtuais.filter((item) => item.id !== idParaDeletar),
    );
  };

  return (
    <div className="flex-1 bg-white border border-gray-200 rounded-2xl flex flex-col justify-between overflow-hidden shadow-sm">
      <div className="bg-slate-50 border-b border-gray-200 px-6 py-3 grid grid-cols-16 gap-2 text-xs font-semibold text-slate-400 tracking-wider uppercase">
        <div className="col-span-1">#</div>
        <div className="col-span-6">Produto / Código</div>
        <div className="col-span-2 text-center">Qtd</div>
        <div className="col-span-3 text-right">Unit.</div>
        <div className="col-span-3 text-right">Total</div>
        <div className="col-span-1 text-right">Ações</div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {testeProdutos.length === 0 ? (
          <div className="h-full flex flex-col justify-center items-center text-center p-6">
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
            <p className="text-slate-500 font-medium text-base">Nenhum item</p>
            <p className="text-slate-400 text-sm mt-1">
              Escaneie ou digite um código de barras
            </p>
          </div>
        ) : (
          produtos.map((item) => (
            <div
              key={item.id}
              className="px-6 py-3 grid grid-cols-16 gap-2 items-center text-sm border-b border-gray-100 hover:bg-slate-50 transition"
            >
              <div className="col-span-1 font-semibold text-slate-500">
                {item.id}
              </div>
              <div className="col-span-6 flex flex-col">
                <span className="font-medium text-slate-800">{item.name}</span>
                <span className="text-xs text-slate-400">{item.barCode}</span>
              </div>
              <div className="col-span-2 text-center text-slate-600">
                {item.qtd}
              </div>
              <div className="col-span-3 text-right text-slate-600">
                R$ {item.unid.toFixed(2)}
              </div>
              <div className="col-span-3 text-right font-semibold text-slate-800">
                R$ {item.total.toFixed(2)}
              </div>
              <div className="col-span-1 flex justify-end">
                <button
                  onClick={() => handleDeletarProduto(item.id)}
                  className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition cursor-pointer"
                  title="Remover item"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

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
          <span className="font-mono text-slate-500">7891000315507</span> ·{" "}
          <span className="font-mono text-slate-500">7891910000197</span>
        </div>
      </div>
    </div>
  );
};
