"use client";

import { useMemo, useState } from "react";
import SortDropdown from "@/components/SortDropdown";
import WorkoutCard from "@/components/WorkoutCard";

export default function WorkoutsSection({ workouts }) {
  const [sortBy, setSortBy] = useState("duration");

  const sorted = useMemo(() => {
    const copy = [...workouts];
    copy.sort((a, b) => Number(a[sortBy]) - Number(b[sortBy]));
    if (sortBy === "rating") copy.reverse();
    return copy;
  }, [workouts, sortBy]);

  return (
    <section id="library" className="mx-auto max-w-7xl scroll-mt-16 px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-foreground sm:text-4xl">
            The Library
          </h2>
          <p className="mt-2 text-muted">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      {sorted.length === 0 ? (
        <p className="mt-10 text-muted">No workouts found right now — check back soon.</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sorted.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
