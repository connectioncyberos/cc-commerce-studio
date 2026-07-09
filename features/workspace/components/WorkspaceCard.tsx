import { Card } from "@/components/ui";
import type { Workspace } from "../types/workspace.types";

type WorkspaceCardProps = {
  workspace: Workspace;
};

export function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  return (
    <Card>
      <h3 className="text-base font-semibold text-neutral-100">
        {workspace.name}
      </h3>

      <p className="mt-1 text-sm text-neutral-500">/{workspace.slug}</p>

      {workspace.description && (
        <p className="mt-3 text-sm leading-relaxed text-neutral-400">
          {workspace.description}
        </p>
      )}
    </Card>
  );
}