import Database from "@tauri-apps/plugin-sql";

let db: Database | null = null;

export async function getDatabase(): Promise<Database> {
  if (db) return db;

  // Conecta ao banco SQLite local (cria automaticamente se não existir)
  db = await Database.load("sqlite:frontpdv.db");

  // Cria a tabela de produtos (se não existir)
  await db.execute(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ean TEXT NOT NULL UNIQUE,
      nome TEXT NOT NULL,
      tipo TEXT DEFAULT 'UN',
      preco_custo REAL DEFAULT 0,
      preco_venda REAL DEFAULT 0,
      estoque REAL DEFAULT 0,
      ncm TEXT DEFAULT '',
      ativo INTEGER DEFAULT 1,
      criado_em TEXT DEFAULT (datetime('now', 'localtime')),
      atualizado_em TEXT DEFAULT (datetime('now', 'localtime'))
    )
  `);

  return db;
}
