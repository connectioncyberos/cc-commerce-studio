import { PageHeader } from "@/components/ui";
import {
  WorkspaceForm,
  WorkspaceList,
  WorkspaceToolbar,
} from "@/features/workspace";

export default function WorkspacePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
      <PageHeader
        title="Workspace"
        description="Gerencie os workspaces do ConnectionCyber Commerce Studio."
      />

      <WorkspaceToolbar />

      <WorkspaceForm />

      <WorkspaceList workspaces={[]} />
    </main>
  );
}