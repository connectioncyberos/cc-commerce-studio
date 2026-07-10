"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { deleteBrandMutation } from "../mutations";

export async function deleteBrandAction(id: string) {
  const supabase = createClient();
  await deleteBrandMutation(supabase, id);
  revalidatePath("/brands");
}
