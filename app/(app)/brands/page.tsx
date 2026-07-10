import { PageHeader, Button, EmptyState } from "@/components/ui";
import { BrandForm, BrandList, listBrandsQuery } from "@/features/brands";
import { listWorkspacesQuery } from "@/features/workspace";
import { createClient } from "@/lib/supabase/server";

export default async function BrandsPage() {
  const supabase = createClient();
  const workspaces = await listWorkspacesQuery(supabase);

  if (workspaces.length === 0) {
    return (
      <div className="flex w-full flex-col gap-6">
        <PageHeader
          title="Marcas"
          description="Gerencie as marcas do ConnectionCyber Commerce Studio."
        />

        <EmptyState
          title="Nenhum workspace encontrado"
          description="Crie um workspace antes de cadastrar marcas."
        />
      </div>
    );
  }

  const activeWorkspace = workspaces[0];
  const brands = await listBrandsQuery(supabase, activeWorkspace.id);

  return (
    <div className="flex w-full flex-col gap-6">
      <PageHeader
        title="Marcas"
        description={`Gerencie as marcas do workspace "${activeWorkspace.name}".`}
        action={<Button type="button">Nova Marca</Button>}
      />

      <BrandForm workspaceId={activeWorkspace.id} />

      <BrandList brands={brands} />
    </div>
  );
}
