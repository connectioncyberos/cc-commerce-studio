import { EmptyState } from "@/components/ui";
import type { Workspace } from "../types/workspace.types";
import { WorkspaceCard } from "./WorkspaceCard";

type WorkspaceListProps = {
  workspaces: Workspace[];
};

export function WorkspaceList({ workspaces }: WorkspaceListProps) {
  if (workspaces.length === 0) {
    return (
      <EmptyState
        title="Nenhum workspace encontrado"
        description="Crie seu primeiro workspace para começar a organizar produtos, ofertas e ativos digitais."
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {workspaces.map((workspace) => (
        <WorkspaceCard key={workspace.id} workspace={workspace} />
      ))}
    </div>
  );
}