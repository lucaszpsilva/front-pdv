import { getDatabase } from "./database";

export type DadosDaLoja = {
  nome: string;
  cnpj: string;
  telefone: string;
  email: string;
  logradouro: string;
  cidade: string;
  estado: string;
  cep: string;
};

export const buscarDadosDaLoja = async (): Promise<DadosDaLoja | null> => {
  const db = await getDatabase();
  const resultado = await db.select<DadosDaLoja[]>(
    "SELECT * FROM dados_loja WHERE id = 1;",
  );
  if (resultado.length === 0) {
    return null;
  }
  return resultado[0];
};

export const salvarDadosLoja = async (dados: DadosDaLoja): Promise<void> => {
  const db = await getDatabase();
  const existente = await buscarDadosDaLoja();
  if (existente === null) {
    await db.execute(
      "INSERT INTO dados_loja (nome, cnpj, telefone, email, logradouro, cidade, estado, cep) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [
        dados.nome,
        dados.cnpj,
        dados.telefone,
        dados.email,
        dados.logradouro,
        dados.cidade,
        dados.estado,
        dados.cep,
      ],
    );
    return;
  } else {
    await db.execute(
      `UPDATE dados_loja 
        SET nome = $1, cnpj = $2, telefone = $3, email = $4, logradouro = $5, cidade = $6, estado = $7, cep = $8
        WHERE id = 1`,
      [
        dados.nome,
        dados.cnpj,
        dados.telefone,
        dados.email,
        dados.logradouro,
        dados.cidade,
        dados.estado,
        dados.cep,
      ],
    );
  }
};
