import type { SupabaseClient } from "@supabase/supabase-js";
import { updateOffer } from "../services/offer.service";
import type { UpdateOfferInput } from "../types/offer.types";

export async function updateOfferMutation(
  supabase: SupabaseClient,
  id: string,
  input: UpdateOfferInput,
) {
  return updateOffer(supabase, id, input);
}
