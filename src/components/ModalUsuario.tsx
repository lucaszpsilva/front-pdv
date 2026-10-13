import { useState, useEffect } from "react";
import type { TipoUsuario, Usuario } from "../types/usuario";

interface ModalUsuarioProps {
  isOpen: boolean;
  usuario: Usuario | null; // null = criar, preenchido = editar
  onClose: () => void;
  onSalvar: (usuario: Usuario) => Promise<void>;
}

export const ModalUsuario = ({
  isOpen,
  usuario,
  onClose,
  onSalvar,
}: ModalUsuarioProps) => {
  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [tipo, setTipo] = useState<TipoUsuario>("operador");
  const [salvando, setSalvando] = useState(false);

  // Quando o modal abre, preenche os campos se for edição
  useEffect(() => {
    if (usuario) {
      setNome(usuario.nome);
      setLogin(usuario.login);
      setSenha(usuario.senha);
      setTipo(usuario.tipo);
    } else {
      setNome("");
      setLogin("");
      setSenha("");
      setTipo("operador");
    }
  }, [usuario, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !login.trim() || !senha.trim()) return;

    setSalvando(true);
    try {
      await onSalvar({
        ...(usuario ?? {}),
        nome: nome.trim(),
        login: login.trim(),
        senha: senha.trim(),
        tipo,
      });
      onClose();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="text-lg font-bold text-gray-800 mx-auto">
            {usuario ? "Editar Usuário" : "Novo Usuário"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 font-bold text-xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-600">Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full h-10 px-3 border rounded-lg mt-1 outline-none focus:border-emerald-500"
              placeholder="Ex: João da Silva"
              required
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-gray-600">
                Login
              </label>
              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="w-full h-10 px-3 border rounded-lg mt-1 outline-none focus:border-emerald-500"
                placeholder="Ex: joao"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600">
                Senha
              </label>
              <input
                type="text"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full h-10 px-3 border rounded-lg mt-1 outline-none focus:border-emerald-500"
                placeholder="Ex: 1234"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600">
              Tipo de acesso
            </label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as TipoUsuario)}
              className="w-full h-10 px-3 border rounded-lg mt-1 outline-none focus:border-emerald-500 bg-white"
            >
              <option value="operador">Operador</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={salvando}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white text-sm font-bold rounded-lg shadow-sm cursor-pointer disabled:cursor-not-allowed"
            >
              {salvando ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
