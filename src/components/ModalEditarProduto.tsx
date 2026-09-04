import { useState, useEffect } from "react";
import { Produto } from "../services/productService";

interface ModalEditarProdutoProps {
  isOpen: boolean;
  produto: Produto | null;
  onClose: () => void;
  onSalvar: (produto: Produto) => Promise<void>;
}

export function ModalEditarProduto({
  isOpen,
  produto,
  onClose,
  onSalvar,
}: ModalEditarProdutoProps) {
  const [ean, setEan] = useState("");
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("UN");
  const [precoCusto, setPrecoCusto] = useState("");
  const [precoVenda, setPrecoVenda] = useState("");
  const [estoque, setEstoque] = useState("");
  const [ncm, setNcm] = useState("");
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (produto) {
      setEan(produto.ean);
      setNome(produto.nome);
      setTipo(produto.tipo || "UN");
      setPrecoCusto(String(produto.preco_custo || 0));
      setPrecoVenda(String(produto.preco_venda || 0));
      setEstoque(String(produto.estoque || 0));
      setNcm(produto.ncm || "");
    }
  }, [produto]);

  if (!isOpen || !produto) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !ean.trim()) return;

    setSalvando(true);
    try {
      await onSalvar({
        ...produto,
        ean: ean.trim(),
        nome: nome.trim(),
        tipo,
        preco_custo: Number(precoCusto) || 0,
        preco_venda: Number(precoVenda) || 0,
        estoque: Number(estoque) || 0,
        ncm: ncm.trim(),
      });
      onClose();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-100 p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="text-lg font-bold text-gray-800 mx-auto">
            Editar Produto
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold text-xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-600">
                Código de Barras
              </label>
              <input
                type="text"
                value={ean}
                onChange={(e) => setEan(e.target.value)}
                className="w-full h-10 px-3 border rounded-lg mt-1 outline-none focus:border-emerald-500"
                placeholder="Ex: 7891000100103"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600">
                Tipo
              </label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full h-10 px-3 border rounded-lg mt-1 outline-none focus:border-emerald-500 bg-white"
              >
                <option value="UN">Unidade (UN)</option>
                <option value="KG">Quilograma (KG)</option>
                <option value="LT">Litro (LT)</option>
                <option value="MT">Metro (MT)</option>
              </select>
            </div>
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
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-600">
                Preço Custo (R$)
              </label>
              <input
                type="number"
                step="0.01"
                value={precoCusto}
                onChange={(e) => setPrecoCusto(e.target.value)}
                className="w-full h-10 px-3 border rounded-lg mt-1 outline-none focus:border-emerald-500"
                placeholder="0,00"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600">
                Preço Venda (R$)
              </label>
              <input
                type="number"
                step="0.01"
                value={precoVenda}
                onChange={(e) => setPrecoVenda(e.target.value)}
                className="w-full h-10 px-3 border rounded-lg mt-1 outline-none focus:border-emerald-500"
                placeholder="0,00"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600">
                Estoque
              </label>
              <input
                type="number"
                step="0.001"
                value={estoque}
                onChange={(e) => setEstoque(e.target.value)}
                className="w-full h-10 px-3 border rounded-lg mt-1 outline-none focus:border-emerald-500"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600">NCM</label>
            <input
              type="text"
              value={ncm}
              onChange={(e) => setNcm(e.target.value)}
              className="w-full h-10 px-3 border rounded-lg mt-1 outline-none focus:border-emerald-500"
              placeholder="Ex: 22021000"
            />
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
              disabled={salvando}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white text-sm font-bold rounded-lg shadow-sm cursor-pointer disabled:cursor-not-allowed"
            >
              {salvando ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}