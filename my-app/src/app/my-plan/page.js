"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Clock, Flame, Star, Check, X, ChevronDown } from "lucide-react";
import { usePlan } from "@/context/plan-context";

const TABS = [
  { key: "plan", label: "Today's Plan" },
  { key: "saved", label: "Saved" },
];

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

function MetricCard({ label, value }) {
  return (
    <div className="rounded-xl border border-border-subtle bg-surface px-4 py-5 text-center">
      <p className="font-display text-3xl font-bold text-accent">{value}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted">
        {label}
      </p>
    </div>
  );
}

function PlanCard({ workout, variant, onRemove, onMarkDone }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border-subtle bg-surface p-3 sm:p-4">
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-surface-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="min-w-0 flex-1">
        <h3
          className={`truncate font-display text-base font-bold uppercase ${
            workout.done ? "text-muted line-through" : "text-white"
          }`}
        >
          {workout.name}
        </h3>
        <p className="truncate text-xs text-muted">{workout.equipment}</p>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-300">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-accent" /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame className="h-3.5 w-3.5 text-accent" /> {workout.calories} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-accent" /> {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Link
          href={`/workout/${workout.id}`}
          className="hidden rounded-full border border-gray-500 px-3 py-2 text-xs font-bold uppercase text-white hover:border-white sm:inline-block"
        >
          View Details
        </Link>
        {variant === "plan" && (
          <button
            onClick={onMarkDone}
            aria-label="Mark as done"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-background hover:opacity-90"
          >
            <Check className="h-4 w-4" strokeWidth={3} />
          </button>
        )}
        <button
          onClick={onRemove}
          aria-label="Remove"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-500 text-white hover:border-white"
        >
          <X className="h-4 w-4" strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border-subtle py-16 text-center">
      <h3 className="font-display text-xl font-bold uppercase text-white">
        Nothing Here Yet
      </h3>
      <p className="max-w-xs text-sm text-muted">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-background"
      >
        Go to Workouts
      </Link>
    </div>
  );
}

export default function MyPlanPage() {
  const { plan, saved, isHydrated, removeFromPlan, removeFromSaved, markDone } =
    usePlan();
  const [tab, setTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");

  const totalMinutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = plan.reduce((sum, w) => sum + w.calories, 0);

  const rawList = tab === "plan" ? plan : saved;
  const list = useMemo(() => {
    const getKey = SORT_KEY[sortBy];
    return [...rawList].sort((a, b) => getKey(a) - getKey(b));
  }, [rawList, sortBy]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <h1 className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-2 text-sm text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Metrics */}
      <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
        <MetricCard label="Exercises" value={plan.length} />
        <MetricCard label="Minutes" value={totalMinutes} />
        <MetricCard label="Calories" value={totalCalories} />
      </div>

      {/* Tabs + Sort */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle">
        <div className="flex gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative px-4 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors ${
                tab === t.key ? "text-accent" : "text-muted hover:text-white"
              }`}
            >
              {t.label}
              {tab === t.key && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 bg-accent" />
              )}
            </button>
          ))}
        </div>

        <label className="relative mb-2 inline-flex items-center gap-2 text-xs text-muted">
          Sort By
          <span className="relative inline-flex items-center">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none rounded-lg border border-border-subtle bg-surface py-1.5 pl-3 pr-8 text-xs font-semibold text-white focus:border-accent focus:outline-none"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 h-3.5 w-3.5 text-muted" />
          </span>
        </label>
      </div>

      {/* List */}
      <div className="mt-6 flex flex-col gap-3">
        {!isHydrated ? (
          <p className="py-10 text-center font-display text-sm uppercase tracking-widest text-muted">
            Loading workouts…
          </p>
        ) : list.length === 0 ? (
          <EmptyState />
        ) : (
          list.map((workout) => (
            <PlanCard
              key={workout.id}
              workout={workout}
              variant={tab}
              onRemove={() =>
                tab === "plan"
                  ? removeFromPlan(workout.id)
                  : removeFromSaved(workout.id)
              }
              onMarkDone={() => markDone(workout.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}

