# FitLog

Dark-themed workout library + planner built for the B14-A6 assignment. Browse lifts, dump a few into today's plan, mark them done, come back tomorrow.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind v4 · lucide-react

## Data

Pulls the 12 workouts from `https://api.abcz.workers.dev/api/fitlog`. `src/lib/api.js` normalizes whatever field names the API sends so the UI doesn't care about the exact shape.

## Pages

- `/` — hero + library grid, sortable by duration/calories/rating
- `/workout/[id]` — full detail: specs, instructions, add to plan / save
- `/my-plan` — today's plan (cap 5) + saved list, tabs, live metrics
- 404 for anything else

## State

Plan + saved lists live in `PlanContext`, backed by `localStorage` — survives a refresh, no backend needed. Toasts run through their own `ToastContext`.

## Notes

- Images use plain `<img>` tags, not `next/image`, since the API's image domain isn't known ahead of time.
- Fonts (Oswald/Inter) load via `next/font/google` at build time — needs a normal internet connection to build.