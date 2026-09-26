"use client";

import Link from "next/link";

export default function PlanWorkoutCard({
  workout,
  isDone,
  onDone,
  onRemove,
  showDone = true,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-zinc-800/80 bg-[#111318] p-4 transition-all hover:border-zinc-700/80 gap-4">
      {/* Left side: Image & Workout Details */}
      <div className="flex items-center gap-4">
        {/* Image Container */}
        <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg bg-zinc-800">
          <img
            src={workout.image || "/placeholder.jpg"}
            alt={workout.name}
            className={`h-full w-full object-cover transition-opacity ${
              isDone ? "opacity-40" : ""
            }`}
          />
        </div>

        {/* Info */}
        <div>
          <h3
            className={`text-base font-black uppercase tracking-wide ${
              isDone ? "text-zinc-500 line-through" : "text-white"
            }`}
          >
            {workout.name}
          </h3>

          <p className="mt-0.5 text-xs text-zinc-500">
            {workout.equipment || workout.category || "Bodyweight"}
          </p>

          {/* Meta Info (Duration, Calories, Rating) */}
          <div className="mt-2 flex items-center gap-4 text-xs font-medium text-zinc-400">
            <span className="flex items-center gap-1">
              <svg
                className="h-3.5 w-3.5 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {workout.duration} min
            </span>

            <span className="flex items-center gap-1">
              <svg
                className="h-3.5 w-3.5 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                />
              </svg>
              {workout.caloriesBurned} kcal
            </span>

            <span className="flex items-center gap-1">
              <svg
                className="h-3.5 w-3.5 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
              {workout.rating}
            </span>
          </div>
        </div>
      </div>

      {/* Right side: Action Buttons */}
      <div className="flex items-center gap-2 self-end sm:self-center">
        {/* View Details Button */}
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-lg border border-zinc-800 bg-[#161920] px-4 py-2 text-[11px] font-black uppercase tracking-wider text-white transition hover:bg-zinc-800"
        >
          View Details
        </Link>

        {/* Mark as Done / Completed Button */}
        {showDone && (
          <button
            onClick={() => onDone(workout.id)}
            disabled={isDone}
            className={`flex items-center gap-1.5 rounded-lg border px-4 py-2 text-[11px] font-black uppercase tracking-wider transition ${
              isDone
                ? "border-zinc-800 bg-zinc-900 text-zinc-500 cursor-not-allowed"
                : "border-zinc-800 bg-[#161920] text-white hover:bg-zinc-800"
            }`}
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M5 13l4 4L19 7"
              />
            </svg>
            {isDone ? "Completed" : "Mark as Done"}
          </button>
        )}

        {/* Trash Icon Button */}
        <button
          onClick={() => onRemove(workout.id)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800 bg-[#161920] text-zinc-400 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-500"
          title="Remove"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}