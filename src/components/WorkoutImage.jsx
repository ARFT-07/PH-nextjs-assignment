"use client";

import { useState } from "react";
import { Dumbbell } from "lucide-react";

export default function WorkoutImage({ src, alt, className = "", iconClassName = "h-12 w-12 text-border" }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <Dumbbell className={iconClassName} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
