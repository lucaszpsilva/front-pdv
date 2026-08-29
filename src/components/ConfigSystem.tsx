import { MdBackup, MdOutlineSystemUpdateAlt } from "react-icons/md";

export const ConfigSystem = () => {
  return (
    <div>
      <div>
        <h1 className="text-xl font-bold text-gray-800">Sistema</h1>
        <p className="text-xs text-gray-400 mt-1">
          Versão, backup e configurações gerais.
        </p>
      </div>
      <div className="px-5 w-2/4 h-40 mt-2 bg-white border-gray-200 border font-semibold rounded-lg shadow-2xl text-gray-400 ">
        <h1 className="mt-1 font-semibold text-center text-sm text-gray-500 border-b mb-4">
          APARÊNCIA E IDIOMA
        </h1>
        <span>Tema</span>
        <div className="flex gap-3 w-full">
          <button className="px-3 h-8 w-full border bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-transform duration-200 cursor-pointer">
            ☼ Claro
          </button>{" "}
          <button className="px-3 h-8 w-full border text-gray-400 rounded-lg hover:border-gray-500 hover:text-gray-500 transition-transform duration-200 cursor-pointer">
            ☽ Escuro
          </button>
        </div>
        <div className="mt-6 flex text-center justify-center">
          <label htmlFor="idioma">SELECIONE O IDIOMA →</label>
          <select
            name="idioma"
            className=" text-gray-500 ml-2 border w-40 rounded-lg bg-blue-50"
          >
            <option value="pt-br">Português</option>
            <option value="english">Inglês</option>
          </select>
        </div>
      </div>
      <div className="px-5 w-2/4 h-50 mt-2 bg-white border-gray-200 border font-semibold rounded-lg shadow-2xl text-gray-400 ">
        <h1 className="mt-1 font-semibold text-center text-sm text-gray-500 border-b mb-4">
          DADOS E MANUTENÇÃO
        </h1>

        <div className="flex w-full mb-2">
          <div>
            <span className="text-black">Backup automático diário</span>
            <p className="text-xs">
              Salva dados automaticamente toda meia-noite
            </p>
          </div>
          <div className="flex items-center ml-auto">
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>
        </div>
        <div className="flex w-full">
          <div>
            <span className="text-black">Atualizações automáticas</span>
            <p className="text-xs">Instala novas versões em segundo-plano</p>
          </div>
          <div className="flex items-center ml-auto">
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>
        </div>
        <div className="flex gap-3 justify-center mt-4">
          {/* Botão Fazer Backup */}
          <button className="flex-1 flex items-center justify-center gap-2 h-9 border rounded-lg text-xs font-semibold text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition cursor-pointer">
            <MdBackup className="w-4 h-4 text-gray-500" />
            <span>Fazer backup</span>
          </button>

          {/* Botão Verificar Atualizações */}
          <button className="flex-1 flex items-center justify-center gap-2 h-9 border rounded-lg text-xs font-semibold text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition cursor-pointer">
            <MdOutlineSystemUpdateAlt className="w-4 h-4 text-gray-500" />
            <span>Verificar atualizações</span>
          </button>
        </div>
      </div>
    </div>
  );
};
