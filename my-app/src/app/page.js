import Hero from "@/components/hero";
import LibrarySection from "@/components/library-section";
import { getAllWorkouts } from "@/lib/api";

export default async function Home() {
  const workouts = await getAllWorkouts();

  return (
    <>
      <Hero />
      <LibrarySection workouts={workouts} />
    </>
  );
}
