import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <section
      className={`rounded-md border border-neutral-800 bg-neutral-900 p-4 hover:border-emerald-500/50 ${className}`}
    >
      {children}
    </section>
  );
}