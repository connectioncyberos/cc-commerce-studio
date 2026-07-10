import type { SupabaseClient } from "@supabase/supabase-js";
import type { Brand, CreateBrandInput, UpdateBrandInput } from "../types/brand.types";

export async function listBrands(
  supabase: SupabaseClient,
  workspaceId: string,
): Promise<Brand[]> {
  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getBrandById(
  supabase: SupabaseClient,
  id: string,
): Promise<Brand | null> {
  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Assim como `createProduct` (CS-008), o insert pode pedir a linha de volta
 * com segurança: a política `brands_member_all` depende só de
 * `workspace_members`, que já existe antes de qualquer Brand ser criada.
 */
export async function createBrand(
  supabase: SupabaseClient,
  input: CreateBrandInput & { id: string },
): Promise<Brand> {
  const { data, error } = await supabase
    .from("brands")
    .insert(input)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateBrand(
  supabase: SupabaseClient,
  id: string,
  input: UpdateBrandInput,
): Promise<Brand> {
  const { data, error } = await supabase
    .from("brands")
    .update(input)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteBrand(supabase: SupabaseClient, id: string): Promise<void> {
  const { error } = await supabase.from("brands").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
