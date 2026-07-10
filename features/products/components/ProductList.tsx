import { EmptyState } from "@/components/ui";
import type { Product } from "../types/product.types";
import { ProductCard } from "./ProductCard";

type ProductListProps = {
  products: Product[];
};

export function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
      <EmptyState
        title="Nenhum produto encontrado"
        description="Cadastre seu primeiro produto para começar a criar ofertas."
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
