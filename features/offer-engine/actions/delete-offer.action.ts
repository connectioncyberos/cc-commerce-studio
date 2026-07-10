"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { deleteOfferMutation } from "../mutations";

export async function deleteOfferAction(id: string) {
  const supabase = createClient();
  await deleteOfferMutation(supabase, id);
  revalidatePath("/offers");
}
