-- SPC-0005: modulo Landing Page Engine (CS-011)
-- Ver cc-engineering-framework/artifacts/specifications/0005-landing-page-engine.md

create table if not exists public.landing_pages (
  id           uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  offer_id     uuid not null references public.offers(id) on delete cascade,
  title        text not null,
  slug         text not null,
  content      text,
  status       text not null default 'draft' check (status in ('draft', 'published')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (slug)
);

create index if not exists idx_landing_pages_workspace_id on public.landing_pages(workspace_id);
create index if not exists idx_landing_pages_offer_id on public.landing_pages(offer_id);

alter table public.landing_pages enable row level security;

-- Membros do Workspace: acesso total (rascunho ou publicada).
create policy "landing_pages_member_all"
  on public.landing_pages for all
  using (
    exists (
      select 1 from public.workspace_members
      where workspace_members.workspace_id = landing_pages.workspace_id
        and workspace_members.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.workspace_members
      where workspace_members.workspace_id = landing_pages.workspace_id
        and workspace_members.user_id = auth.uid()
    )
  );

-- Publico (sem sessao): so linhas publicadas.
create policy "landing_pages_select_public_published"
  on public.landing_pages for select
  using (status = 'published');
