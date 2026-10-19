import { getDatabase } from "./database";
import type { Caixa } from "../types/caixa";

// BUSCAR caixa aberto (se existir)
export async function buscarCaixaAberto(): Promise<Caixa | null> {
  const db = await getDatabase();
  const resultado = await db.select<Caixa[]>(
    // Trazer os campos explícitos e forçar o status a ser lido como texto
    `SELECT id, usuario_id, valor_fundo, valor_fechamento, observacao, 
            data_abertura, data_fechamento, status 
     FROM caixa 
     WHERE CAST(status AS TEXT) = 'aberto' 
     ORDER BY id DESC LIMIT 1`,
  );
  return resultado.length > 0 ? resultado[0] : null;
}

// ABRIR novo caixa
export async function abrirCaixa(
  usuarioId: number,
  valorFundo: number,
): Promise<void> {
  const db = await getDatabase();

  // Antes de abrir, verifica se já não tem um aberto (segurança extra)
  const aberto = await buscarCaixaAberto();
  if (aberto) {
    throw new Error("Já existe um caixa aberto.");
  }

  await db.execute(
    "INSERT INTO caixa (usuario_id, valor_fundo, status) VALUES ($1, $2, 'aberto')",
    [usuarioId, valorFundo],
  );
}

// FECHAR caixa atual
export async function fecharCaixa(
  caixaId: number,
  valorFechamento: number,
  observacao: string = "",
): Promise<void> {
  const db = await getDatabase();
  await db.execute(
    `UPDATE caixa 
     SET status = 'fechado', 
         valor_fechamento = $1,     
         observacao = $2, 
         data_fechamento = datetime('now', 'localtime') 
     WHERE id = $3`,
    [valorFechamento, observacao, caixaId],
  );
}
