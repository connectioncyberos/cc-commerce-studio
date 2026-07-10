import type { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className = "", ...props }: SelectProps) {
  return (
    <select
      className={`w-full rounded-md border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm text-neutral-100 outline-none focus:border-emerald-500 ${className}`}
      {...props}
    />
  );
}
