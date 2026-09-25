"use client";

// context/plan-context.js
// Acts as the app's lightweight "backend": the single source of truth for
// Today's Plan and Saved workouts. There's no server to persist user
// actions (the FitLog API is read-only), so state lives here in React
// context and is mirrored to localStorage so it survives a reload.

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useToast } from "./toast-context";

const PlanContext = createContext(null);

const STORAGE_KEY = "fitlog:plan-state:v1";
const PLAN_CAP = 5;

function readStorage() {
  if (typeof window === "undefined") return { plan: [], saved: [] };
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { plan: [], saved: [] };
    const parsed = JSON.parse(raw);
    return {
      plan: Array.isArray(parsed.plan) ? parsed.plan : [],
      saved: Array.isArray(parsed.saved) ? parsed.saved : [],
    };
  } catch {
    return { plan: [], saved: [] };
  }
}

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const { showToast } = useToast();

  // Load persisted state once on mount (client only). This intentionally
  // runs after the initial (empty) render so server and client markup match
  // on hydration, then syncs in the real localStorage values.
  useEffect(() => {
    const { plan, saved } = readStorage();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPlan(plan);
    setSaved(saved);
    setIsHydrated(true);
  }, []);

  // Mirror every change back to localStorage.
  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ plan, saved }));
    } catch {
      // localStorage can fail (private mode, quota) — state still works in-memory.
    }
  }, [plan, saved, isHydrated]);

  const isInPlan = (id) => plan.some((w) => w.id === id);
  const isSaved = (id) => saved.some((w) => w.id === id);

  const addToPlan = (workout) => {
    if (isInPlan(workout.id)) {
      showToast("Already in today's plan");
      return;
    }
    if (plan.length >= PLAN_CAP) {
      showToast("Today's plan is full (5 max)");
      return;
    }
    setPlan((prev) => [...prev, { ...workout, done: false }]);
    showToast("Added to today's plan");
  };

  const addToSaved = (workout) => {
    if (isSaved(workout.id)) {
      showToast("Already saved");
      return;
    }
    setSaved((prev) => [...prev, workout]);
    showToast("Saved for later");
  };

  const removeFromPlan = (id) => {
    setPlan((prev) => prev.filter((w) => w.id !== id));
    showToast("Removed from today's plan");
  };

  const removeFromSaved = (id) => {
    setSaved((prev) => prev.filter((w) => w.id !== id));
    showToast("Removed from saved");
  };

  const markDone = (id) => {
    setPlan((prev) =>
      prev.map((w) => (w.id === id ? { ...w, done: !w.done } : w))
    );
    showToast("Marked as done");
  };

  const value = useMemo(
    () => ({
      plan,
      saved,
      isHydrated,
      planCap: PLAN_CAP,
      isInPlan,
      isSaved,
      addToPlan,
      addToSaved,
      removeFromPlan,
      removeFromSaved,
      markDone,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [plan, saved, isHydrated]
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used within a PlanProvider");
  return ctx;
}
