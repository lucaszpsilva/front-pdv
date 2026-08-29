import { useState } from "react";
import { GrConfigure } from "react-icons/gr";
import { FaDatabase, FaShoppingCart, FaUserFriends } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaGear } from "react-icons/fa6";
import { DadosLoja } from "./components/DadosLoja";
import { ConfigSystem } from "./components/ConfigSystem";

export const Config = () => {
  const navigate = useNavigate();
  const [abaAtiva, setAbaAtiva] = useState<
    "loja" | "caixa" | "usuarios" | "sistema"
  >("loja");

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
          <div className="flex items-center ml-3 bg-blue-50 text-blue-600 p-1.5 rounded-lg">
            <GrConfigure className="w-4 h-4" />
          </div>
          <h2 className="ml-2 font-semibold text-gray-700">Configurações</h2>
        </div>
      </header>

      {/* Container Horizontal do Corpo (Menu + Conteúdo) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Menu Lateral */}
        <nav className="w-48 bg-white border-r border-gray-200 p-3 flex flex-col gap-1 shrink-0">
          <button
            onClick={() => setAbaAtiva("loja")}
            className={`flex items-center w-full px-3 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
              abaAtiva === "loja"
                ? "bg-purple-50 text-purple-600"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <FaDatabase className="w-4 h-4 mr-2.5 shrink-0" />
            <span>Dados da Loja</span>
          </button>

          <button
            onClick={() => setAbaAtiva("caixa")}
            className={`flex items-center w-full px-3 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
              abaAtiva === "caixa"
                ? "bg-purple-50 text-purple-600"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <FaShoppingCart className="w-4 h-4 mr-2.5 shrink-0" />
            <span>Caixa / PDV</span>
          </button>

          <button
            onClick={() => setAbaAtiva("usuarios")}
            className={`flex items-center w-full px-3 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
              abaAtiva === "usuarios"
                ? "bg-purple-50 text-purple-600"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <FaUserFriends className="w-4 h-4 mr-2.5 shrink-0" />
            <span>Usuários</span>
          </button>

          <button
            onClick={() => setAbaAtiva("sistema")}
            className={`flex items-center w-full px-3 py-2 rounded-xl text-sm font-semibold transition cursor-pointer ${
              abaAtiva === "sistema"
                ? "bg-purple-50 text-purple-600"
                : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <FaGear className="w-4 h-4 mr-2.5 shrink-0" />
            <span>Sistema</span>
          </button>
        </nav>

        {/* Área Central / Conteúdo da Aba */}
        <div className="flex-1 overflow-y-auto p-8">
          {abaAtiva === "loja" && <DadosLoja />}

          {abaAtiva === "caixa" && (
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Configurações do Caixa
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Ajustes de leitor, impressora e comportamento do PDV.
              </p>
            </div>
          )}

          {abaAtiva === "usuarios" && (
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Gerenciamento de Usuários
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Operadores de caixa e administradores.
              </p>
            </div>
          )}

          {abaAtiva === "sistema" && <ConfigSystem />}
        </div>
      </div>
    </main>
  );
};
