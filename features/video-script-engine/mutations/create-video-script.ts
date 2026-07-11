import type { SupabaseClient } from "@supabase/supabase-js";
import { createVideoScript } from "../services/video-script.service";
import type { CreateVideoScriptInput } from "../types/video-script.types";

export async function createVideoScriptMutation(
  supabase: SupabaseClient,
  input: CreateVideoScriptInput & { id: string },
) {
  return createVideoScript(supabase, input);
}
