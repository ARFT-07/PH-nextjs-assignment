export default function MetricCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-border bg-surface px-6 py-5 text-center">
      <p className="font-display text-3xl font-bold text-accent">{value}</p>
      <p className="mt-1 font-display text-xs font-semibold uppercase tracking-widest text-muted">
        {label}
      </p>
    </div>
  );
}
