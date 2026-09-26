"use client";

import { useMemo, useState } from "react";
import WorkoutCard from "./WorkoutCard";

export default function Library({ workouts }) {
  const [sortBy, setSortBy] = useState("duration");
  const [search, setSearch] = useState("");

  const filteredWorkouts = useMemo(() => {
    const filtered = workouts.filter((workout) =>
      workout.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

    return [...filtered].sort((a, b) => {
      if (sortBy === "duration") {
        return (
          Number(b.duration || 0) -
          Number(a.duration || 0)
        );
      }

      if (sortBy === "calories") {
        return (
          Number(b.caloriesBurned || 0) -
          Number(a.caloriesBurned || 0)
        );
      }

      if (sortBy === "rating") {
        return (
          Number(b.rating || 0) -
          Number(a.rating || 0)
        );
      }

      return 0;
    });
  }, [workouts, search, sortBy]);

  return (
    <section id="library" className="px-4 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-black uppercase text-white">
            The Library
          </h2>

          <p className="mt-1 text-xs text-zinc-500">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Search + Sort */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          {/* Search */}
          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search workouts..."
            className="w-full rounded-lg border border-zinc-800 bg-[#111318] px-4 py-3 text-xs text-white outline-none placeholder:text-zinc-600 transition focus:border-[#ccff00] sm:max-w-sm"
          />

          {/* Sort */}
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
              onChange={(event) =>
                setSortBy(event.target.value)
              }
              className="rounded-lg border border-zinc-800 bg-[#111318] px-3 py-2 text-xs font-bold text-zinc-300 outline-none transition focus:border-[#ccff00]"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Cards */}
        {filteredWorkouts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-800 bg-[#111318] p-12 text-center">
            <p className="text-sm font-bold text-zinc-500">
              No workouts found.
            </p>

            <p className="mt-1 text-xs text-zinc-600">
              Try searching with another workout name.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredWorkouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
