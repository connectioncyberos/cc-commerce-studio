import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-md border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm text-neutral-100 outline-none placeholder:text-neutral-500 focus:border-emerald-500 ${className}`}
      {...props}
    />
  );
}