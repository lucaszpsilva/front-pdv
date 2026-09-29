import { getDatabase } from "./database";

export interface Produto {
  id?: number;
  ean: string;
  nome: string;
  tipo: string;
  preco_custo: number;
  preco_venda: number;
  estoque: number;
  ncm: string;
  ativo?: number;
  criado_em?: string;
  atualizado_em?: string;
}

// LISTAR todos os produtos ativos
export async function listarProdutos(): Promise<Produto[]> {
  const db = await getDatabase();
  return db.select<Produto[]>(
    "SELECT * FROM produtos WHERE ativo = 1 ORDER BY nome ASC",
  );
}

// CRIAR um novo produto
export async function criarProduto(
  produto: Omit<Produto, "id" | "ativo" | "criado_em" | "atualizado_em">,
): Promise<void> {
  const db = await getDatabase();
  await db.execute(
    `INSERT INTO produtos (ean, nome, tipo, preco_custo, preco_venda, estoque, ncm)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      produto.ean,
      produto.nome,
      produto.tipo,
      produto.preco_custo,
      produto.preco_venda,
      produto.estoque,
      produto.ncm,
    ],
  );
}

// ATUALIZAR um produto existente
export async function atualizarProduto(produto: Produto): Promise<void> {
  const db = await getDatabase();
  await db.execute(
    `UPDATE produtos SET ean = $1, nome = $2, tipo = $3, preco_custo = $4,
     preco_venda = $5, estoque = $6, ncm = $7,
     atualizado_em = datetime('now', 'localtime')
     WHERE id = $8`,
    [
      produto.ean,
      produto.nome,
      produto.tipo,
      produto.preco_custo,
      produto.preco_venda,
      produto.estoque,
      produto.ncm,
      produto.id,
    ],
  );
}

// DESATIVAR produto (soft delete - não apaga, só marca como inativo)
export async function desativarProduto(id: number): Promise<void> {
  const db = await getDatabase();
  await db.execute(
    "UPDATE produtos SET ativo = 0, atualizado_em = datetime('now', 'localtime') WHERE id = $1",
    [id],
  );
}

// BUSCAR produto por código de barras
export async function buscarProdutoPorEan(
  ean: string,
): Promise<Produto | null> {
  const db = await getDatabase();
  const resultados = await db.select<Produto[]>(
    "SELECT * FROM produtos WHERE ean = $1 AND ativo = 1 LIMIT 1",
    [ean],
  );
  return resultados.length > 0 ? resultados[0] : null;
}
