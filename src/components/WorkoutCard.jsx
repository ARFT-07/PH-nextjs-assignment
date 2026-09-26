"use client";

import Link from "next/link";
import CategoryTag from "@/components/CategoryTag";
import StatsRow from "@/components/StatsRow";
import WorkoutImage from "@/components/WorkoutImage";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-accent/60"
    >
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-surface-2">
        <WorkoutImage
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
