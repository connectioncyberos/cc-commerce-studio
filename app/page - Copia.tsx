export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-cyan-300">ConnectionCyber</p>
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">Commerce Studio</h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          Transforme produtos em ativos digitais prontos para venda com Inteligência Artificial.
        </p>
        <div className="mt-10 rounded-xl border border-slate-800 bg-slate-900/70 px-6 py-4 text-sm text-slate-300">
          <strong className="text-white">Sprint 001:</strong> Bootstrap técnico validado.
        </div>
      </section>
    </main>
  );
}
