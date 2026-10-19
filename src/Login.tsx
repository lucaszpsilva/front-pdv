import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buscarUsuarioPorLogin } from "./services/usuarioService";
import { useSessao } from "./contexts/SessaoContext";
import { toast, ToastContainer } from "./components/Toast";

export const Login = () => {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();
  const { fazerLogin } = useSessao();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!login.trim() || !senha.trim()) {
      toast("info", "Preencha login e senha.");
      return;
    }

    setCarregando(true);
    try {
      const usuario = await buscarUsuarioPorLogin(login.trim());

      if (!usuario) {
        toast("erro", "Usuário não encontrado.");
        return;
      }

      if (usuario.senha !== senha) {
        toast("erro", "Senha incorreta.");
        return;
      }

      // Login com sucesso
      fazerLogin(usuario);
      toast("sucesso", `Bem-vindo, ${usuario.nome}!`);
      navigate("/"); // Vai pro Index
    } catch (error) {
      console.error(error);
      toast("erro", "Erro ao tentar fazer login.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-slate-50">
      <ToastContainer />
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm border border-gray-100">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">FRONT PDV</h1>
          <p className="text-sm text-gray-400 mt-1">Acesse sua conta</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-600">Login</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full h-10 px-3 border rounded-lg mt-1 outline-none focus:border-emerald-500"
              placeholder="Ex: admin"
              autoFocus
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full h-10 px-3 border rounded-lg mt-1 outline-none focus:border-emerald-500"
              placeholder="••••••"
            />
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="w-full h-10 mt-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white font-bold rounded-lg transition cursor-pointer"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
};
