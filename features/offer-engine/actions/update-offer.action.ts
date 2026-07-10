"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { updateOfferMutation } from "../mutations";
import { offerSchema } from "../validations/offer.schema";

export async function updateOfferAction(id: string, input: unknown) {
  const parsedInput = offerSchema.partial().parse(input);

  const supabase = createClient();
  const offer = await updateOfferMutation(supabase, id, parsedInput);
  revalidatePath("/offers");
  return offer;
}
