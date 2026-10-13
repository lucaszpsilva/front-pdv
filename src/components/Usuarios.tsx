import { useState, useEffect } from "react";
import { toast } from "./Toast";
import { ModalUsuario } from "./ModalUsuario";
import type { Usuario } from "../types/usuario";
import {
  listarUsuarios,
  criarUsuario,
  atualizarUsuario,
  desativarUsuario,
} from "../services/usuarioService";

export const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<Usuario | null>(
    null,
  );

  const carregar = async () => {
    try {
      setUsuarios(await listarUsuarios());
    } catch (error) {
      console.error(error);
      toast("erro", "Erro ao carregar usuários");
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  const handleNovo = () => {
    setUsuarioSelecionado(null);
    setModalAberto(true);
  };

  const handleEditar = (usuario: Usuario) => {
    setUsuarioSelecionado(usuario);
    setModalAberto(true);
  };

  const handleSalvar = async (usuario: Usuario) => {
    try {
      if (usuario.id) {
        await atualizarUsuario(usuario);
        toast("sucesso", "Usuário atualizado!");
      } else {
        await criarUsuario(usuario);
        toast("sucesso", "Usuário cadastrado!");
      }
      await carregar();
    } catch (error) {
      console.error(error);
      toast("erro", "Erro ao salvar usuário. Verifique se o login já existe.");
    }
  };

  const handleDesativar = async (usuario: Usuario) => {
    if (!usuario.id) return;
    try {
      await desativarUsuario(usuario.id);
      toast("sucesso", `Usuário ${usuario.nome} desativado.`);
      await carregar();
    } catch (error) {
      console.error(error);
      toast("erro", "Erro ao desativar usuário");
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Usuários</h1>
          <p className="text-xs text-gray-400 mt-1">
            Cadastro de operadores e administradores
          </p>
        </div>
        <button
          onClick={handleNovo}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold text-sm cursor-pointer transition"
        >
          + Novo Usuário
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-12 px-6 py-3 bg-slate-50 border-b text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <div className="col-span-5">Nome</div>
          <div className="col-span-3">Login</div>
          <div className="col-span-2">Tipo</div>
          <div className="col-span-2 text-right">Ações</div>
        </div>

        {usuarios.length === 0 ? (
          <div className="p-6 text-center text-slate-400 text-sm">
            Nenhum usuário cadastrado.
          </div>
        ) : (
          usuarios.map((u) => (
            <div
              key={u.id}
              className="grid grid-cols-12 px-6 py-3 border-b border-gray-100 items-center text-sm hover:bg-slate-50 transition"
            >
              <div className="col-span-5 font-medium text-slate-800">
                {u.nome}
              </div>
              <div className="col-span-3 text-slate-600">{u.login}</div>
              <div className="col-span-2">
                <span
                  className={`px-2 py-0.5 rounded text-xs font-semibold ${
                    u.tipo === "admin"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {u.tipo}
                </span>
              </div>
              <div className="col-span-2 flex justify-end gap-2">
                <button
                  onClick={() => handleEditar(u)}
                  className="text-xs text-emerald-600 hover:underline cursor-pointer"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDesativar(u)}
                  className="text-xs text-red-500 hover:underline cursor-pointer"
                >
                  Desativar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <ModalUsuario
        isOpen={modalAberto}
        usuario={usuarioSelecionado}
        onClose={() => setModalAberto(false)}
        onSalvar={handleSalvar}
      />
    </div>
  );
};
