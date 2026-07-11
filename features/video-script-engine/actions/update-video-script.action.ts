"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { updateVideoScriptMutation } from "../mutations";
import { videoScriptSchema } from "../validations/video-script.schema";

export async function updateVideoScriptAction(id: string, input: unknown) {
  const parsedInput = videoScriptSchema.partial().parse(input);

  const supabase = createClient();
  const videoScript = await updateVideoScriptMutation(supabase, id, parsedInput);
  revalidatePath("/video-scripts");
  return videoScript;
}
