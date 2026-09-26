"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import { usePlan } from "@/context/PlanContext";

const links = [
  { href: "/#library", label: "Workout", match: "/" },
  { href: "/my-plan", label: "My Plan", match: "/my-plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = usePlan();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-accent">
          <Logo className="h-7 w-7" />
          <span className="font-display text-xl font-bold tracking-wide text-foreground">
            FITLOG
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.match;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display text-sm font-semibold uppercase tracking-wider transition-colors ${
                  isActive ? "text-accent" : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/my-plan"
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-accent-foreground transition-transform hover:scale-105"
          >
            Plan
            <span className="rounded-full bg-accent-foreground/15 px-1.5 py-0.5 text-[11px]">
              {planCount}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            Saved
            <span className="rounded-full bg-white/5 px-1.5 py-0.5 text-[11px]">
              {savedCount}
            </span>
          </Link>
        </div>
      </nav>

      <div className="flex items-center justify-center gap-6 border-t border-border py-2 md:hidden">
        {links.map((link) => {
          const isActive = pathname === link.match;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`font-display text-xs font-semibold uppercase tracking-wider ${
                isActive ? "text-accent" : "text-muted"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
