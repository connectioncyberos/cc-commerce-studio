import type { SupabaseClient } from "@supabase/supabase-js";
import { updateVideoScript } from "../services/video-script.service";
import type { UpdateVideoScriptInput } from "../types/video-script.types";

export async function updateVideoScriptMutation(
  supabase: SupabaseClient,
  id: string,
  input: UpdateVideoScriptInput,
) {
  return updateVideoScript(supabase, id, input);
}
