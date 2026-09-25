import { notFound } from "next/navigation";
import { getWorkoutById } from "@/lib/api";
import DetailActions from "./detail-actions";

const SPEC_ROWS = (w) => [
  { label: "Equipment", value: w.equipment },
  { label: "Difficulty", value: w.difficulty },
  { label: "Sets", value: w.sets },
  { label: "Reps", value: w.reps },
  { label: "Duration", value: `${w.duration} min` },
  { label: "Calories", value: `${w.calories} kcal` },
  { label: "Rating", value: w.rating },
];

export default async function WorkoutDetailPage({ params }) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) notFound();

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-16">
      {/* Left — media */}
      <div className="aspect-square w-full overflow-hidden rounded-2xl border border-border-subtle bg-surface lg:sticky lg:top-24 lg:h-fit">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right — content */}
      <div>
        <h1 className="font-display text-3xl font-bold uppercase leading-tight text-white sm:text-4xl">
          {workout.name}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          {workout.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {workout.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border-subtle px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Key specs */}
        <div className="mt-6 divide-y divide-border-subtle overflow-hidden rounded-xl border border-border-subtle bg-surface">
          {SPEC_ROWS(workout).map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between px-4 py-3 text-sm"
            >
              <span className="font-semibold uppercase tracking-wide text-muted">
                {row.label}
              </span>
              <span className="font-medium text-white">{row.value}</span>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-8">
          <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">
            Instructions
          </h2>
          <ol className="mt-3 space-y-3">
            {workout.instructions.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-gray-300">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-background">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <DetailActions workout={workout} />
      </div>
    </div>
  );
}
