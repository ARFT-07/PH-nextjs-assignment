export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-border-subtle border-t-accent" />
      <p className="font-display text-sm uppercase tracking-widest text-muted">
        Loading workouts…
      </p>
    </div>
  );
}
