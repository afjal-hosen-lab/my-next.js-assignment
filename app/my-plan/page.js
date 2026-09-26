"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MyPlan() {
    const [plan, setPlan] = useState([]);

    useEffect(() => {
    const savedPlan = JSON.parse(
        localStorage.getItem("fitlog-plan") || "[]"
    );

    setPlan(savedPlan);
    }, []);

    const totalExercises = plan.length;

    const totalMinutes = plan.reduce(
    (total, workout) => total + Number(workout.duration || 0),
    0
    );

    const totalCalories = plan.reduce(
    (total, workout) =>
        total + Number(workout.caloriesBurned || 0),
    0
    );

    function removeFromPlan(id) {
    const updatedPlan = plan.filter(
        (workout) => workout.id !== id
    );

    localStorage.setItem(
        "fitlog-plan",
        JSON.stringify(updatedPlan)
    );

    window.dispatchEvent(new Event("fitlog-plan-updated"));

    setPlan(updatedPlan);
    }

    return (
    <main className="min-h-screen bg-[#0d0f12] px-4 py-8 text-white sm:px-6 lg:px-8">

        <div className="mx-auto max-w-5xl">

        <Link
            href="/"
            className="text-xs font-bold uppercase tracking-wide text-zinc-500 transition hover:text-[#ccff00]"
        >
            ← Back to Library
        </Link>

        <div className="mt-8">
            <h1 className="text-3xl font-black uppercase sm:text-4xl">
            My Plan
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
            Your workouts for today.
            </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">

            <div className="rounded-xl border border-zinc-800 bg-[#111318] p-5">
            <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">
                Exercises
            </p>

            <p className="mt-2 text-3xl font-black text-[#ccff00]">
                {totalExercises}
            </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-[#111318] p-5">
            <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">
                Minutes
            </p>

            <p className="mt-2 text-3xl font-black text-[#ccff00]">
                {totalMinutes}
            </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-[#111318] p-5">
            <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">
                Calories
            </p>

            <p className="mt-2 text-3xl font-black text-[#ccff00]">
                {totalCalories}
            </p>
            </div>

        </div>

        <div className="mt-8">

            {plan.length === 0 ? (
            <div className="rounded-xl border border-dashed border-zinc-800 bg-[#111318] p-10 text-center">
                <h2 className="text-lg font-black uppercase">
                Your plan is empty
                </h2>

                <p className="mt-2 text-sm text-zinc-500">
                Add workouts from the library to build your plan.
                </p>

                <Link
                href="/"
                className="mt-5 inline-block rounded-lg bg-[#ccff00] px-5 py-3 text-[10px] font-black uppercase text-black"
                >
                Browse Workouts
                </Link>
            </div>
            ) : (
            <div className="space-y-3">

                {plan.map((workout) => (
                <div
                    key={workout.id}
                    className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-[#111318] p-4 sm:flex-row sm:items-center"
                >

                    <img
                    src={workout.image}
                    alt={workout.name}
                    className="h-24 w-full rounded-lg object-cover sm:w-36"
                    />

                    <div className="flex-1">
                    <h2 className="text-sm font-black uppercase">
                        {workout.name}
                    </h2>

                    <p className="mt-1 text-xs text-zinc-500">
                        {workout.equipment}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-3 text-[9px] uppercase text-zinc-500">
                        <span>
                        {workout.duration} min
                        </span>

                        <span>
                        {workout.caloriesBurned} kcal
                        </span>

                        <span>
                        {workout.sets} sets
                        </span>

                        <span>
                        {workout.reps} reps
                        </span>
                    </div>
                    </div>

                    <div className="flex gap-2">

                    <Link
                        href={`/workout/${workout.id}`}
                        className="rounded-lg border border-zinc-700 px-3 py-2 text-[9px] font-bold uppercase text-zinc-300 transition hover:border-[#ccff00] hover:text-[#ccff00]"
                    >
                        View
                    </Link>

                    <button
                        onClick={() => removeFromPlan(workout.id)}
                        className="rounded-lg border border-zinc-800 px-3 py-2 text-[9px] font-bold uppercase text-red-400 transition hover:bg-red-500/10"
                    >
                        Remove
                    </button>

                    </div>

                </div>
                ))}

            </div>
            )}

        </div>

        </div>
    </main>
    );
}