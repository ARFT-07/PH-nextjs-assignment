import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-6 text-center sm:flex-row sm:justify-between sm:text-left sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-background">
            <Dumbbell className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <span className="font-display text-base font-bold tracking-wide text-white">
            FITLOG
          </span>
        </div>
        <p className="text-sm text-muted">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
