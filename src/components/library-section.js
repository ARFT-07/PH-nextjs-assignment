"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import WorkoutCard from "./workout-card";

const SORT_OPTIONS = [
  { value: "duration", label: "Duration" },
  { value: "calories", label: "Calories" },
  { value: "rating", label: "Rating" },
];

const SORT_KEY = {
  duration: (w) => w.duration,
  calories: (w) => w.calories,
  rating: (w) => w.rating,
};

export default function LibrarySection({ workouts }) {
  const [sortBy, setSortBy] = useState("duration");

  const sorted = useMemo(() => {
    const getKey = SORT_KEY[sortBy];
    return [...workouts].sort((a, b) => getKey(a) - getKey(b));
  }, [workouts, sortBy]);

  return (
    <section id="library" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">
            The Library
          </h2>
          <p className="mt-2 text-sm text-muted">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <label className="relative inline-flex w-fit items-center">
          <span className="sr-only">Sort by</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none rounded-lg border border-border-subtle bg-surface py-2 pl-3 pr-9 text-sm font-semibold text-white focus:border-accent focus:outline-none"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                Sort By: {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 h-4 w-4 text-muted" />
        </label>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
}
