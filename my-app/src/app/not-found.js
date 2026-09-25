import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-surface text-accent">
        <Dumbbell className="h-7 w-7" strokeWidth={2.5} />
      </span>
      <h1 className="font-display text-4xl font-bold uppercase text-white">
        404 — Not Found
      </h1>
      <p className="max-w-sm text-sm text-muted">
        This lift doesn&apos;t exist in the library. Head back and pick
        something that does.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-background transition-transform hover:-translate-y-0.5"
      >
        Go to Workouts
      </Link>
    </div>
  );
}
