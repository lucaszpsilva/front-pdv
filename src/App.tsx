import { useState, useEffect } from "react";
import { Leitor } from "./components/Leitor";
import "./App.css";
import { ResumoVenda } from "./components/ResumoVenda";
import { CaixaRapido } from "./components/CaixaRapido";

export const App = () => {
  const [dataAtual, setDataAtual] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDataAtual(new Date());
    }, 1000);
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
          <Leitor />
          <CaixaRapido />
        </section>

        <ResumoVenda />
      </div>
    </main>
  );
};
