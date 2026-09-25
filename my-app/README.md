# 💪 FitLog — Workout Library

A dark, no-nonsense gym companion built with Next.js. Browse a library of
twelve lifts, drill into a workout's full instructions and stats, then lock
lifts into **Today's Plan** or **Save** them for later — all tracked live in
the navbar.

## 🔗 Links

- Live: _add your deployed link here_
- Repository: _add your GitHub link here_

## 🛠️ Technologies Used

- **Next.js (App Router)** — routing, layouts, and server-side data fetching
- **React** — client-side state and interactivity
- **Tailwind CSS v4** — styling, theming, and responsive layout
- **lucide-react** — icon set
- **FitLog API** (Cloudflare Worker) — workout data source

## ✨ Key Features

1. **Dynamic workout library** — all 12 workouts are fetched live from the
   FitLog API and rendered as a responsive 3-column grid on desktop that
   collapses gracefully on tablet and mobile.
2. **Sort dropdown** — re-order the library by Duration, Calories, or Rating
   without a page reload.
3. **Workout detail pages** — a two-column layout with key-spec panel and a
   numbered instructions list, generated per workout id (`/workout/[id]`).
4. **Today's Plan & Saved tracking** — adding/removing a workout updates the
   navbar's live "Plan" and "Saved" badge counters, persists to
   `localStorage`, and enforces the 5-lift daily cap.
5. **My Plan dashboard** — live Exercises/Minutes/Calories metrics, tabbed
   Today's Plan / Saved views, mark-as-done and remove actions, and an empty
   state pointing back to the library.
6. **Toast notifications & custom 404** — every plan/save action confirms
   itself with a toast, and unknown routes get a branded not-found page.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📁 Project Structure

```
src/
  app/
    page.js                 # Home (Hero + Library)
    loading.js               # Home loading state
    not-found.js              # Custom 404
    workout/[id]/page.js      # Workout detail page
    my-plan/page.js           # My Plan dashboard
  components/                 # Navbar, Footer, Hero, WorkoutCard, LibrarySection
  context/                     # PlanProvider (plan/saved state) + ToastProvider
  lib/api.js                    # FitLog API data-access layer
```
