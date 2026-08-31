// src/components/ModalNovoProduto.tsx
import { useState } from "react";
import { Produto } from "../Products";

interface ModalNewProductProps {
  isOpen: boolean;
  onClose: () => void;
  onSalvar: (produto: Produto) => void;
}

export const ModalNewProduct = ({
  isOpen,
  onClose,
  onSalvar,
}: ModalNewProductProps) => {
  const [barCode, setBarCode] = useState("");
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");

  if (!isOpen) return null; // Se não estiver aberto, não renderiza nada

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !barCode.trim()) return;

    onSalvar({
      id: Date.now(),
      barCode,
      nome,
      preco: Number(preco) || 0,
      estoque: Number(estoque) || 0,
    });

    // Limpa os campos e fecha
    setBarCode("");
    setNome("");
    setPreco("");
    setEstoque("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-100 p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="text-lg font-bold text-gray-800 mx-auto">
            Cadastrar Novo Produto
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold text-xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-600">
              Código de Barras
            </label>
            <input
              type="text"
              value={barCode}
              onChange={(e) => setBarCode(e.target.value)}
              className="w-full h-10 px-3 border rounded-lg mt-1 outline-none focus:border-emerald-500"
              placeholder="Ex: 7891000100103"
              autoFocus
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600">
              Descrição do Produto
            </label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full h-10 px-3 border rounded-lg mt-1 outline-none focus:border-emerald-500"
              placeholder="Ex: Refrigerante Cola 2L"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-600">
                Preço (R$)
              </label>
              <input
                type="number"
                step="0.01"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                className="w-full h-10 px-3 border rounded-lg mt-1 outline-none focus:border-emerald-500"
                placeholder="0,00"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600">
                Estoque Inicial
              </label>
              <input
                type="number"
                value={estoque}
                onChange={(e) => setEstoque(e.target.value)}
                className="w-full h-10 px-3 border rounded-lg mt-1 outline-none focus:border-emerald-500"
                placeholder="0"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-lg shadow-sm cursor-pointer"
            >
              Salvar Produto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
