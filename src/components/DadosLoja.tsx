export const DadosLoja = () => {
  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800">Dados da Loja</h1>
      <p className="text-xs text-gray-400 mt-1">
        Informações exibidas nos cupons e relatórios.
      </p>
      <div className="px-5 w-2/4 h-63 mt-2 bg-white border-gray-200 border font-semibold rounded-lg shadow-2xl ">
        <h1 className="mt-2 text-gray-500 border-b text-center tracking-wide font-semibold text-sm">
          IDENTIFICAÇÃO:
        </h1>

        <div className="flex mt-4">
          <span className="text-gray-400">Nome da loja:</span>
        </div>
        <label>
          <input
            type="text"
            placeholder="Loja Central"
            className="w-full mt-1 h-6 pl-3 flex border rounded text-sm text-gray-400 border-gray-400 bg-blue-50 focus:outline-0 focus:ring-0"
          />
        </label>
        <div>
          <div className="w-full text-gray-400 mt-2 flex justify-baseline gap-6 ">
            <div>
              <span> CNPJ</span>
              <label>
                <input
                  type="text"
                  placeholder="99.999.999/0001-09"
                  className="w-full mt-1 h-6 pl-3 flex border rounded text-sm border-gray-400 bg-blue-50 focus:outline-0"
                />
              </label>
            </div>
            <div>
              <span>TELEFONE</span>
              <label>
                <input
                  type="text"
                  placeholder="(11) 99999-9999"
                  className=" mt-1 h-6 pl-3 flex flex-1 border rounded text-sm border-gray-400 bg-blue-50 focus:outline-0"
                />
              </label>
            </div>
          </div>
          <div className="flex mt-4 text-gray-400 font-semibold ">
            <span>EMAIL</span>
          </div>
          <label>
            <input
              type="text"
              placeholder="contato@lojacentral.com.br"
              className="w-full mt-1 h-6 pl-3 flex border rounded text-sm text-gray-400 border-gray-400 bg-blue-50 focus:outline-0"
            />
          </label>
        </div>
      </div>
      <div className="px-5 w-2/4 h-44 mt-2 bg-white border-gray-200 border font-semibold rounded-lg shadow-2xl">
        <h1 className="mt-2 text-gray-500 text-sm border-b text-center tracking-wide font-semibold">
          ENDEREÇO:
        </h1>

        <div className="flex mt-3">
          <span className="text-gray-400">Logradouro:</span>
        </div>
        <label>
          <input
            type="text"
            placeholder="Rua das flores, 123. "
            className="w-full mt-1 h-6 pl-3 flex border rounded text-sm text-gray-400 border-gray-400 bg-blue-50 focus:outline-0 focus:ring-0"
          />
        </label>
        <div>
          <div className="w-full text-gray-400 mt-2 flex justify-between gap-2">
            <div>
              <span> CIDADE</span>
              <label>
                <input
                  type="text"
                  placeholder="São Paulo"
                  className="w-full mt-1 h-6 pl-3 flex-1 border rounded text-sm border-gray-400 bg-blue-50 focus:outline-0"
                />
              </label>
            </div>
            <div>
              <span>ESTADO</span>
              <label>
                <input
                  type="text"
                  placeholder="SP"
                  className="w-20 mt-1 h-6 pl-3 flex border rounded text-sm border-gray-400 bg-blue-50 focus:outline-0"
                />
              </label>
            </div>
            <div>
              <span>CEP</span>
              <label>
                <input
                  type="text"
                  placeholder="99999-999"
                  className=" mt-1 h-6 pl-3 flex flex-1 border rounded text-sm border-gray-400 bg-blue-50 focus:outline-0"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-2/4 justify-end ">
        <button className="px-3 h-8 mt-3 border bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-transform duration-200 cursor-pointer">
          ✓ Salvar Alterações
        </button>
      </div>
    </div>
  );
};
