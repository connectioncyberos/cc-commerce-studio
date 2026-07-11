import { PageHeader, Button, EmptyState } from "@/components/ui";
import {
  LandingPageForm,
  LandingPageList,
  listLandingPagesQuery,
} from "@/features/landing-pages";
import { listOffersQuery } from "@/features/offer-engine";
import { listWorkspacesQuery } from "@/features/workspace";
import { createClient } from "@/lib/supabase/server";

export default async function LandingPagesPage() {
  const supabase = createClient();
  const workspaces = await listWorkspacesQuery(supabase);

  if (workspaces.length === 0) {
    return (
      <div className="flex w-full flex-col gap-6">
        <PageHeader
          title="Landing Pages"
          description="Gerencie as landing pages do ConnectionCyber Commerce Studio."
        />

        <EmptyState
          title="Nenhum workspace encontrado"
          description="Crie um workspace antes de cadastrar landing pages."
        />
      </div>
    );
  }

  const activeWorkspace = workspaces[0];
  const [landingPages, offers] = await Promise.all([
    listLandingPagesQuery(supabase, activeWorkspace.id),
    listOffersQuery(supabase, activeWorkspace.id),
  ]);

  return (
    <div className="flex w-full flex-col gap-6">
      <PageHeader
        title="Landing Pages"
        description={`Gerencie as landing pages do workspace "${activeWorkspace.name}".`}
        action={<Button type="button">Nova Landing Page</Button>}
      />

      <LandingPageForm workspaceId={activeWorkspace.id} offers={offers} />

      <LandingPageList landingPages={landingPages} />
    </div>
  );
}
