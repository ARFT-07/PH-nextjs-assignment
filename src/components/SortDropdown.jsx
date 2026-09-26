"use client";

import { ChevronDown } from "lucide-react";

const OPTIONS = [
  { value: "duration", label: "Duration" },
  { value: "calories", label: "Calories" },
  { value: "rating", label: "Rating" },
];

export default function SortDropdown({ value, onChange }) {
  return (
    <label className="relative inline-flex items-center">
      <span className="mr-2 text-sm text-muted">Sort By</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-full border border-border bg-surface-2 py-2 pl-4 pr-9 text-sm font-semibold text-foreground outline-none transition-colors hover:border-accent/60 focus:border-accent"
      >
        {OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-muted" />
    </label>
  );
}
