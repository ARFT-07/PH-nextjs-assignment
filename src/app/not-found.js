import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <Dumbbell className="h-12 w-12 text-accent" />
      <p className="font-display text-6xl font-bold text-foreground">404</p>
      <h1 className="font-display text-xl font-bold uppercase tracking-wide text-foreground">
        Set Not Found
      </h1>
      <p className="text-sm text-muted">
        The page you&apos;re looking for doesn&apos;t exist, or the workout may
        have been removed from the library.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-accent-foreground transition-transform hover:scale-105"
      >
        Back to Workouts
      </Link>
    </div>
  );
}
