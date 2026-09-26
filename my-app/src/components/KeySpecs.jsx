import { formatDuration, formatCalories, formatRating } from "@/lib/format";

export default function KeySpecs({ workout }) {
  const rows = [
    ["Equipment", workout.equipmentLabel],
    ["Difficulty", workout.difficulty],
    ["Sets", workout.sets],
    ["Reps", workout.reps],
    ["Duration", formatDuration(workout.duration)],
    ["Calories", formatCalories(workout.calories)],
    ["Rating", formatRating(workout.rating)],
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      {rows.map(([label, value]) => (
        <div
          key={label}
          className="flex items-center justify-between border-b border-border px-5 py-3 last:border-b-0"
        >
          <span className="font-display text-xs font-semibold uppercase tracking-wider text-muted">
            {label}
          </span>
          <span className="text-sm font-semibold text-foreground">{value}</span>
        </div>
      ))}
    </div>
  );
}
