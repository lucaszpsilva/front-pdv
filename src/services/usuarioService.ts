import { getDatabase } from "./database";
import type { Usuario } from "../types/usuario";

// LISTAR todos os usuários ativos
export async function listarUsuarios(): Promise<Usuario[]> {
  const db = await getDatabase();
  return db.select<Usuario[]>(
    "SELECT * FROM usuarios WHERE ativo = 1 ORDER BY nome ASC",
  );
}

// BUSCAR usuário por id
export async function buscarUsuarioPorId(id: number): Promise<Usuario | null> {
  const db = await getDatabase();
  const resultado = await db.select<Usuario[]>(
    "SELECT * FROM usuarios WHERE id = $1 AND ativo = 1",
    [id],
  );
  return resultado.length > 0 ? resultado[0] : null;
}

// BUSCAR usuário por login (usado no login)
export async function buscarUsuarioPorLogin(
  login: string,
): Promise<Usuario | null> {
  const db = await getDatabase();
  const resultado = await db.select<Usuario[]>(
    "SELECT * FROM usuarios WHERE login = $1 AND ativo = 1",
    [login],
  );
  return resultado.length > 0 ? resultado[0] : null;
}

// CRIAR novo usuário
export async function criarUsuario(
  usuario: Omit<Usuario, "id" | "ativo" | "criado_em" | "atualizado_em">,
): Promise<void> {
  const db = await getDatabase();
  await db.execute(
    `INSERT INTO usuarios (nome, login, senha, tipo)
     VALUES ($1, $2, $3, $4)`,
    [usuario.nome, usuario.login, usuario.senha, usuario.tipo],
  );
}

// ATUALIZAR usuário existente
export async function atualizarUsuario(usuario: Usuario): Promise<void> {
  const db = await getDatabase();
  await db.execute(
    `UPDATE usuarios
     SET nome = $1, login = $2, senha = $3, tipo = $4,
         atualizado_em = datetime('now', 'localtime')
     WHERE id = $5`,
    [usuario.nome, usuario.login, usuario.senha, usuario.tipo, usuario.id],
  );
}

// DESATIVAR usuário (soft delete)
export async function desativarUsuario(id: number): Promise<void> {
  const db = await getDatabase();
  await db.execute(
    "UPDATE usuarios SET ativo = 0, atualizado_em = datetime('now', 'localtime') WHERE id = $1",
    [id],
  );
}
