export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 py-8 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="ConnectionCyber" className="mb-6 h-10 w-auto object-contain" />

        <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-neutral-500">
          ConnectionCyber
        </p>

        <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-neutral-100 md:text-6xl">
          Commerce Studio
        </h1>

        <p className="mt-5 max-w-3xl text-base leading-relaxed text-neutral-400 md:text-lg">
          Transforme produtos em ativos digitais prontos para venda com Inteligência Artificial.
        </p>

        <div className="mt-7 rounded-md border border-neutral-800 bg-neutral-900 p-4 text-sm text-neutral-400 hover:border-emerald-500/50">
          <strong className="text-neutral-100">Sprint 001:</strong> Bootstrap técnico alinhado ao padrão visual ConnectionCyber.
        </div>
      </section>
    </main>
  );
}
