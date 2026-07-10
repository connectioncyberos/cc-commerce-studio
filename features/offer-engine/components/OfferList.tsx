import { EmptyState } from "@/components/ui";
import type { Offer } from "../types/offer.types";
import { OfferCard } from "./OfferCard";

type OfferListProps = {
  offers: Offer[];
};

export function OfferList({ offers }: OfferListProps) {
  if (offers.length === 0) {
    return (
      <EmptyState
        title="Nenhuma oferta encontrada"
        description="Crie sua primeira oferta a partir de um produto cadastrado."
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
}
