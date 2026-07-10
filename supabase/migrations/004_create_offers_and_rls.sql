-- SPC-0004: modulo Offer Engine (CS-010)
-- Ver cc-engineering-framework/artifacts/specifications/0004-offer-engine.md

create table if not exists public.offers (
  id           uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  product_id   uuid not null references public.products(id) on delete cascade,
  brand_id     uuid references public.brands(id) on delete set null,
  title        text not null,
  copy         text,
  status       text not null default 'draft' check (status in ('draft', 'generated', 'published')),
  prompt_id    text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists idx_offers_workspace_id on public.offers(workspace_id);
create index if not exists idx_offers_product_id on public.offers(product_id);
create index if not exists idx_offers_brand_id on public.offers(brand_id);

alter table public.offers enable row level security;

create policy "offers_member_all"
  on public.offers for all
  using (
    exists (
      select 1 from public.workspace_members
      where workspace_members.workspace_id = offers.workspace_id
        and workspace_members.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.workspace_members
      where workspace_members.workspace_id = offers.workspace_id
        and workspace_members.user_id = auth.uid()
    )
  );
