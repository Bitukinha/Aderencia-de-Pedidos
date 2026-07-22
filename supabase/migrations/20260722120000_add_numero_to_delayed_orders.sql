-- Adiciona o número do pedido à tabela de pedidos, com "SN" (Sem Número) como padrão
alter table public.delayed_orders
  add column if not exists numero text not null default 'SN';
