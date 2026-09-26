"use client";

import { useMemo, useState } from "react";
import WorkoutCard from "./WorkoutCard";

export default function Library({ workouts }) {
  const [sortBy, setSortBy] = useState("duration");

  const sortedWorkouts = useMemo(() => {
    const sorted = [...workouts];

    if (sortBy === "duration") {
      sorted.sort((a, b) => a.duration - b.duration);
    }

    if (sortBy === "calories") {
      sorted.sort(
        (a, b) => a.caloriesBurned - b.caloriesBurned
      );
    }

    if (sortBy === "rating") {
      sorted.sort((a, b) => a.rating - b.rating);
    }

    return sorted;
  }, [workouts, sortBy]);

  return (
    <section id="library" className="px-4 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Library Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <h2 className="text-2xl font-black uppercase text-white">
              The Library
            </h2>

            <p className="mt-1 text-xs text-zinc-500">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="sort"
              className="text-[10px] font-black uppercase tracking-wider text-zinc-500"
            >
              Sort By
            </label>

            <select
              id="sort"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-lg border border-zinc-800 bg-[#111318] px-3 py-2 text-xs font-bold text-zinc-300 outline-none transition focus:border-[#ccff00]"
            >
              <option value="duration">
                Duration
              </option>

              <option value="calories">
                Calories
              </option>

              <option value="rating">
                Rating
              </option>
            </select>
          </div>

        </div>

        {/* Workout Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
