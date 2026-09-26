"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { readStorage, writeStorage } from "@/lib/storage";
import { useToast } from "@/context/ToastContext";

const PlanContext = createContext(null);

const PLAN_KEY = "fitlog:plan";
const SAVED_KEY = "fitlog:saved";
const PLAN_CAP = 5;

const initialStore = { plan: [], saved: [], hydrated: false };

export function PlanProvider({ children }) {
  const { showToast } = useToast();
  const [store, setStore] = useState(initialStore);
  const { plan, saved, hydrated } = store;

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setStore({
      plan: readStorage(PLAN_KEY, []),
      saved: readStorage(SAVED_KEY, []),
      hydrated: true,
    });
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (hydrated) writeStorage(PLAN_KEY, plan);
  }, [plan, hydrated]);

  useEffect(() => {
    if (hydrated) writeStorage(SAVED_KEY, saved);
  }, [saved, hydrated]);

  const setPlan = useCallback((updater) => {
    setStore((prev) => ({
      ...prev,
      plan: typeof updater === "function" ? updater(prev.plan) : updater,
    }));
  }, []);

  const setSaved = useCallback((updater) => {
    setStore((prev) => ({
      ...prev,
      saved: typeof updater === "function" ? updater(prev.saved) : updater,
    }));
  }, []);

  const isInPlan = useCallback((id) => plan.some((w) => w.id === id), [plan]);
  const isSaved = useCallback((id) => saved.some((w) => w.id === id), [saved]);
  const isPlanFull = plan.length >= PLAN_CAP;

  const addToPlan = useCallback(
    (workout) => {
      if (isInPlan(workout.id)) {
        showToast(`${workout.name} is already in today's plan`);
        return;
      }
      if (plan.length >= PLAN_CAP) {
        showToast(`Today's plan is full (${PLAN_CAP}/${PLAN_CAP})`);
        return;
      }
      setPlan((prev) => [...prev, { ...workout, done: false, plannedAt: Date.now() }]);
      showToast("Added to today's plan");
    },
    [isInPlan, plan.length, setPlan, showToast]
  );

  const saveForLater = useCallback(
    (workout) => {
      if (isSaved(workout.id)) {
        showToast(`${workout.name} is already saved`);
        return;
      }
      setSaved((prev) => [...prev, { ...workout, savedAt: Date.now() }]);
      showToast("Saved for later");
    },
    [isSaved, setSaved, showToast]
  );

  const removeFromPlan = useCallback(
    (id, opts = {}) => {
      setPlan((prev) => prev.filter((w) => w.id !== id));
      if (!opts.silent) showToast("Removed from today's plan");
    },
    [setPlan, showToast]
  );

  const removeFromSaved = useCallback(
    (id, opts = {}) => {
      setSaved((prev) => prev.filter((w) => w.id !== id));
      if (!opts.silent) showToast("Removed from saved");
    },
    [setSaved, showToast]
  );

  const markDone = useCallback(
    (id) => {
      const target = plan.find((w) => w.id === id);
      setPlan((prev) =>
        prev.map((w) => (w.id === id ? { ...w, done: !w.done } : w))
      );
      showToast(target && !target.done ? "Marked as done" : "Marked as not done");
    },
    [plan, setPlan, showToast]
  );

  const metrics = useMemo(() => {
    return plan.reduce(
      (acc, w) => ({
        exercises: acc.exercises + 1,
        minutes: acc.minutes + (Number(w.duration) || 0),
        calories: acc.calories + (Number(w.calories) || 0),
      }),
      { exercises: 0, minutes: 0, calories: 0 }
    );
  }, [plan]);

  const value = {
    plan,
    saved,
    hydrated,
    isInPlan,
    isSaved,
    isPlanFull,
    planCap: PLAN_CAP,
    addToPlan,
    saveForLater,
    removeFromPlan,
    removeFromSaved,
    markDone,
    metrics,
    planCount: plan.length,
    savedCount: saved.length,
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within a PlanProvider");
  return ctx;
}
