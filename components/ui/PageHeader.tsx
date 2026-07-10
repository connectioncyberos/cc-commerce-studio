import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-baseline gap-3">
        <h1 className="text-3xl font-bold leading-tight text-neutral-100">
          {title}
        </h1>

        {description && (
          <p className="text-xl font-semibold text-neutral-400">
            {description}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}
