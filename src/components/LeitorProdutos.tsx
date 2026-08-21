import { useState } from "react";

interface LeitorProdutosProps {
  onPesquisar: (termo: string) => void;
}

export const LeitorProdutos = ({ onPesquisar }: LeitorProdutosProps) => {
  const [termo, setTermo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termo.trim()) return;

    onPesquisar(termo.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={termo}
        onChange={(e) => setTermo(e.target.value)}
        className="flex-1 h-12 px-4 text-gray-600 text-lg rounded-xl border border-gray-300 focus:border-emerald-500 outline-none transition"
        placeholder="Digite o nome ou bipe o código de barras..."
        autoFocus
      />
      <button
        type="submit"
        className="px-6 h-12 bg-emerald-500 hover:bg-emerald-600 rounded-xl font-bold text-white flex items-center justify-center gap-2 cursor-pointer transition"
      >
        Pesquisar
        <span className="px-2 py-0.5 text-xs font-normal rounded bg-white text-gray-500">
          Enter
        </span>
      </button>
    </form>
  );
};
