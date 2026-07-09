import type { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className = "", ...props }: TextareaProps) {
  return (
    <textarea
      className={`w-full rounded-md border border-neutral-800 bg-neutral-900 px-4 py-2 text-sm text-neutral-100 outline-none placeholder:text-neutral-500 focus:border-emerald-500 ${className}`}
      {...props}
    />
  );
}