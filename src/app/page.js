import Hero from "@/components/Hero";
import WorkoutsSection from "@/components/WorkoutsSection";
import { fetchWorkouts } from "@/lib/api";

export default async function Home() {
  let workouts = [];
  let error = null;

  try {
    workouts = await fetchWorkouts();
  } catch (err) {
    error = err instanceof Error ? err.message : "Something went wrong.";
  }

  return (
    <>
      <Hero />
      {error ? (
        <section className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <p className="text-muted">
            We couldn&apos;t load the workout library right now. Please refresh
            the page in a moment.
          </p>
        </section>
      ) : (
        <WorkoutsSection workouts={workouts} />
      )}
    </>
  );
}
