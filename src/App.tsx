import { useState, useEffect } from "react";
import { Leitor } from "./components/Leitor";
import "./App.css";
import { ResumoVenda } from "./components/ResumoVenda";
import { CaixaRapido } from "./components/CaixaRapido";
import { useRelogio } from "./hooks/useRelogio";
import { toast, ToastContainer } from "./components/Toast";
import {
  Produto,
  listarProdutos,
} from "./services/productService";

export const App = () => {
  const { dataFormatada, horaFormatada } = useRelogio();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [itensVenda, setItensVenda] = useState<Produto[]>([]);

  // Carrega produtos do banco ao abrir a tela
  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const lista = await listarProdutos();
      setProdutos(lista);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      toast("erro", "Erro ao carregar produtos do banco!");
    }
  };

  // Função para deletar item da venda
  const handleDeletarProduto = (idParaDeletar: number) => {
    setItensVenda((atuais) =>
      atuais.filter((item) => item.id !== idParaDeletar),
    );
  };

  // Função para adicionar item pelo leitor
  const handleAdicionarProduto = (codigoLido: number) => {
    const produtoEncontrado = produtos.find(
      (p) => Number(p.ean) === codigoLido,
    );

    if (!produtoEncontrado) {
      toast("info", "Produto não encontrado no sistema!");
      return;
    }

    // Verifica se o produto já está na lista e incrementa quantidade
    const existente = itensVenda.find((p) => p.ean === produtoEncontrado.ean);
    if (existente && existente.id) {
      setItensVenda((prev) =>
        prev.map((p) =>
          p.id === existente.id
            ? { ...p, estoque: (p.estoque || 0) + 1 }
            : p,
        ),
      );
      toast("sucesso", `+1 ${produtoEncontrado.nome}`);
      return;
    }

    // Adiciona novo item com quantidade 1
    const novoItem: Produto = {
      ...produtoEncontrado,
      estoque: 1, // Usamos estoque como quantidade na venda
    };

    setItensVenda((prev) => [...prev, novoItem]);
    toast("sucesso", `${produtoEncontrado.nome} adicionado!`);
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
          <CaixaRapido produtos={itensVenda} onDeletar={handleDeletarProduto} />
        </section>

        <ResumoVenda />
      </div>
    </main>
  );
};