import { Button } from "@/components/ui";

export function WorkspaceToolbar() {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
          Commerce Studio
        </p>
        <h2 className="mt-1 text-xl font-semibold text-neutral-100">
          Workspaces
        </h2>
      </div>

      <Button type="button">Novo Workspace</Button>
    </div>
  );
}