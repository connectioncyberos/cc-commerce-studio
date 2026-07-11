import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  CreateLandingPageInput,
  LandingPage,
  UpdateLandingPageInput,
} from "../types/landing-page.types";

export async function listLandingPages(
  supabase: SupabaseClient,
  workspaceId: string,
): Promise<LandingPage[]> {
  const { data, error } = await supabase
    .from("landing_pages")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getLandingPageById(
  supabase: SupabaseClient,
  id: string,
): Promise<LandingPage | null> {
  const { data, error } = await supabase
    .from("landing_pages")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Usada pela rota pública (app/lp/[slug]/page.tsx). Depende só da política
 * `landing_pages_select_public_published` — sem sessão, ainda funciona
 * porque a policy não exige auth.uid(), só status = 'published'.
 */
export async function getPublishedLandingPageBySlug(
  supabase: SupabaseClient,
  slug: string,
): Promise<LandingPage | null> {
  const { data, error } = await supabase
    .from("landing_pages")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Mesmo raciocínio já validado em CS-008/009/010: a política de membro
 * depende só de `workspace_members`, que já existe antes de qualquer
 * landing page ser criada — o insert pode pedir a linha de volta com
 * segurança.
 */
export async function createLandingPage(
  supabase: SupabaseClient,
  input: CreateLandingPageInput & { id: string },
): Promise<LandingPage> {
  const { data, error } = await supabase
    .from("landing_pages")
    .insert(input)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateLandingPage(
  supabase: SupabaseClient,
  id: string,
  input: UpdateLandingPageInput,
): Promise<LandingPage> {
  const { data, error } = await supabase
    .from("landing_pages")
    .update(input)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteLandingPage(
  supabase: SupabaseClient,
  id: string,
): Promise<void> {
  const { error } = await supabase.from("landing_pages").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
