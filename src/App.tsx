import { useState, useEffect } from "react";
import "./App.css";

export const App = () => {

  const [dataAtual, setDataAtual] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDataAtual(new Date()); 
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatadorData = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long', // 'long' mostra o nome completo do dia
    day: '2-digit',  // '2-digit' garante que o dia 4 fique '04'
    month: 'long',
  });

  const dataBruta = formatadorData.format(dataAtual);
  const dataFormatada = dataBruta.charAt(0).toUpperCase() + dataBruta.slice(1);
  const horaFormatada = dataAtual.toLocaleTimeString('pt-BR');

  return (
    
    <main className="bg-gray-50 w-screen h-screen">
      {/* TOPSIDE */}
      <div className="h-12 flex border-b border-b-gray-400">
        <div className="flex justify-center items-center ">
          <h1 className="ml-12 font-bold pr-10 border-r border-r-gray-400">FRONT PDV</h1>
          <h2 className="ml-6 text-gray-500">Venda <span className="text-gray-900">#0000</span></h2>
        </div>
        <div className="flex items-center justify-center ml-auto mr-4">
          <span className="mr-5 text-gray-500">{dataFormatada}</span>
          <span className="mr-5 text-sm ">{horaFormatada}</span>
          <div className="rounded-full p-1 bg-emerald-400 mt-0.5 mr-1"></div>
          <span className="text-emerald-400">Caixa aberto</span>
        </div>
      </div>

      {/* CENTER */}
      <div className="ml-10">
        <input type="text" placeholder="Leitura de código de barras ou digitação manual." className="mt-4 pr-90 pt-3 rounded border border-gray-600 " />
        <div className="bg-blue-500 w-96 h-56"></div>
      </div>
      <footer></footer>
    </main>

  );
};
