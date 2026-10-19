import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "./components/Toast";
import { useSessao } from "./contexts/SessaoContext";
import {
  buscarCaixaAberto,
  abrirCaixa,
  fecharCaixa,
} from "./services/caixaService";
import type { Caixa as TipoCaixa } from "./types/caixa";
import { formatarMoeda } from "./utils/format";

export const Caixa = () => {
  const navigate = useNavigate();
  const { usuarioLogado } = useSessao();

  const [caixaAtual, setCaixaAtual] = useState<TipoCaixa | null>(null);
  const [carregando, setCarregando] = useState(true);

  // Estados para os inputs
  const [valorFundo, setValorFundo] = useState("");
  const [valorFechamento, setValorFechamento] = useState("");
  const [observacao, setObservacao] = useState("");
  const [processando, setProcessando] = useState(false);

  // Carrega o status do caixa ao abrir a tela
  useEffect(() => {
    carregarCaixa();
  }, []);

  const carregarCaixa = async () => {
    setCarregando(true);
    try {
      const aberto = await buscarCaixaAberto();
      setCaixaAtual(aberto);
    } catch (error) {
      console.error(error);
      toast("erro", "Erro ao verificar status do caixa.");
    } finally {
      setCarregando(false);
    }
  };

  const handleAbrir = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuarioLogado?.id) return;

    setProcessando(true);
    try {
      const valor = Number(valorFundo.replace(",", ".")) || 0;
      await abrirCaixa(usuarioLogado.id, valor);
      toast("sucesso", "Caixa aberto com sucesso!");
      setValorFundo("");
      await carregarCaixa();
    } catch (error: any) {
      console.error(error);
      toast("erro", error.message || "Erro ao abrir o caixa.");
    } finally {
      setProcessando(false);
    }
  };

  const handleFechar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!caixaAtual?.id) return;

    setProcessando(true);
    try {
      const valor = Number(valorFechamento.replace(",", ".")) || 0;
      await fecharCaixa(caixaAtual.id, valor, observacao);
      toast("sucesso", "Caixa fechado com sucesso!");
      setValorFechamento("");
      setObservacao("");
      await carregarCaixa();
    } catch (error) {
      console.error(error);
      toast("erro", "Erro ao fechar o caixa.");
    } finally {
      setProcessando(false);
    }
  };

  if (carregando) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-slate-50">
        <span className="text-gray-500 font-medium">Verificando caixa...</span>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <h1 className="text-xl font-bold text-gray-800">
            {caixaAtual ? "Fechamento de Caixa" : "Abertura de Caixa"}
          </h1>
          <button
            onClick={() => navigate("/")}
            className="text-sm text-gray-400 hover:text-gray-700 font-medium"
          >
            Voltar ao menu
          </button>
        </div>

        {!caixaAtual ? (
          /* ================= TELA DE ABERTURA ================= */
          <form onSubmit={handleAbrir} className="flex flex-col gap-4">
            <p className="text-sm text-gray-500 mb-2">
              Olá, <strong>{usuarioLogado?.nome}</strong>. Para iniciar as
              vendas, informe o valor de troco (fundo de caixa).
            </p>
            <div>
              <label className="text-xs font-semibold text-gray-600">
                Valor de Abertura (R$)
              </label>
              <input
                type="text"
                value={valorFundo}
                onChange={(e) => setValorFundo(e.target.value)}
                className="w-full h-12 px-4 border rounded-lg mt-1 outline-none focus:border-emerald-500 text-lg font-medium"
                placeholder="Ex: 150,00"
                autoFocus
              />
            </div>
            <button
              type="submit"
              disabled={processando}
              className="w-full h-12 mt-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white font-bold rounded-lg transition cursor-pointer"
            >
              {processando ? "Abrindo..." : "Abrir Caixa e Iniciar Vendas"}
            </button>
          </form>
        ) : (
          /* ================= TELA DE FECHAMENTO ================= */
          <form onSubmit={handleFechar} className="flex flex-col gap-4">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl mb-2">
              <p className="text-sm text-gray-600 mb-1">
                Aberto em: <strong>{caixaAtual.data_abertura}</strong>
              </p>
              <p className="text-sm text-gray-600">
                Fundo de troco:{" "}
                <strong>{formatarMoeda(caixaAtual.valor_fundo)}</strong>
              </p>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600">
                Valor em Dinheiro Contado (R$)
              </label>
              <input
                type="text"
                value={valorFechamento}
                onChange={(e) => setValorFechamento(e.target.value)}
                className="w-full h-12 px-4 border rounded-lg mt-1 outline-none focus:border-emerald-500 text-lg font-medium"
                placeholder="Ex: 1250,50"
                autoFocus
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-600">
                Observações (opcional)
              </label>
              <textarea
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
                className="w-full p-3 border rounded-lg mt-1 outline-none focus:border-emerald-500 resize-none h-20 text-sm"
                placeholder="Ex: Sobrou R$ 10,00 a mais no caixa."
              />
            </div>

            <button
              type="submit"
              disabled={processando}
              className="w-full h-12 mt-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white font-bold rounded-lg transition cursor-pointer"
            >
              {processando ? "Fechando..." : "Fechar Caixa e Encerrar Turno"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
