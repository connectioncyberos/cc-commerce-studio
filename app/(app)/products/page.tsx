import { PageHeader, Button, EmptyState } from "@/components/ui";
import { ProductForm, ProductList, listProductsQuery } from "@/features/products";
import { listWorkspacesQuery } from "@/features/workspace";
import { createClient } from "@/lib/supabase/server";

export default async function ProductsPage() {
  const supabase = createClient();
  const workspaces = await listWorkspacesQuery(supabase);

  if (workspaces.length === 0) {
    return (
      <div className="flex w-full flex-col gap-6">
        <PageHeader
          title="Produtos"
          description="Gerencie os produtos do ConnectionCyber Commerce Studio."
        />

        <EmptyState
          title="Nenhum workspace encontrado"
          description="Crie um workspace antes de cadastrar produtos."
        />
      </div>
    );
  }

  const activeWorkspace = workspaces[0];
  const products = await listProductsQuery(supabase, activeWorkspace.id);

  return (
    <div className="flex w-full flex-col gap-6">
      <PageHeader
        title="Produtos"
        description={`Gerencie os produtos do workspace "${activeWorkspace.name}".`}
        action={<Button type="button">Novo Produto</Button>}
      />

      <ProductForm workspaceId={activeWorkspace.id} />

      <ProductList products={products} />
    </div>
  );
}
