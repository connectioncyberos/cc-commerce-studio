import type { SupabaseClient } from "@supabase/supabase-js";
import { deleteOffer } from "../services/offer.service";

export async function deleteOfferMutation(supabase: SupabaseClient, id: string) {
  return deleteOffer(supabase, id);
}
