import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase environment variables are not configured yet.");
}

/**
 * Cliente Supabase para uso em Server Components e Server Actions.
 * Lê/escreve a sessão via cookies (next/headers), respeitando RLS
 * com base no usuário autenticado (auth.uid()).
 *
 * Next.js 14: `cookies()` é síncrono (ver ADR-0001).
 */
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    supabaseUrl ?? "https://placeholder.supabase.co",
    supabaseAnonKey ?? "placeholder-anon-key",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Chamado a partir de um Server Component sem permissão de escrita
            // de cookies. O middleware.ts cuida de renovar a sessão nesses casos.
          }
        },
      },
    },
  );
}
