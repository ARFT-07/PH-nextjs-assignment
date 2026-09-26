import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-8 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-accent">
          <Logo className="h-5 w-5" />
          <span className="font-display text-lg font-bold tracking-wide text-foreground">
            FITLOG
          </span>
        </div>
        <p className="text-center text-sm text-muted">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
