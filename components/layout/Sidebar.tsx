import Link from "next/link";
import type { SVGProps } from "react";
import { signOutAction } from "@/features/auth";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: IconGrid },
  { href: "/workspace", label: "Workspace", icon: IconFolder },
  { href: "/products", label: "Produtos", icon: IconBox },
  { href: "/brands", label: "Marcas", icon: IconBadge },
  { href: "/offers", label: "Ofertas", icon: IconTag },
  { href: "/assets", label: "Assets", icon: IconImage },
  { href: "/landing-pages", label: "Landing Pages", icon: IconFile },
];

type SidebarProps = {
  userEmail?: string;
};

export function Sidebar({ userEmail }: SidebarProps) {
  const initials = userEmail ? userEmail.slice(0, 2).toUpperCase() : "CC";

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-neutral-800 bg-neutral-950 px-4 pb-6 pt-5">
      <div className="text-center">
        <Link href="/dashboard" className="mx-auto block w-fit">
          <img src="/logo.png" alt="ConnectionCyber" className="h-8 w-auto" />
        </Link>
        <p className="mt-0.5 text-xl font-semibold leading-none text-neutral-100">
          Commerce Studio
        </p>
      </div>

      <nav className="mt-8 flex flex-col gap-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-xl font-semibold text-neutral-400 hover:bg-neutral-900 hover:text-emerald-400"
          >
            <link.icon className="h-4 w-4 shrink-0" />
            {link.label}
          </Link>
        ))}
      </nav>

      {userEmail && (
        <div className="mt-auto border-t border-neutral-800 pt-4">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-[10px] font-semibold text-emerald-400">
              {initials}
            </div>

            <p className="max-w-full truncate text-base font-semibold text-neutral-100">
              {userEmail}
            </p>

            <div className="flex w-full items-center justify-between gap-2">
              <div className="rounded-md border border-neutral-800 px-3 py-1 text-xs text-neutral-400">
                MVP
              </div>

              <form action={signOutAction}>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-md border border-neutral-800 px-3 py-1 text-xs text-neutral-400 hover:border-emerald-500 hover:text-emerald-400"
                >
                  <IconLogout className="h-3.5 w-3.5" />
                  Sair
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

function IconGrid(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function IconFolder(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
    </svg>
  );
}

function IconBox(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
      <path d="M3 8l9 5 9-5" />
      <path d="M12 13v8" />
    </svg>
  );
}

function IconBadge(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <circle cx="12" cy="8" r="5" />
      <path d="M8.5 12.5 7 21l5-3 5 3-1.5-8.5" />
    </svg>
  );
}

function IconTag(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M20 12 12.5 19.5a2 2 0 0 1-2.8 0L4 13.8V4h9.8L20 10.2a2 2 0 0 1 0 2.8Z" />
      <circle cx="8.5" cy="8.5" r="1.2" />
    </svg>
  );
}

function IconImage(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="9" cy="9" r="1.5" />
      <path d="m3 17 5-5 4 4 3-3 6 6" />
    </svg>
  );
}

function IconFile(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-5Z" />
      <path d="M14 3v5h6" />
    </svg>
  );
}

function IconLogout(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </svg>
  );
}
