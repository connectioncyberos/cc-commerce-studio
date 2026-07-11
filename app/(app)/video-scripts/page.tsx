import { PageHeader, Button, EmptyState } from "@/components/ui";
import {
  VideoScriptForm,
  VideoScriptList,
  listVideoScriptsQuery,
} from "@/features/video-script-engine";
import { listOffersQuery } from "@/features/offer-engine";
import { listWorkspacesQuery } from "@/features/workspace";
import { createClient } from "@/lib/supabase/server";

export default async function VideoScriptsPage() {
  const supabase = createClient();
  const workspaces = await listWorkspacesQuery(supabase);

  if (workspaces.length === 0) {
    return (
      <div className="flex w-full flex-col gap-6">
        <PageHeader
          title="Roteiros de Vídeo"
          description="Gerencie os roteiros de vídeo do ConnectionCyber Commerce Studio."
        />

        <EmptyState
          title="Nenhum workspace encontrado"
          description="Crie um workspace antes de cadastrar roteiros de vídeo."
        />
      </div>
    );
  }

  const activeWorkspace = workspaces[0];
  const [videoScripts, offers] = await Promise.all([
    listVideoScriptsQuery(supabase, activeWorkspace.id),
    listOffersQuery(supabase, activeWorkspace.id),
  ]);

  return (
    <div className="flex w-full flex-col gap-6">
      <PageHeader
        title="Roteiros de Vídeo"
        description={`Gerencie os roteiros de vídeo do workspace "${activeWorkspace.name}".`}
        action={<Button type="button">Novo Roteiro</Button>}
      />

      <VideoScriptForm workspaceId={activeWorkspace.id} offers={offers} />

      <VideoScriptList videoScripts={videoScripts} />
    </div>
  );
}
