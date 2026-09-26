"use client";

import Link from "next/link";
import { Check, X } from "lucide-react";
import StatsRow from "@/components/StatsRow";
import WorkoutImage from "@/components/WorkoutImage";
import { usePlan } from "@/context/PlanContext";

export default function PlanListItem({ workout, variant }) {
  const { markDone, removeFromPlan, removeFromSaved } = usePlan();

  const handleRemove = () => {
    if (variant === "plan") removeFromPlan(workout.id);
    else removeFromSaved(workout.id);
  };

  return (
    <div
      className={`flex flex-col gap-4 rounded-2xl border border-border bg-surface p-4 sm:flex-row sm:items-center ${
        workout.done ? "opacity-60" : ""
      }`}
    >
      <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-surface-2">
        <WorkoutImage
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover"
          iconClassName="h-8 w-8 text-border"
        />
      </div>

      <div className="flex-1">
        <h3
          className={`font-display text-base font-bold tracking-wide text-foreground ${
            workout.done ? "line-through" : ""
          }`}
        >
          {workout.name}
        </h3>
        <p className="text-sm text-muted">{workout.equipmentLabel}</p>
        <StatsRow
          duration={workout.duration}
          calories={workout.calories}
          rating={workout.rating}
          className="mt-2"
        />
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-full border border-border px-4 py-2 text-xs font-bold uppercase tracking-wide text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          View Details
        </Link>
        {variant === "plan" && (
          <button
            type="button"
            onClick={() => markDone(workout.id)}
            aria-label="Mark as done"
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
              workout.done
                ? "bg-accent text-accent-foreground"
                : "border border-border text-foreground hover:border-accent hover:text-accent"
            }`}
          >
            <Check className="h-3.5 w-3.5" />
            {workout.done ? "Done" : "Mark as Done"}
          </button>
        )}
        <button
          type="button"
          onClick={handleRemove}
          aria-label="Remove"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-danger hover:text-danger"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
