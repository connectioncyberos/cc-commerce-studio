import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  CreateProductInput,
  Product,
  UpdateProductInput,
} from "../types/product.types";

export async function listProducts(
  supabase: SupabaseClient,
  workspaceId: string,
): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function getProductById(
  supabase: SupabaseClient,
  id: string,
): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Diferente de `createWorkspace`, aqui o insert pode pedir a linha de volta
 * (`select().single()`) com segurança: a política `products_member_all`
 * depende de `workspace_members`, que já existe antes de qualquer produto
 * ser criado — não há o problema de "visibilidade" resolvido em SPC-0001.
 */
export async function createProduct(
  supabase: SupabaseClient,
  input: CreateProductInput & { id: string },
): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .insert(input)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateProduct(
  supabase: SupabaseClient,
  id: string,
  input: UpdateProductInput,
): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .update(input)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteProduct(
  supabase: SupabaseClient,
  id: string,
): Promise<void> {
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
