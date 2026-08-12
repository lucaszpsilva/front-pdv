export const ResumoVenda = () => {
  return (
    <aside className="col-span-4 lg:col-span-3 bg-white border border-gray-200 rounded-2xl p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-4">
          Resumo da Venda
        </h3>
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
          <span className=" text-xl font-semibold text-gray-900">R$ 0,00</span>
        </div>
        <div className="flex justify-between items-center flex-wrap mt-3 ">
          <h3 className="text-xl m-auto font-bold text-gray-400 tracking-wider uppercase mb-4">
            Pagamento
          </h3>
        </div>
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
          <label className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
            Valor Recebido
          </label>

          <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition">
            <span className="text-slate-400 font-medium select-none">R$</span>

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
  );
};
