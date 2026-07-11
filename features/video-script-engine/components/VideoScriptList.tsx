import { EmptyState } from "@/components/ui";
import type { VideoScript } from "../types/video-script.types";
import { VideoScriptCard } from "./VideoScriptCard";

type VideoScriptListProps = {
  videoScripts: VideoScript[];
};

export function VideoScriptList({ videoScripts }: VideoScriptListProps) {
  if (videoScripts.length === 0) {
    return (
      <EmptyState
        title="Nenhum roteiro encontrado"
        description="Crie seu primeiro roteiro de vídeo a partir de uma oferta cadastrada."
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {videoScripts.map((videoScript) => (
        <VideoScriptCard key={videoScript.id} videoScript={videoScript} />
      ))}
    </div>
  );
}
