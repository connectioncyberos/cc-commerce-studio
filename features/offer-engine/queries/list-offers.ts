import type { SupabaseClient } from "@supabase/supabase-js";
import { listOffers } from "../services/offer.service";

export async function listOffersQuery(supabase: SupabaseClient, workspaceId: string) {
  return listOffers(supabase, workspaceId);
}
