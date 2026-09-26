import Image from "next/image";
import Link from "next/link";
import WorkoutActions from "@/components/WorkoutActions";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

async function getWorkout(id) {
    const response = await fetch(API_URL);

    if (!response.ok) {
    throw new Error("Failed to fetch workouts");
    }

    const workouts = await response.json();

    return workouts.find((workout) => workout.id === Number(id));
}

export default async function WorkoutDetails({ params }) {
    const { id } = await params;

    const workout = await getWorkout(id);

    if (!workout) {
    return (
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
    <main className="min-h-screen bg-[#0d0f12] px-4 py-8 text-white sm:px-6 lg:px-8">
        
        <div className="mx-auto max-w-5xl rounded-2xl border border-zinc-800 bg-[#111318] p-5 sm:p-6 lg:p-8">

        <Link
            href="/"
            className="mb-6 inline-block text-xs font-bold uppercase tracking-wide text-zinc-500 transition hover:text-[#ccff00]"
        >
            ← Back to Library
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">

            <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
            <Image
                src={workout.image}
                alt={workout.name}
                fill
                priority
                className="object-cover"
            />
            </div>

            <div>

            <h1 className="text-3xl font-black uppercase leading-none tracking-tight text-white sm:text-4xl">
                {workout.name}
            </h1>

            <p className="mt-4 text-sm leading-6 text-zinc-400">
                {workout.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
                {workout.muscleGroups.map((muscle) => (
                <span
                    key={muscle}
                    className="rounded-full bg-[#ccff00] px-3 py-1 text-[9px] font-black uppercase text-black"
                >
                    {muscle}
                </span>
                ))}
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-zinc-800 bg-[#0d0f12]">
                {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="flex items-center justify-between border-b border-zinc-800 px-4 py-3 last:border-b-0"
                >
                    <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">
                    {stat.label}
                    </span>

                    <span className="text-xs font-semibold text-zinc-200">
                    {stat.value}
                    </span>
                </div>
                ))}
            </div>

            <div className="mt-6">
                <h2 className="text-xs font-black uppercase tracking-wider text-white">
                Instructions
                </h2>

                <ol className="mt-4 space-y-3">
                {workout.instructions.map((instruction, index) => (
                    <li
                    key={instruction}
                    className="flex items-start gap-3 text-xs leading-5 text-zinc-400"
                    >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ccff00] text-[9px] font-black text-black">
                        {index + 1}
                    </span>

                    <span>{instruction}</span>
                    </li>
                ))}
                </ol>
            </div>

            {/* Buttons */}
            <WorkoutActions workout={workout} />

            </div>
        </div>
        </div>
    </main>
    );
}