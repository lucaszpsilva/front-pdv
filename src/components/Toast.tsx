import { useState, useEffect, useCallback } from "react";

interface ToastMessage {
  id: number;
  tipo: "sucesso" | "erro" | "info";
  mensagem: string;
}

let toastId = 0;
const listeners: Array<(toast: ToastMessage) => void> = [];

export function toast(tipo: ToastMessage["tipo"], mensagem: string) {
  const id = ++toastId;
  const novaToast: ToastMessage = { id, tipo, mensagem };
  listeners.forEach((fn) => fn(novaToast));
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((toast: ToastMessage) => {
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toast.id));
    }, 4000);
  }, []);

  useEffect(() => {
    listeners.push(addToast);
    return () => {
      const index = listeners.indexOf(addToast);
      if (index > -1) listeners.splice(index, 1);
    };
  }, [addToast]);

  const cores = {
    sucesso: "bg-emerald-500 border-emerald-600",
    erro: "bg-red-500 border-red-600",
    info: "bg-blue-500 border-blue-600",
  };

  const icones = {
    sucesso: "✓",
    erro: "✕",
    info: "ℹ",
  };

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`${cores[t.tipo]} text-white px-4 py-3 rounded-xl shadow-lg border flex items-center gap-3 min-w-[280px] animate-slide-in`}
        >
          <span className="text-lg font-bold">{icones[t.tipo]}</span>
          <span className="text-sm font-medium">{t.mensagem}</span>
          <button
            onClick={() =>
              setToasts((prev) => prev.filter((item) => item.id !== t.id))
            }
            className="ml-auto text-white/70 hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}