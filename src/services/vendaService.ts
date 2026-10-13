import { getDatabase } from "./database";
import type { ItemVenda, Venda, VendaComItens } from "../types/venda";

// Salva uma venda e seus itens numa transação
export async function criarVenda(
  venda: Omit<Venda, "id" | "criado_em" | "finalizado_em" | "status">,
  itens: Omit<ItemVenda, "id" | "venda_id" | "criado_em">[],
): Promise<number> {
  const db = await getDatabase();

  // Abre a transação. Tudo que acontecer entre BEGIN e COMMIT
  // é gravado de uma vez. Se algo falhar, o ROLLBACK desfaz tudo.
  await db.execute("BEGIN");

  try {
    // 1. Insere a cabeça da venda (sem os itens ainda)
    await db.execute(
      `INSERT INTO vendas
        (caixa_id, usuario_id, forma_pagamento, status, total, desconto, desconto_tipo, valor_recebido, troco)
       VALUES ($1, $2, $3, 'ativa', $4, $5, $6, $7, $8)`,
      [
        venda.caixa_id,
        venda.usuario_id,
        venda.forma_pagamento,
        venda.total,
        venda.desconto,
        venda.desconto_tipo,
        venda.valor_recebido,
        venda.troco,
      ],
    );

    // 2. Pega o id que o banco acabou de gerar para essa venda.
    //    É esse id que vai virar o venda_id de cada item.
    const resultado = await db.select<{ id: number }[]>(
      "SELECT last_insert_rowid() AS id",
    );
    const vendaId = resultado[0].id;

    // 3. Insere cada item apontando para a venda
    for (const item of itens) {
      await db.execute(
        `INSERT INTO itens_venda
          (venda_id, produto_id, ean, nome, tipo, quantidade, preco_unitario, preco_total)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          vendaId,
          item.produto_id,
          item.ean,
          item.nome,
          item.tipo,
          item.quantidade,
          item.preco_unitario,
          item.preco_total,
        ],
      );
    }

    // 4. Confirma a transação. A partir daqui, os dados estão gravados.
    await db.execute("COMMIT");

    return vendaId;
  } catch (erro) {
    // Se qualquer coisa deu errado (INSERT falhou, item inválido, etc),
    // desfaz tudo que foi feito dentro do BEGIN. Nada fica no banco.
    await db.execute("ROLLBACK");
    throw erro;
  }
}

// Lista de todas as vendas (mais recente primeiro)
export const listarVendas = async (): Promise<Venda[]> => {
  const db = await getDatabase();
  return db.select<Venda[]>("SELECT * FROM vendas ORDER BY criado_em DESC");
};

// Busca uma venda com seus itens
export const buscarVendaPorId = async (
  id: number,
): Promise<VendaComItens | null> => {
  const db = await getDatabase();

  // Busca a cabeça da venda
  const vendas = await db.select<Venda[]>(
    "SELECT * FROM vendas WHERE id = $1",
    [id],
  );

  if (vendas.length === 0) return null;

  // Busca os itens dessa venda
  const itens = await db.select<ItemVenda[]>(
    "SELECT * FROM itens_venda WHERE venda_id = $1",
    [id],
  );

  // Junta tudo num objeto só
  return { ...vendas[0], itens };
};

// Cancela uma venda (soft delete - não apaga)
export const cancelarVenda = async (id: number): Promise<void> => {
  const db = await getDatabase();
  await db.execute("UPDATE vendas SET status = 'cancelada' WHERE id = $1", [
    id,
  ]);
};
