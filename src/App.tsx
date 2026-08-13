import { useState, useEffect } from "react";
import { Leitor } from "./components/Leitor";
import "./App.css";
import { ResumoVenda } from "./components/ResumoVenda";
import { CaixaRapido } from "./components/CaixaRapido";

export interface testeProduto {
  id: number;
  name: string;
  barCode: number;
  qtd: number;
  unid: number;
  total: number;
}

const CATALOGO: testeProduto[] = [
  {
    id: 1,
    name: "produtoTeste",
    barCode: 7891000315507,
    qtd: 1,
    unid: 11.4,
    total: 11.4,
  },
  {
    id: 2,
    name: "testeProduto",
    barCode: 7891910000197,
    qtd: 1,
    unid: 7.8,
    total: 7.8,
  },
];

export const App = () => {
  const [dataAtual, setDataAtual] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDataAtual(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatadorData = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  const dataBruta = formatadorData.format(dataAtual);
  const dataFormatada = dataBruta.charAt(0).toUpperCase() + dataBruta.slice(1);
  const horaFormatada = dataAtual.toLocaleTimeString("pt-BR");

  const [produtos, setProdutos] = useState<testeProduto[]>(CATALOGO);

  // Função para deletar item
  const handleDeletarProduto = (idParaDeletar: number) => {
    setProdutos((produtosAtuais) =>
      produtosAtuais.filter((item) => item.id !== idParaDeletar),
    );
  };

  // Função para adicionar item pelo leitor
  const handleAdicionarProduto = (codigoLido: number) => {
    const produtoEncontrado = CATALOGO.find((p) => p.barCode === codigoLido);

    if (!produtoEncontrado) {
      alert("Produto não encontrado no sistema!");
      return;
    }

    const novoItem: testeProduto = {
      ...produtoEncontrado,
      id: Date.now(), // ID único baseado no timestamp
    };

    setProdutos((prev) => [...prev, novoItem]);
  };

  return (
    <main className="bg-gray-50 w-screen h-screen flex flex-col overflow-hidden">
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
          {/* Passando a função de adicionar via Prop */}
          <Leitor onAdicionar={handleAdicionarProduto} />

          {/* Passando a lista e a função de deletar via Props */}
          <CaixaRapido produtos={produtos} onDeletar={handleDeletarProduto} />
        </section>

        <ResumoVenda />
      </div>
    </main>
  );
};
