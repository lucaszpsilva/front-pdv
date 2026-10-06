import Database from "@tauri-apps/plugin-sql";

let db: Database | null = null;

export async function getDatabase(): Promise<Database> {
  if (db) return db;

  // Conecta ao banco SQLite local (cria automaticamente se não existir)
  db = await Database.load("sqlite:frontpdv.db");

  // ═══════════════════════════════════════════════════════════════
  // 1. PRODUTOS — Catálogo da loja
  // ═══════════════════════════════════════════════════════════════
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

  // ═══════════════════════════════════════════════════════════════
  // 2. USUARIOS — Operadores e administradores (RF01)
  // ═══════════════════════════════════════════════════════════════
  await db.execute(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      login TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL,
      tipo TEXT NOT NULL DEFAULT 'operador' CHECK(tipo IN ('admin', 'operador')),
      ativo INTEGER DEFAULT 1,
      criado_em TEXT DEFAULT (datetime('now', 'localtime')),
      atualizado_em TEXT DEFAULT (datetime('now', 'localtime'))
    )
  `);

  // ═══════════════════════════════════════════════════════════════
  // 3. CAIXA — Controle de turno / abertura e fechamento (RF06)
  // ═══════════════════════════════════════════════════════════════
  await db.execute(`
    CREATE TABLE IF NOT EXISTS caixa (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL,
      valor_fundo REAL DEFAULT 0,
      valor_fechamento REAL DEFAULT 0,
      observacao TEXT DEFAULT '',
      data_abertura TEXT DEFAULT (datetime('now', 'localtime')),
      data_fechamento TEXT,
      status TEXT NOT NULL DEFAULT 'aberto' CHECK(status IN ('aberto', 'fechado')),
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    )
  `);

  // ═══════════════════════════════════════════════════════════════
  // 4. VENDAS — Cada venda finalizada (RF04 + RF05)
  // ═══════════════════════════════════════════════════════════════
  await db.execute(`
    CREATE TABLE IF NOT EXISTS vendas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      caixa_id INTEGER NOT NULL,
      usuario_id INTEGER NOT NULL,
      forma_pagamento TEXT NOT NULL CHECK(
        forma_pagamento IN ('dinheiro','credito','debito','pix','va','vr')
      ),
      status TEXT NOT NULL DEFAULT 'ativa' CHECK(status IN ('ativa','cancelada')),
      total REAL NOT NULL DEFAULT 0,
      desconto REAL DEFAULT 0,
      desconto_tipo TEXT DEFAULT 'valor' CHECK(desconto_tipo IN ('percentual','valor')),
      valor_recebido REAL DEFAULT 0,
      troco REAL DEFAULT 0,
      criado_em TEXT DEFAULT (datetime('now', 'localtime')),
      finalizado_em TEXT DEFAULT (datetime('now', 'localtime')),
      FOREIGN KEY (caixa_id) REFERENCES caixa(id),
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    )
  `);

  // ═══════════════════════════════════════════════════════════════
  // 5. ITENS_VENDA — Produtos individuais de cada venda
  // ═══════════════════════════════════════════════════════════════
  await db.execute(`
    CREATE TABLE IF NOT EXISTS itens_venda (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      venda_id INTEGER NOT NULL,
      produto_id INTEGER,
      ean TEXT NOT NULL,
      nome TEXT NOT NULL,
      tipo TEXT DEFAULT 'UN',
      quantidade REAL NOT NULL DEFAULT 1,
      preco_unitario REAL NOT NULL DEFAULT 0,
      preco_total REAL NOT NULL DEFAULT 0,
      criado_em TEXT DEFAULT (datetime('now', 'localtime')),
      FOREIGN KEY (venda_id) REFERENCES vendas(id),
      FOREIGN KEY (produto_id) REFERENCES produtos(id)
    )
  `);

  // ═══════════════════════════════════════════════════════════════
  // 6. LOG_SISTEMA — Auditoria de eventos importantes
  // ═══════════════════════════════════════════════════════════════
  await db.execute(`
    CREATE TABLE IF NOT EXISTS log_sistema (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER,
      acao TEXT NOT NULL,
      descricao TEXT DEFAULT '',
      criado_em TEXT DEFAULT (datetime('now', 'localtime')),
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    )
  `);

  return db;
}
