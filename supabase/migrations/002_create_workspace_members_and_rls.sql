-- SPC-0001: workspace_members + RLS multi-tenant
-- Ver cc-engineering-framework/artifacts/specifications/0001-workspace-persistence.md

create table if not exists public.workspace_members (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'owner' check (role in ('owner', 'member')),
  created_at timestamptz not null default now(),
  unique (workspace_id, user_id)
);

create index if not exists idx_workspace_members_workspace_id on public.workspace_members(workspace_id);
create index if not exists idx_workspace_members_user_id on public.workspace_members(user_id);

-- Habilita RLS nas tabelas centrais.
-- Atenção: linhas criadas antes desta migration (sem workspace_members
-- correspondente) ficam inacessíveis a partir daqui.
alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.products enable row level security;
alter table public.projects enable row level security;
alter table public.assets enable row level security;

-- workspace_members
create policy "workspace_members_select_own"
  on public.workspace_members for select
  using (user_id = auth.uid());

create policy "workspace_members_insert_self"
  on public.workspace_members for insert
  with check (user_id = auth.uid());

create policy "workspace_members_delete_owner"
  on public.workspace_members for delete
  using (
    user_id = auth.uid()
    or exists (
      select 1 from public.workspace_members owner_check
      where owner_check.workspace_id = workspace_members.workspace_id
        and owner_check.user_id = auth.uid()
        and owner_check.role = 'owner'
    )
  );

-- workspaces
create policy "workspaces_select_member"
  on public.workspaces for select
  using (
    exists (
      select 1 from public.workspace_members
      where workspace_members.workspace_id = workspaces.id
        and workspace_members.user_id = auth.uid()
    )
  );

create policy "workspaces_insert_authenticated"
  on public.workspaces for insert
  with check (auth.uid() is not null);

create policy "workspaces_update_member"
  on public.workspaces for update
  using (
    exists (
      select 1 from public.workspace_members
      where workspace_members.workspace_id = workspaces.id
        and workspace_members.user_id = auth.uid()
    )
  );

create policy "workspaces_delete_owner"
  on public.workspaces for delete
  using (
    exists (
      select 1 from public.workspace_members
      where workspace_members.workspace_id = workspaces.id
        and workspace_members.user_id = auth.uid()
        and workspace_members.role = 'owner'
    )
  );

-- products
create policy "products_member_all"
  on public.products for all
  using (
    exists (
      select 1 from public.workspace_members
      where workspace_members.workspace_id = products.workspace_id
        and workspace_members.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.workspace_members
      where workspace_members.workspace_id = products.workspace_id
        and workspace_members.user_id = auth.uid()
    )
  );

-- projects
create policy "projects_member_all"
  on public.projects for all
  using (
    exists (
      select 1 from public.workspace_members
      where workspace_members.workspace_id = projects.workspace_id
        and workspace_members.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.workspace_members
      where workspace_members.workspace_id = projects.workspace_id
        and workspace_members.user_id = auth.uid()
    )
  );

-- assets
create policy "assets_member_all"
  on public.assets for all
  using (
    exists (
      select 1 from public.workspace_members
      where workspace_members.workspace_id = assets.workspace_id
        and workspace_members.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.workspace_members
      where workspace_members.workspace_id = assets.workspace_id
        and workspace_members.user_id = auth.uid()
    )
  );
