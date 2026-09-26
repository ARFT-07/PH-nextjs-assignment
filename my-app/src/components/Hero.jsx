import Image from "next/image";
import { ArrowDown } from "lucide-react";
import heroBanner from "../../public/images/hero-banner.png";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            Workout Library
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Train with intent.
            <br />
            Log every set.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-accent-foreground transition-transform hover:scale-105"
          >
            Browse Workouts
            <ArrowDown className="h-4 w-4" />
          </a>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md">
          <div className="absolute inset-0 rounded-full bg-accent/10 blur-3xl" />
          <Image
            src={heroBanner}
            alt="Illustration of a gym machine workout"
            fill
            priority
            className="relative object-contain drop-shadow-2xl"
            sizes="(max-width: 768px) 80vw, 400px"
          />
        </div>
      </div>
    </section>
  );
}
