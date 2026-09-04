import { useState, useEffect } from "react";

interface RelogioInfo {
  dataFormatada: string;
  horaFormatada: string;
}

export function useRelogio(): RelogioInfo {
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

  return { dataFormatada, horaFormatada };
}