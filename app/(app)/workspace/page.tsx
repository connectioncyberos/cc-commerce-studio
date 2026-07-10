import { PageHeader, Button } from "@/components/ui";
import { WorkspaceForm, WorkspaceList, listWorkspacesQuery } from "@/features/workspace";
import { createClient } from "@/lib/supabase/server";

export default async function WorkspacePage() {
  const supabase = createClient();
  const workspaces = await listWorkspacesQuery(supabase);

  return (
    <div className="flex w-full flex-col gap-6">
      <PageHeader
        title="Workspace"
        description="Gerencie os workspaces do ConnectionCyber Commerce Studio."
        action={<Button type="button">Novo Workspace</Button>}
      />

      <WorkspaceForm />

      <WorkspaceList workspaces={workspaces} />
    </div>
  );
}
