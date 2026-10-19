import { Navigate } from "react-router-dom";
import { useSessao } from "../contexts/SessaoContext";

export const RotaProtegida = ({ children }: { children: React.ReactNode }) => {
  const { usuarioLogado } = useSessao();

  // Se não tem ninguém logado, chuta de volta pra tela de login
  if (!usuarioLogado) {
    return <Navigate to="/login" replace />;
  }

  // Se tem usuário, deixa passar
  return <>{children}</>;
};
