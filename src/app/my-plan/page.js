"use client";

import { useState } from "react";
import MetricCard from "@/components/MetricCard";
import EmptyState from "@/components/EmptyState";
import PlanListItem from "@/components/PlanListItem";
import { usePlan } from "@/context/PlanContext";

const TABS = [
  { id: "plan", label: "Today's Plan" },
  { id: "saved", label: "Saved" },
];

export default function MyPlanPage() {
  const { plan, saved, metrics, hydrated } = usePlan();
  const [tab, setTab] = useState("plan");

  const activeList = tab === "plan" ? plan : saved;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl">
        My Plan
      </h1>
      <p className="mt-2 text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
        <MetricCard label="Exercises" value={metrics.exercises} />
        <MetricCard label="Minutes" value={metrics.minutes} />
        <MetricCard label="Calories" value={metrics.calories} />
      </div>

      <div className="mt-10 flex gap-2 border-b border-border">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`relative px-4 py-3 font-display text-sm font-semibold uppercase tracking-wider transition-colors ${
              tab === t.id ? "text-accent" : "text-muted hover:text-foreground"
            }`}
          >
            {t.label}
            {tab === t.id && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 bg-accent" />
            )}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {!hydrated ? (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
            <div className="h-10 w-10 animate-spin-slow rounded-full border-4 border-border border-t-accent" />
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-muted">
              Loading workouts…
            </p>
          </div>
        ) : activeList.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-4">
            {activeList.map((workout) => (
              <PlanListItem key={workout.id} workout={workout} variant={tab} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
