import { getDatabase } from "./database";

// 1. Tipagem correspondente à tabela SQLite
export interface Produto {
  id?: number;
  ean: string;
  nome: string;
  tipo: string;
  preco_custo: number;
  preco_venda: number;
  estoque: number;
  ncm?: string;
  cst_cfop?: string;
  ativo?: number;
  created_at?: string;
}

// 2. Buscar todos os produtos ativos
export async function listarProdutos(): Promise<Produto[]> {
  const db = await getDatabase();
  return await db.select<Produto[]>(
    "SELECT * FROM produtos WHERE ativo = 1 ORDER BY id DESC",
  );
}

// 3. Cadastrar um novo produto
export async function criarProduto(
  produto: Omit<Produto, "id" | "ativo" | "created_at">,
) {
  const db = await getDatabase();
  return await db.execute(
    `INSERT INTO produtos (ean, nome, tipo, preco_custo, preco_venda, estoque, ncm, cst_cfop)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [
      produto.ean,
      produto.nome,
      produto.tipo || "UN",
      produto.preco_custo || 0,
      produto.preco_venda,
      produto.estoque || 0,
      produto.ncm || "",
      produto.cst_cfop || "",
    ],
  );
}

// 4. Atualizar produto
export async function atualizarProduto(produto: Produto) {
  const db = await getDatabase();
  return await db.execute(
    `UPDATE produtos SET ean = $1, nome = $2, tipo = $3, preco_custo = $4, preco_venda = $5, estoque = $6, ncm = $7, cst_cfop = $8, updated_at = CURRENT_TIMESTAMP WHERE id = $9`,
    [
      produto.ean,
      produto.nome,
      produto.tipo || "UN",
      produto.preco_custo || 0,
      produto.preco_venda,
      produto.estoque || 0,
      produto.ncm || "",
      produto.cst_cfop || "",
      produto.id,
    ],
  );
}

// 5. Desativar produto (Soft Delete)
export async function desativarProduto(id: number) {
  const db = await getDatabase();
  return await db.execute("UPDATE produtos SET ativo = 0 WHERE id = $1", [id]);
}
