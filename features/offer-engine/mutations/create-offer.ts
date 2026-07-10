import type { SupabaseClient } from "@supabase/supabase-js";
import { createOffer } from "../services/offer.service";
import type { CreateOfferInput } from "../types/offer.types";

export async function createOfferMutation(
  supabase: SupabaseClient,
  input: CreateOfferInput & { id: string },
) {
  return createOffer(supabase, input);
}
