import { notFound } from "next/navigation";
import { getPublishedLandingPageQuery } from "@/features/landing-pages";
import { createClient } from "@/lib/supabase/server";

type LandingPagePageProps = {
  params: { slug: string };
};

/**
 * SPC-0005: rota pública, fora do grupo (app) — sem AppShell, sem checagem
 * de login. Funciona sem sessão porque a política de RLS
 * `landing_pages_select_public_published` não depende de auth.uid(), só de
 * status = 'published'.
 */
export default async function PublicLandingPagePage({
  params,
}: LandingPagePageProps) {
  const supabase = createClient();
  const landingPage = await getPublishedLandingPageQuery(supabase, params.slug);

  if (!landingPage) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-16 text-neutral-100">
      <h1 className="text-3xl font-bold leading-tight">{landingPage.title}</h1>

      {landingPage.content && (
        <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-neutral-300">
          {landingPage.content}
        </p>
      )}
    </main>
  );
}
