-- SPC-0006: modulo Video Script Engine (CS-012)
-- Ver cc-engineering-framework/artifacts/specifications/0006-video-script-engine.md

create table if not exists public.video_scripts (
  id           uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  offer_id     uuid not null references public.offers(id) on delete cascade,
  title        text not null,
  script       text,
  status       text not null default 'draft' check (status in ('draft', 'generated')),
  prompt_id    text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists idx_video_scripts_workspace_id on public.video_scripts(workspace_id);
create index if not exists idx_video_scripts_offer_id on public.video_scripts(offer_id);

alter table public.video_scripts enable row level security;

create policy "video_scripts_member_all"
  on public.video_scripts for all
  using (
    exists (
      select 1 from public.workspace_members
      where workspace_members.workspace_id = video_scripts.workspace_id
        and workspace_members.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.workspace_members
      where workspace_members.workspace_id = video_scripts.workspace_id
        and workspace_members.user_id = auth.uid()
    )
  );
