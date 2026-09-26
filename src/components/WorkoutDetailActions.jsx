"use client";

import { Plus, Bookmark, Check } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

export default function WorkoutDetailActions({ workout }) {
  const { addToPlan, saveForLater, isInPlan, isSaved, isPlanFull, planCap } = usePlan();

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);
  const disablePlan = inPlan || (isPlanFull && !inPlan);

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={() => addToPlan(workout)}
        disabled={disablePlan}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-accent-foreground transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
      >
        {inPlan ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        {inPlan
          ? "In Today's Plan"
          : isPlanFull
          ? `Plan Full (${planCap}/${planCap})`
          : "Add to Today's Plan"}
      </button>

      <button
        type="button"
        onClick={() => saveForLater(workout)}
        disabled={saved}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-foreground transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
        {saved ? "Saved" : "Save for Later"}
      </button>
    </div>
  );
}
