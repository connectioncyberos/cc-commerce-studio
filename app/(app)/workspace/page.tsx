import { PageHeader } from "@/components/ui";
import {
  WorkspaceForm,
  WorkspaceList,
  WorkspaceToolbar,
} from "@/features/workspace";

export default function WorkspacePage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <PageHeader
        title="Workspace"
        description="Gerencie os workspaces do ConnectionCyber Commerce Studio."
      />

      <WorkspaceToolbar />

      <WorkspaceForm />

      <WorkspaceList workspaces={[]} />
    </div>
  );
}