import { notFound } from "next/navigation";
import { Dumbbell } from "lucide-react";
import CategoryTag from "@/components/CategoryTag";
import KeySpecs from "@/components/KeySpecs";
import WorkoutDetailActions from "@/components/WorkoutDetailActions";
import { fetchWorkoutById } from "@/lib/api";

export default async function WorkoutDetailPage({ params }) {
  const { id } = await params;

  let workout = null;
  try {
    workout = await fetchWorkoutById(id);
  } catch {
    workout = null;
  }

  if (!workout) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface lg:sticky lg:top-24 lg:h-fit">
          {workout.image ? (
            <img
              src={workout.image}
              alt={workout.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling?.classList.remove("hidden");
              }}
            />
          ) : null}
          <Dumbbell className={`h-24 w-24 text-border ${workout.image ? "hidden" : ""}`} />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="font-display text-4xl font-bold uppercase leading-tight tracking-tight text-foreground sm:text-5xl">
              {workout.name}
            </h1>
            {workout.description ? (
              <p className="mt-4 text-base leading-relaxed text-muted">
                {workout.description}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2">
            {workout.categories.map((cat) => (
              <CategoryTag key={cat} size="lg">
                {cat}
              </CategoryTag>
            ))}
          </div>

          <KeySpecs workout={workout} />

          {workout.instructions.length > 0 && (
            <div>
              <h2 className="font-display text-lg font-bold uppercase tracking-wider text-foreground">
                Instructions
              </h2>
              <ol className="mt-4 flex flex-col gap-3">
                {workout.instructions.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent font-display text-sm font-bold text-accent-foreground">
                      {i + 1}
                    </span>
                    <p className="pt-0.5 text-sm leading-relaxed text-foreground">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <WorkoutDetailActions workout={workout} />
        </div>
      </div>
    </div>
  );
}
