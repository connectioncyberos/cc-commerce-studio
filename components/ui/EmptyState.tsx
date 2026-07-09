type EmptyStateProps = {
  title: string;
  description?: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-md border border-neutral-800 bg-neutral-900 p-6 text-center">
      <h2 className="text-base font-semibold text-neutral-100">{title}</h2>

      {description && (
        <p className="mt-2 text-sm leading-relaxed text-neutral-400">
          {description}
        </p>
      )}
    </div>
  );
}