"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SavedPage() {
  const [savedWorkouts, setSavedWorkouts] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    setSavedWorkouts(saved);
  }, []);

  function removeSaved(id) {
    const updatedSaved = savedWorkouts.filter(
      (workout) => workout.id !== id
    );

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved)
    );

    setSavedWorkouts(updatedSaved);

    window.dispatchEvent(
      new Event("fitlog-saved-updated")
    );
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
            Saved Workouts
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Your workouts saved for later.
          </p>
        </div>

        <div className="mt-8 rounded-xl border border-zinc-800 bg-[#111318] p-5">
          <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">
            Saved Workouts
          </p>

          <p className="mt-2 text-3xl font-black text-[#ccff00]">
            {savedWorkouts.length}
          </p>
        </div>

        <div className="mt-8">

          {savedWorkouts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-zinc-800 bg-[#111318] p-10 text-center">

              <h2 className="text-lg font-black uppercase">
                No Saved Workouts
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                Save workouts from the workout details page.
              </p>

              <Link
                href="/"
                className="mt-5 inline-block rounded-lg bg-[#ccff00] px-5 py-3 text-[10px] font-black uppercase text-black transition hover:bg-[#b8e600]"
              >
                Browse Workouts
              </Link>

            </div>
          ) : (
            <div className="space-y-3">

              {savedWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="flex flex-col gap-4 rounded-xl border border-zinc-800 bg-[#111318] p-4 transition hover:border-zinc-700 sm:flex-row sm:items-center"
                >

                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="h-24 w-full rounded-lg object-cover sm:w-36"
                  />

                  <div className="flex-1">

                    <h2 className="text-sm font-black uppercase text-white">
                      {workout.name}
                    </h2>

                    <p className="mt-1 text-xs leading-5 text-zinc-500">
                      {workout.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-3 text-[9px] font-bold uppercase text-zinc-500">

                      <span className="rounded-full bg-zinc-900 px-2 py-1">
                        {workout.duration} min
                      </span>

                      <span className="rounded-full bg-zinc-900 px-2 py-1">
                        {workout.caloriesBurned} kcal
                      </span>

                      <span className="rounded-full bg-zinc-900 px-2 py-1">
                        {workout.difficulty}
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
                      onClick={() => removeSaved(workout.id)}
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
