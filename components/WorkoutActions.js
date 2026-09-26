"use client";

import { useState } from "react";

export default function WorkoutActions({ workout }) {
  const [added, setAdded] = useState(false);
  const [saved, setSaved] = useState(false);

  function addToPlan() {
    const existingPlan = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]"
    );

    const alreadyAdded = existingPlan.some(
      (item) => item.id === workout.id
    );

    if (!alreadyAdded) {
      const updatedPlan = [...existingPlan, workout];

      localStorage.setItem(
        "fitlog-plan",
        JSON.stringify(updatedPlan)
      );

      window.dispatchEvent(new Event("fitlog-plan-updated"));
    }

    setAdded(true);
  }

  function saveWorkout() {
    const existingSaved = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    const alreadySaved = existingSaved.some(
      (item) => item.id === workout.id
    );

    if (!alreadySaved) {
      const updatedSaved = [...existingSaved, workout];

      localStorage.setItem(
        "fitlog-saved",
        JSON.stringify(updatedSaved)
      );
    }

    setSaved(true);
  }

  return (
    <div className="mt-7 flex flex-wrap gap-3">
      <button
        onClick={addToPlan}
        className="rounded-lg bg-[#ccff00] px-4 py-3 text-[10px] font-black uppercase text-black transition hover:bg-[#b8e600]"
      >
        {added ? "Added to today's plan" : "Add to today's plan"}
      </button>

      <button
        onClick={saveWorkout}
        className="rounded-lg border border-zinc-700 bg-[#15181d] px-4 py-3 text-[10px] font-bold uppercase text-zinc-300 transition hover:border-zinc-500 hover:text-white"
      >
        {saved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}