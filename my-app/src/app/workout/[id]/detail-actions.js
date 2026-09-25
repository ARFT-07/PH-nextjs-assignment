"use client";

import { CalendarPlus, Bookmark } from "lucide-react";
import { usePlan } from "@/context/plan-context";

export default function DetailActions({ workout }) {
  const { addToPlan, addToSaved, isInPlan, isSaved } = usePlan();

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <button
        onClick={() => addToPlan(workout)}
        disabled={inPlan}
        className="flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-background transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
      >
        <CalendarPlus className="h-4 w-4" strokeWidth={2.5} />
        {inPlan ? "In Today's Plan" : "Add to Today's Plan"}
      </button>
      <button
        onClick={() => addToSaved(workout)}
        disabled={saved}
        className="flex items-center justify-center gap-2 rounded-lg border border-gray-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Bookmark className="h-4 w-4" strokeWidth={2.5} />
        {saved ? "Saved" : "Save for Later"}
      </button>
    </div>
  );
}
