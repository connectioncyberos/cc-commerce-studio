"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { updateLandingPageMutation } from "../mutations";
import { landingPageSchema } from "../validations/landing-page.schema";

export async function updateLandingPageAction(id: string, input: unknown) {
  const parsedInput = landingPageSchema.partial().parse(input);

  const supabase = createClient();
  const landingPage = await updateLandingPageMutation(supabase, id, parsedInput);
  revalidatePath("/landing-pages");
  return landingPage;
}
