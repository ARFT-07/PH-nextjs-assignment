// lib/api.js
// Thin data-access layer around the FitLog API.
// Every fetch call and shape-normalization for workout data lives here so
// pages/components never talk to `fetch` directly.

const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

/**
 * Normalizes a raw API workout record into the shape the UI expects.
 * Keeps the rest of the app decoupled from the upstream field names.
 */
function normalizeWorkout(raw) {
  return {
    id: raw.id,
    name: raw.name,
    image: raw.image,
    tags: raw.muscleGroups ?? [],
    equipment: raw.equipment,
    difficulty: raw.difficulty,
    duration: raw.duration, // minutes
    calories: raw.caloriesBurned,
    sets: raw.sets,
    reps: raw.reps,
    rating: raw.rating,
    description: raw.description,
    instructions: raw.instructions ?? [],
  };
}

/**
 * Fetches every workout in the library.
 * Used by the Home page's Library section.
 */
export async function getAllWorkouts() {
  const res = await fetch(BASE_URL, {
    // Data is close to static; revalidate every 5 minutes.
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`Failed to load workouts (${res.status})`);
  }

  const data = await res.json();
  return data.map(normalizeWorkout);
}

/**
 * Fetches a single workout by id.
 * Used by the Workout Detail page.
 */
export async function getWorkoutById(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    next: { revalidate: 300 },
  });

  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Failed to load workout ${id} (${res.status})`);
  }

  const data = await res.json();
  // Some APIs wrap single-item responses in an array — handle both.
  const raw = Array.isArray(data) ? data[0] : data;
  return raw ? normalizeWorkout(raw) : null;
}
