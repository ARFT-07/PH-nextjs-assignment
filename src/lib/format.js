export function formatDuration(minutes) {
  const n = Number(minutes);
  if (!Number.isFinite(n)) return String(minutes);
  return `${n} min`;
}

export function formatCalories(cal) {
  const n = Number(cal);
  if (!Number.isFinite(n)) return String(cal);
  return `${n} kcal`;
}

export function formatRating(rating) {
  const n = Number(rating);
  if (!Number.isFinite(n)) return String(rating);
  return n.toFixed(1);
}
