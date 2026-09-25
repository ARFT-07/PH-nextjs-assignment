import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface transition-colors hover:border-accent/60"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={workout.image}
          alt={workout.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap gap-1.5">
          {workout.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border-subtle px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-lg font-bold uppercase leading-snug text-white">
          {workout.name}
        </h3>

        <p className="text-xs text-muted">{workout.equipment}</p>

        <div className="mt-auto flex items-center gap-4 pt-2 text-xs text-gray-300">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-accent" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame className="h-3.5 w-3.5 text-accent" />
            {workout.calories} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-accent" />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
