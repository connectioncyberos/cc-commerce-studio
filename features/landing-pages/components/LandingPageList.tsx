import { EmptyState } from "@/components/ui";
import type { LandingPage } from "../types/landing-page.types";
import { LandingPageCard } from "./LandingPageCard";

type LandingPageListProps = {
  landingPages: LandingPage[];
};

export function LandingPageList({ landingPages }: LandingPageListProps) {
  if (landingPages.length === 0) {
    return (
      <EmptyState
        title="Nenhuma landing page encontrada"
        description="Crie sua primeira landing page a partir de uma oferta cadastrada."
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {landingPages.map((landingPage) => (
        <LandingPageCard key={landingPage.id} landingPage={landingPage} />
      ))}
    </div>
  );
}
