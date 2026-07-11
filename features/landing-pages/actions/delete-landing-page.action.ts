"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { deleteLandingPageMutation } from "../mutations";

export async function deleteLandingPageAction(id: string) {
  const supabase = createClient();
  await deleteLandingPageMutation(supabase, id);
  revalidatePath("/landing-pages");
}
