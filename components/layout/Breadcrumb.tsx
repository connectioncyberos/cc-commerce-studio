
type BreadcrumbProps = {
  current: string;
};

export function Breadcrumb({ current }: BreadcrumbProps) {
  return (
    <div className="mb-6 text-sm text-neutral-500">
      Commerce Studio / <span className="text-neutral-300">{current}</span>
    </div>
  );
}