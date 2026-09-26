export default function CategoryTag({ children, size = "sm" }) {
  const sizeClasses =
    size === "lg" ? "px-3.5 py-1.5 text-xs" : "px-2.5 py-1 text-[10px]";
  return (
    <span
      className={`inline-flex items-center rounded-full border border-border bg-surface-2 font-display font-semibold uppercase tracking-wider text-muted ${sizeClasses}`}
    >
      {children}
    </span>
  );
}
