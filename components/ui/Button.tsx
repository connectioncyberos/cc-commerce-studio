import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-md border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-100 hover:border-emerald-500 hover:text-emerald-400 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}