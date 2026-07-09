type PageHeaderProps = {
  title: string;
  description?: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-6">
      <h1 className="text-3xl font-bold leading-tight text-neutral-100">
        {title}
      </h1>

      {description && (
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-neutral-400">
          {description}
        </p>
      )}
    </header>
  );
}