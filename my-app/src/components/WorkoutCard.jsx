"use client";

import Link from "next/link";
import { Dumbbell } from "lucide-react";
import CategoryTag from "@/components/CategoryTag";
import StatsRow from "@/components/StatsRow";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent/60"
    >
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-surface-2">
        {workout.image ? (
          <img
            src={workout.image}
            alt={workout.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling?.classList.remove("hidden");
            }}
          />
        ) : null}
        <Dumbbell
          className={`h-12 w-12 text-border ${workout.image ? "hidden" : ""}`}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-2">
          {workout.categories.map((cat) => (
            <CategoryTag key={cat}>{cat}</CategoryTag>
          ))}
        </div>

        <h3 className="font-display text-lg font-bold leading-tight tracking-wide text-foreground">
          {workout.name}
        </h3>

        <p className="text-sm text-muted">{workout.equipmentLabel}</p>

        <StatsRow
          duration={workout.duration}
          calories={workout.calories}
          rating={workout.rating}
          className="mt-auto pt-2"
        />
      </div>
    </Link>
  );
}
