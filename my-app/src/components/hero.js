import Image from "next/image";
import { ArrowDown } from "lucide-react";
import heroBanner from "@/assets/banner.png";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
          Workout Library
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-[1.05] text-white sm:text-5xl lg:text-6xl">
          Train with intent.
          <br />
          Log every set.
        </h1>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
          into today&apos;s plan, and watch the week&apos;s work add up.
        </p>
        <a
          href="#library"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-background transition-transform hover:-translate-y-0.5"
        >
          Browse Workouts
          <ArrowDown className="h-4 w-4" strokeWidth={2.5} />
        </a>
      </div>

      <div className="relative aspect-[4/3] w-full lg:aspect-square">
        <Image
          src={heroBanner}
          alt="Athlete training with intensity"
          fill
          priority
          className="object-contain"
        />
      </div>
    </section>
  );
}
