-- Tabela de segmentos cadastráveis pelo usuário
create table if not exists public.segmentos (
  id bigint generated always as identity primary key,
  nome text not null unique,
  created_at timestamptz default now()
);

alter table public.segmentos enable row level security;

create policy "Leitura pública de segmentos"
  on public.segmentos for select
  using (true);

create policy "Inserção pública de segmentos"
  on public.segmentos for insert
  with check (true);

create policy "Exclusão pública de segmentos"
  on public.segmentos for delete
  using (true);

-- Semente com os segmentos padrão já usados no app
insert into public.segmentos (nome)
values ('Suínos'), ('Aves'), ('Bovinos'), ('Aquicultura'), ('Pet'), ('Humano'), ('Outros')
on conflict (nome) do nothing;

-- Remove a exigência de login para gerenciar pedidos: abre as políticas de
-- escrita da tabela delayed_orders para acesso público (sem autenticação)
drop policy if exists "Inserção autenticada" on public.delayed_orders;
drop policy if exists "Atualização autenticada" on public.delayed_orders;
drop policy if exists "Exclusão autenticada" on public.delayed_orders;

create policy "Inserção pública de pedidos"
  on public.delayed_orders for insert
  with check (true);

create policy "Atualização pública de pedidos"
  on public.delayed_orders for update
  using (true);

create policy "Exclusão pública de pedidos"
  on public.delayed_orders for delete
  using (true);
