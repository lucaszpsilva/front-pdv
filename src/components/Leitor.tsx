  import { useState } from "react";

  interface LeitorProps {
    onAdicionar: (codigo: number) => void;
  }

  export const Leitor = ({ onAdicionar }: LeitorProps) => {
    const [barCode, setBarcode] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!barCode.trim()) return;

      // Dispara a função do pai convertendo texto para número
      onAdicionar(Number(barCode));
      setBarcode("");
    };

    return (
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
    );
  };
