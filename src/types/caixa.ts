export type StatusCaixa = "aberto" | "fechado";

export type Caixa = {
  id?: number;
  usuario_id: number;
  valor_fundo: number;
  valor_fechamento: number;
  observacao: string;
  data_abertura?: string;
  data_fechamento?: string | null;
  status: StatusCaixa;
};