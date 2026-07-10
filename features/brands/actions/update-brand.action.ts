"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { updateBrandMutation } from "../mutations";
import { brandSchema } from "../validations/brand.schema";

export async function updateBrandAction(id: string, input: unknown) {
  const parsedInput = brandSchema.partial().parse(input);

  const supabase = createClient();
  const brand = await updateBrandMutation(supabase, id, parsedInput);
  revalidatePath("/brands");
  return brand;
}
