import Database from "@tauri-apps/plugin-sql";

let dbInstance: Database | null = null;

export async function getDatabase(): Promise<Database> {
  if (!dbInstance) {
    // Abre ou cria o banco pdv.db
    dbInstance = await Database.load("sqlite:pdv.db");
    await initDatabase(dbInstance);
  }
  return dbInstance;
}

async function initDatabase(db: Database) {
  // Criação da tabela de produtos com suporte fiscal e soft delete
  await db.execute(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ean TEXT NOT NULL UNIQUE,
      nome TEXT NOT NULL,
      tipo TEXT NOT NULL DEFAULT 'UN',
      preco_custo REAL NOT NULL DEFAULT 0,
      preco_venda REAL NOT NULL DEFAULT 0,
      estoque REAL NOT NULL DEFAULT 0,
      ncm TEXT,
      cst_cfop TEXT,
      ativo INTEGER NOT NULL DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
}
