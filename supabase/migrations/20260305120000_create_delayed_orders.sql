-- Tabela de pedidos atrasados para o Indicador de Aderência
create table if not exists public.delayed_orders (
  id bigint generated always as identity primary key,
  cliente text not null,
  produto text not null,
  quantidade text default '',
  "dataPrevista" text not null,
  "dataEntregue" text,
  "diasAtraso" integer default 0,
  motivo text default '',
  mes text not null,
  ano integer default 2026,
  segmento text,
  created_at timestamptz default now()
);

alter table public.delayed_orders enable row level security;

create policy "Leitura pública de pedidos"
  on public.delayed_orders for select
  using (true);

create policy "Inserção autenticada"
  on public.delayed_orders for insert
  to authenticated
  with check (true);

create policy "Atualização autenticada"
  on public.delayed_orders for update
  to authenticated
  using (true);

create policy "Exclusão autenticada"
  on public.delayed_orders for delete
  to authenticated
  using (true);
