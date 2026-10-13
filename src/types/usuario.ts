export type TipoUsuario = "admin" | "operador";

export type Usuario = {
  id?: number;
  nome: string;
  login: string;
  senha: string;
  tipo: TipoUsuario;
  ativo?: number;
  criado_em?: string;
  atualizado_em?: string;
};
