import Link from "next/link";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/workspace", label: "Workspace" },
  { href: "/products", label: "Produtos" },
  { href: "/offers", label: "Ofertas" },
  { href: "/assets", label: "Assets" },
  { href: "/landing-pages", label: "Landing Pages" },
];

export function Sidebar() {
  return (
    <aside className="min-h-screen w-64 border-r border-neutral-800 bg-neutral-950 px-4 py-6">
      <Link href="/dashboard" className="block">
        <img src="/logo.png" alt="ConnectionCyber" className="h-8 w-auto" />
      </Link>

      <nav className="mt-8 flex flex-col gap-2 text-sm">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-md px-3 py-2 text-neutral-400 hover:bg-neutral-900 hover:text-emerald-400"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}