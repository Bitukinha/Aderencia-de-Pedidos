# Indicador de Aderência

Painel para acompanhamento de pedidos e atrasos — Nutrimilho / Novaes Tech.

Repositório: [github.com/Bitukinha/Aderencia-de-Pedidos](https://github.com/Bitukinha/Aderencia-de-Pedidos)

## Como rodar localmente

Requisitos: Node.js 18+ e npm.

```sh
git clone https://github.com/Bitukinha/Aderencia-de-Pedidos.git
cd Aderencia-de-Pedidos
npm install
cp .env.example .env
# Edite .env com suas credenciais Supabase
npm run dev
```

Acesse `http://localhost:8080`.

## Variáveis de ambiente

Este projeto usa **Vite** — o prefixo correto é `VITE_`, não `NEXT_PUBLIC_`:

| Variável | Descrição |
|---|---|
| `VITE_SUPABASE_URL` | URL do projeto Supabase |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Chave publishable (anon) do Supabase |
| `VITE_ADMIN_EMAILS` | E-mails admin separados por vírgula |

## Supabase

1. Crie um projeto em [supabase.com](https://supabase.com)
2. Execute o SQL em `supabase/migrations/20260305120000_create_delayed_orders.sql` no **SQL Editor** do painel Supabase
3. Configure autenticação (e-mail/senha) e crie usuários admin

## Deploy no Vercel

1. Importe o repositório GitHub no [Vercel](https://vercel.com)
2. Adicione as variáveis `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` e `VITE_ADMIN_EMAILS`
3. Deploy automático a cada push na branch `main`

Ou via CLI:

```sh
vercel --prod
```

## Tecnologias

- Vite + React + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (auth + banco)
- Recharts, jsPDF
