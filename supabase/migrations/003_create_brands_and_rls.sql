-- SPC-0003: módulo Brands (CS-009)
-- Ver cc-engineering-framework/artifacts/specifications/0003-brands.md

create table if not exists public.brands (
  id            uuid primary key default gen_random_uuid(),
  workspace_id  uuid not null references public.workspaces(id) on delete cascade,
  name          text not null,
  slug          text not null,
  description   text,
  tone_of_voice text,
  logo_url      text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  unique (workspace_id, slug)
);

create index if not exists idx_brands_workspace_id on public.brands(workspace_id);

-- Migração aditiva: produtos existentes continuam válidos (brand_id nulo).
alter table public.products
  add column if not exists brand_id uuid references public.brands(id) on delete set null;

create index if not exists idx_products_brand_id on public.products(brand_id);

alter table public.brands enable row level security;

create policy "brands_member_all"
  on public.brands for all
  using (
    exists (
      select 1 from public.workspace_members
      where workspace_members.workspace_id = brands.workspace_id
        and workspace_members.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.workspace_members
      where workspace_members.workspace_id = brands.workspace_id
        and workspace_members.user_id = auth.uid()
    )
  );
