export default function Loading() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="h-12 w-12 animate-spin-slow rounded-full border-4 border-border border-t-accent" />
      <p className="font-display text-sm font-semibold uppercase tracking-widest text-muted">
        Loading workouts…
      </p>
    </div>
  );
}
