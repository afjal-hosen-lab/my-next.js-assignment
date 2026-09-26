"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function WorkoutActions({ workout }) {
  const [added, setAdded] = useState(false);
  const [saved, setSaved] = useState(false);

  // Page load হলে existing status check
  useEffect(() => {
    const existingPlan = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]"
    );

    const existingSaved = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    setAdded(
      existingPlan.some((item) => item.id === workout.id)
    );

    setSaved(
      existingSaved.some((item) => item.id === workout.id)
    );
  }, [workout.id]);

  function addToPlan() {
    const existingPlan = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]"
    );

    // Already added check
    if (existingPlan.some((item) => item.id === workout.id)) {
      toast.info("Workout is already in your plan.");
      setAdded(true);
      return;
    }

    // Maximum 5 workouts
    if (existingPlan.length >= 5) {
      toast.error(
        "Today's Plan can contain only 5 workouts."
      );
      return;
    }

    const updatedPlan = [...existingPlan, workout];

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );

    window.dispatchEvent(
      new Event("fitlog-plan-updated")
    );

    setAdded(true);

    toast.success("Workout added to today's plan!");
  }

  function saveWorkout() {
    const existingSaved = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    // Already saved check
    if (existingSaved.some((item) => item.id === workout.id)) {
      toast.info("Workout is already saved.");
      setSaved(true);
      return;
    }

    const updatedSaved = [...existingSaved, workout];

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved)
    );

    window.dispatchEvent(
      new Event("fitlog-saved-updated")
    );

    setSaved(true);

    toast.success("Workout saved for later!");
  }

  return (
    <div className="mt-7 flex flex-wrap gap-3">
      {/* Add to Plan */}
      <button
        onClick={addToPlan}
        className={`rounded-lg px-4 py-3 text-[10px] font-black uppercase transition ${
          added
            ? "bg-zinc-800 text-zinc-400"
            : "bg-[#ccff00] text-black hover:bg-[#b8e600]"
        }`}
      >
        {added
          ? "Added to today's plan"
          : "Add to today's plan"}
      </button>

      {/* Save */}
      <button
        onClick={saveWorkout}
        className={`rounded-lg border px-4 py-3 text-[10px] font-bold uppercase transition ${
          saved
            ? "border-[#ccff00] text-[#ccff00]"
            : "border-zinc-700 bg-[#15181d] text-zinc-300 hover:border-zinc-500 hover:text-white"
        }`}
      >
        {saved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}

