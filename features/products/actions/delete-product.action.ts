"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { deleteProductMutation } from "../mutations";

export async function deleteProductAction(id: string) {
  const supabase = createClient();
  await deleteProductMutation(supabase, id);
  revalidatePath("/products");
}
