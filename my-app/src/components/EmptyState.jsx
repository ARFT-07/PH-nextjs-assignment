import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border py-20 text-center">
      <Dumbbell className="h-10 w-10 text-muted" />
      <h3 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
        Nothing Here Yet
      </h3>
      <p className="max-w-sm text-sm text-muted">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-accent-foreground transition-transform hover:scale-105"
      >
        Go to Workouts
      </Link>
    </div>
  );
}
