import { Clock, Flame, Star } from "lucide-react";
import { formatDuration, formatCalories, formatRating } from "@/lib/format";

export default function StatsRow({ duration, calories, rating, className = "" }) {
  return (
    <div className={`flex items-center gap-4 text-sm text-muted ${className}`}>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="h-4 w-4" />
        {formatDuration(duration)}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Flame className="h-4 w-4" />
        {formatCalories(calories)}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Star className="h-4 w-4 fill-accent text-accent" />
        {formatRating(rating)}
      </span>
    </div>
  );
}
