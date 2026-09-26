const API_BASE = "https://api.abcz.workers.dev/api/fitlog";

function firstDefined(...values) {
  for (const v of values) {
    if (v !== undefined && v !== null && v !== "") return v;
  }
  return undefined;
}

function toArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    return value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (value === undefined || value === null) return [];
  return [value];
}

function toNumber(value, fallback = 0) {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const match = value.match(/-?\d+(\.\d+)?/);
    if (match) return parseFloat(match[0]);
  }
  return fallback;
}

function idOf(raw, index) {
  const id = firstDefined(raw.id, raw._id, raw.uuid, raw.slug, raw.workoutId);
  return id !== undefined ? String(id) : String(index);
}

export function normalizeWorkout(raw, index = 0) {
  if (!raw || typeof raw !== "object") return null;

  const name = firstDefined(
    raw.name,
    raw.title,
    raw.workoutName,
    raw.exercise,
    raw.exerciseName
  ) || "UNTITLED WORKOUT";

  const categories = toArray(
    firstDefined(raw.category, raw.categories, raw.tags, raw.muscleGroup, raw.muscleGroups)
  );

  const equipmentList = toArray(
    firstDefined(raw.equipment, raw.equipments, raw.gear)
  );

  const durationRaw = firstDefined(raw.duration, raw.durationMinutes, raw.time);
  const duration = toNumber(durationRaw, 20);

  const caloriesRaw = firstDefined(raw.calories, raw.calorie, raw.kcal);
  const calories = toNumber(caloriesRaw, 150);

  const ratingRaw = firstDefined(raw.rating, raw.stars, raw.score);
  const rating = toNumber(ratingRaw, 4.5);

  const difficulty = firstDefined(raw.difficulty, raw.level, raw.intensity) || "Beginner";

  const sets = firstDefined(raw.sets, raw.setCount);
  const reps = firstDefined(raw.reps, raw.repRange, raw.repetitions);

  const description = firstDefined(
    raw.description,
    raw.subtitle,
    raw.desc,
    raw.summary
  ) || "";

  const instructions = toArray(
    firstDefined(raw.instructions, raw.steps, raw.howTo, raw.directions)
  );

  const image = firstDefined(
    raw.image,
    raw.img,
    raw.thumbnail,
    raw.thumb,
    raw.photo,
    raw.picture
  );

  return {
    id: idOf(raw, index),
    name: String(name).toUpperCase(),
    categories: categories.length ? categories : ["GENERAL"],
    equipment: equipmentList,
    equipmentLabel: equipmentList.join(", ") || "Bodyweight",
    duration,
    calories,
    rating,
    difficulty,
    sets: sets !== undefined ? sets : "3",
    reps: reps !== undefined ? reps : "10-12",
    description,
    instructions,
    image,
    raw,
  };
}

export async function fetchWorkouts() {
  const res = await fetch(API_BASE, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to load workouts (${res.status})`);
  }
  const data = await res.json();
  const list = Array.isArray(data) ? data : data?.data || data?.workouts || data?.results || [];
  return list.map((raw, i) => normalizeWorkout(raw, i)).filter(Boolean);
}

export async function fetchWorkoutById(id) {
  try {
    const res = await fetch(`${API_BASE}/${id}`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      const raw = data?.data || data;
      if (raw && !Array.isArray(raw)) {
        return normalizeWorkout(raw, 0);
      }
    }
  } catch {
  }

  const all = await fetchWorkouts();
  return all.find((w) => w.id === String(id)) || null;
}
