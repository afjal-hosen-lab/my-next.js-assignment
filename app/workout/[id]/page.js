
import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WorkoutActions from "@/components/WorkoutActions";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

async function getWorkout(id) {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  const workouts = await response.json();

  return workouts.find(
    (workout) => workout.id === Number(id)
  );
}

export default async function WorkoutDetails({ params }) {
  const { id } = await params;

  const workout = await getWorkout(id);

  if (!workout) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-screen items-center justify-center bg-[#0d0f12] px-4 text-white">
          <div className="text-center">
            <h1 className="text-3xl font-black uppercase">
              Workout Not Found
            </h1>

            <Link
              href="/"
              className="mt-5 inline-block rounded-md bg-[#ccff00] px-5 py-3 text-xs font-black uppercase text-black"
            >
              Back to Workouts
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  const stats = [
    {
      label: "EQUIPMENT",
      value: workout.equipment,
    },
    {
      label: "DIFFICULTY",
      value: workout.difficulty,
    },
    {
      label: "SETS",
      value: workout.sets,
    },
    {
      label: "REPS",
      value: workout.reps,
    },
    {
      label: "DURATION",
      value: `${workout.duration} min`,
    },
    {
      label: "CALORIES",
      value: `${workout.caloriesBurned} kcal`,
    },
    {
      label: "RATING",
      value: workout.rating,
    },
  ];

  return (
    <main className="min-h-screen bg-[#0d0f12] text-white">
      <Navbar />

      <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto grid w-full max-w-5xl items-start gap-8 lg:grid-cols-2">

          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col">

            <h1 className="text-3xl font-extrabold uppercase tracking-wide text-white sm:text-4xl">
              {workout.name}
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              {workout.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#ccff00] px-3 py-1 text-[10px] font-extrabold uppercase text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            <div className="mt-6 divide-y divide-zinc-800/60 rounded-xl border border-zinc-800/80 bg-[#13161c] px-4 py-2">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center justify-between py-2.5 text-xs font-semibold"
                >
                  <span className="uppercase tracking-wider text-zinc-500">
                    {stat.label}
                  </span>

                  <span className="text-zinc-200">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                Instructions
              </h2>

              <ol className="mt-3 space-y-3">
                {workout.instructions.map(
                  (instruction, index) => (
                    <li
                      key={instruction}
                      className="flex items-start gap-2.5 text-xs leading-relaxed text-zinc-400"
                    >
                      <span className="shrink-0 text-zinc-500">
                        {index + 1}.
                      </span>

                      <span>{instruction}</span>
                    </li>
                  )
                )}
              </ol>
            </div>

            <div className="mt-8">
                <WorkoutActions workout={workout} />
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
