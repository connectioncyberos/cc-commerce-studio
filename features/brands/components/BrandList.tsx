import { EmptyState } from "@/components/ui";
import type { Brand } from "../types/brand.types";
import { BrandCard } from "./BrandCard";

type BrandListProps = {
  brands: Brand[];
};

export function BrandList({ brands }: BrandListProps) {
  if (brands.length === 0) {
    return (
      <EmptyState
        title="Nenhuma marca encontrada"
        description="Cadastre sua primeira marca para dar identidade e tom de voz aos seus produtos."
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {brands.map((brand) => (
        <BrandCard key={brand.id} brand={brand} />
      ))}
    </div>
  );
}
