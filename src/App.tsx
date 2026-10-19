import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 👈 Adicionado
import { Leitor } from "./components/Leitor";
import "./App.css";
import { ResumoVenda } from "./components/ResumoVenda";
import { CaixaRapido } from "./components/CaixaRapido";
import { useRelogio } from "./hooks/useRelogio";
import { toast, ToastContainer } from "./components/Toast";
import { Produto, listarProdutos } from "./services/productService";
import type { FormaPagamento } from "./types/pagamento";
import type { ItemVenda } from "./types/venda";
import { criarVenda } from "./services/vendaService";
import { useSessao } from "./contexts/SessaoContext";
import { ModalConfirmacao } from "./components/ModalConfirmacao"; // 👈 Adicionado

export const App = () => {
  const { usuarioLogado } = useSessao();
  const { dataFormatada, horaFormatada } = useRelogio();
  const navigate = useNavigate(); // 👈 Adicionado
  
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [itensVenda, setItensVenda] = useState<Produto[]>([]);
  const [formaPagamento, setFormaPagamento] = useState<FormaPagamento | null>(null);
  const [finalizando, setFinalizando] = useState(false);
  
  // Estado para o modal de saída
  const [mostrarConfirmacaoSair, setMostrarConfirmacaoSair] = useState(false); // 👈 Adicionado

  const total = itensVenda.reduce(
    (acc, item) => acc + item.preco_venda * (item.estoque || 0),
    0,
  );

  useEffect(() => {
    carregarProdutos();
  }, []);

  // Escuta o ESC para sair do caixa
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (itensVenda.length > 0) {
          // Se tiver item, abre o modal
          setMostrarConfirmacaoSair(true);
        } else {
          // Se estiver vazio, sai direto
          navigate("/");
        }
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [itensVenda, navigate]); // Depende de itensVenda para saber se está vazio

  const carregarProdutos = async () => {
    try {
      const lista = await listarProdutos();
      setProdutos(lista);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      toast("erro", "Erro ao carregar produtos do banco!");
    }
  };

  const handleDeletarProduto = (idParaDeletar: number) => {
    setItensVenda((atuais) =>
      atuais.filter((item) => item.id !== idParaDeletar),
    );
  };

  const handleAdicionarProduto = (codigoLido: number) => {
    const produtoEncontrado = produtos.find(
      (p) => Number(p.ean) === codigoLido,
    );

    if (!produtoEncontrado) {
      toast("info", "Produto não encontrado no sistema!");
      return;
    }

    const existente = itensVenda.find((p) => p.ean === produtoEncontrado.ean);
    if (existente && existente.id) {
      setItensVenda((prev) =>
        prev.map((p) =>
          p.id === existente.id ? { ...p, estoque: (p.estoque || 0) + 1 } : p,
        ),
      );
      toast("sucesso", `+1 ${produtoEncontrado.nome}`);
      return;
    }

    const novoItem: Produto = {
      ...produtoEncontrado,
      estoque: 1,
    };

    setItensVenda((prev) => [...prev, novoItem]);
    toast("sucesso", `${produtoEncontrado.nome} adicionado!`);
  };

  const handleFinalizarVenda = async () => {
    if (itensVenda.length === 0) {
      toast("info", "Adicione ao menos um item para finalizar a venda.");
      return;
    }
    if (!formaPagamento) {
      toast("info", "Selecione a forma de pagamento.");
      return;
    }

    setFinalizando(true);
    try {
      const itensParaSalvar: Omit<ItemVenda, "id" | "venda_id" | "criado_em">[] =
        itensVenda.map((item) => ({
          produto_id: item.id,
          ean: item.ean,
          nome: item.nome,
          tipo: item.tipo,
          quantidade: item.estoque || 0,
          preco_unitario: item.preco_venda,
          preco_total: item.preco_venda * (item.estoque || 0),
        }));

      await criarVenda(
        {
          caixa_id: 1,
          usuario_id: usuarioLogado?.id || 1,
          forma_pagamento: formaPagamento,
          total,
          desconto: 0,
          desconto_tipo: "valor",
          valor_recebido: total,
          troco: 0,
        },
        itensParaSalvar,
      );

      toast("sucesso", "Venda finalizada com sucesso!");
      setItensVenda([]);
      setFormaPagamento(null);
    } catch (error) {
      console.error("Erro ao finalizar venda:", error);
      toast("erro", "Erro ao finalizar venda. Tente novamente.");
    } finally {
      setFinalizando(false);
    }
  };

  return (
    <main className="bg-gray-50 w-screen h-screen flex flex-col overflow-hidden">
      <ToastContainer />

      <header className="h-12 flex border-b border-gray-300 bg-white items-center px-4 shrink-0">
        <div className="flex items-center">
          <h1 className="font-bold pr-6 border-r border-gray-300">FRONT PDV</h1>
          <h2 className="ml-6 text-gray-500">
            Venda <span className="text-gray-900">#0000</span>
          </h2>
        </div>
        <span className="mx-auto text-gray-500">
          Operador:
          <strong className="text-gray-800"> {usuarioLogado?.nome}</strong>
        </span>
        <div className="flex items-center ml-auto">
          <span className="mr-5 text-gray-500">{dataFormatada}</span>
          <span className="mr-5 text-sm">{horaFormatada}</span>
          <div className="rounded-full p-1 bg-emerald-400 mr-1.5"></div>
          <span className="text-emerald-500 font-medium">Caixa aberto</span>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-12 gap-4 p-4 overflow-hidden">
        <section className="col-span-8 lg:col-span-9 flex flex-col h-full gap-4">
          <Leitor onAdicionar={handleAdicionarProduto} />
          <CaixaRapido
            produtos={itensVenda}
            onDeletar={handleDeletarProduto}
            total={total}
          />
        </section>

        <ResumoVenda
          formaPagamento={formaPagamento}
          onSelecionarForma={setFormaPagamento}
          subtotal={total}
          total={total}
          onFinalizar={handleFinalizarVenda}
          finalizando={finalizando}
        />
      </div>

      {/* Modal de confirmação de saída */}
      <ModalConfirmacao
        isOpen={mostrarConfirmacaoSair}
        titulo="Sair do caixa?"
        mensagem="Existem itens na venda atual. Se você sair agora, a venda será perdida."
        onConfirmar={() => navigate("/")}
        onCancelar={() => setMostrarConfirmacaoSair(false)}
        confirmarTexto="Sim, sair"
        cancelarTexto="Continuar vendendo"
        tipo="perigo"
      />
    </main>
  );
};