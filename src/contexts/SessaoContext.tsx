import { createContext, useContext, useState, ReactNode } from "react";
import type { Usuario } from "../types/usuario";

type SessaoContextType = {
  usuarioLogado: Usuario | null;
  fazerLogin: (usuario: Usuario) => void;
  fazerLogout: () => void;
};

const SessaoContext = createContext<SessaoContextType | undefined>(undefined);

export const SessaoProvider = ({ children }: { children: ReactNode }) => {
  const [usuarioLogado, setUsuarioLogado] = useState<Usuario | null>(() => {
    // Tenta recuperar a sessão do localStorage se existir
    const salvo = localStorage.getItem("@frontpdv:usuario");
    return salvo ? JSON.parse(salvo) : null;
  });

  const fazerLogin = (usuario: Usuario) => {
    setUsuarioLogado(usuario);
    localStorage.setItem("@frontpdv:usuario", JSON.stringify(usuario));
  };

  const fazerLogout = () => {
    setUsuarioLogado(null);
    localStorage.removeItem("@frontpdv:usuario");
  };

  return (
    <SessaoContext.Provider value={{ usuarioLogado, fazerLogin, fazerLogout }}>
      {children}
    </SessaoContext.Provider>
  );
};

export const useSessao = () => {
  const context = useContext(SessaoContext);
  if (!context) {
    throw new Error("useSessao deve ser usado dentro de um SessaoProvider");
  }
  return context;
};
