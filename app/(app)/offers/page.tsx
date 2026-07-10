import { PageHeader, Button, EmptyState } from "@/components/ui";
import { OfferForm, OfferList, listOffersQuery } from "@/features/offer-engine";
import { listProductsQuery } from "@/features/products";
import { listBrandsQuery } from "@/features/brands";
import { listWorkspacesQuery } from "@/features/workspace";
import { createClient } from "@/lib/supabase/server";

export default async function OffersPage() {
  const supabase = createClient();
  const workspaces = await listWorkspacesQuery(supabase);

  if (workspaces.length === 0) {
    return (
      <div className="flex w-full flex-col gap-6">
        <PageHeader
          title="Ofertas"
          description="Gerencie as ofertas do ConnectionCyber Commerce Studio."
        />

        <EmptyState
          title="Nenhum workspace encontrado"
          description="Crie um workspace antes de cadastrar ofertas."
        />
      </div>
    );
  }

  const activeWorkspace = workspaces[0];
  const [offers, products, brands] = await Promise.all([
    listOffersQuery(supabase, activeWorkspace.id),
    listProductsQuery(supabase, activeWorkspace.id),
    listBrandsQuery(supabase, activeWorkspace.id),
  ]);

  return (
    <div className="flex w-full flex-col gap-6">
      <PageHeader
        title="Ofertas"
        description={`Gerencie as ofertas do workspace "${activeWorkspace.name}".`}
        action={<Button type="button">Nova Oferta</Button>}
      />

      <OfferForm workspaceId={activeWorkspace.id} products={products} brands={brands} />

      <OfferList offers={offers} />
    </div>
  );
}
