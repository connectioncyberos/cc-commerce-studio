"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { updateProductMutation } from "../mutations";
import { productSchema } from "../validations/product.schema";

export async function updateProductAction(id: string, input: unknown) {
  const parsedInput = productSchema.partial().parse(input);

  const supabase = createClient();
  const product = await updateProductMutation(supabase, id, parsedInput);
  revalidatePath("/products");
  return product;
}
