import type { FormaPagamento } from "./pagamento";

export type StatusVenda = "ativa" | "cancelada";
export type TipoDesconto = "valor" | "percentual";

export type Venda = {
  id?: number;
  caixa_id: number;
  usuario_id: number;
  forma_pagamento: FormaPagamento;
  status: StatusVenda;
  total: number;
  desconto: number;
  desconto_tipo: TipoDesconto;
  valor_recebido: number;
  troco: number;
  criado_em?: string;
  finalizado_em?: string;
};

export type ItemVenda = {
  id?: number;
  venda_id: number;
  produto_id: number;
  ean: string;
  nome: string;
  tipo: string;
  quantidade: number;
  preco_unitario: number;
  preco_total: number;
  criado_em?: string;
};

export type VendaComItens = Venda & {
  itens: ItemVenda[];
};
