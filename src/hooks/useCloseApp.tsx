import { useEffect, useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";

export const useCloseApp = () => {
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Esc") {
        setMostrarConfirmacao(true);
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const confirmarFechamento = () => {
    getCurrentWindow().close();
  };

  const cancelarFechamento = () => {
    setMostrarConfirmacao(false);
  };

  return { mostrarConfirmacao, confirmarFechamento, cancelarFechamento };
};
