"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";

import PlanWorkoutCard from "@/components/PlanWorkoutCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// আসল পেজের লজিক ও UI একটি আলাদা কম্পোনেন্টে রাখা হলো
function MyPlanContent() {
  const searchParams = useSearchParams();

  const [tab, setTab] = useState(
    searchParams.get("tab") === "saved" ? "saved" : "plan"
  );

  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [done, setDone] = useState([]);
  const [sort, setSort] = useState("duration");

  useEffect(() => {
    setTab(
      searchParams.get("tab") === "saved" ? "saved" : "plan"
    );
  }, [searchParams]);

  function loadData() {
    setPlan(
      JSON.parse(localStorage.getItem("fitlog-plan") || "[]")
    );

    setSaved(
      JSON.parse(localStorage.getItem("fitlog-saved") || "[]")
    );

    setDone(
      JSON.parse(localStorage.getItem("fitlog-done") || "[]")
    );
  }

  useEffect(() => {
    loadData();

    window.addEventListener("fitlog-plan-updated", loadData);
    window.addEventListener("fitlog-saved-updated", loadData);

    return () => {
      window.removeEventListener(
        "fitlog-plan-updated",
        loadData
      );

      window.removeEventListener(
        "fitlog-saved-updated",
        loadData
      );
    };
  }, []);

  const workouts = tab === "plan" ? plan : saved;

  const sorted = useMemo(() => {
    return [...workouts].sort((a, b) => {
      if (sort === "duration") {
        return (
          Number(b.duration || 0) -
          Number(a.duration || 0)
        );
      }

      if (sort === "calories") {
        return (
          Number(b.caloriesBurned || 0) -
          Number(a.caloriesBurned || 0)
        );
      }

      if (sort === "rating") {
        return (
          Number(b.rating || 0) -
          Number(a.rating || 0)
        );
      }

      return 0;
    });
  }, [workouts, sort]);

  const minutes = workouts.reduce(
    (sum, item) => sum + Number(item.duration || 0),
    0
  );

  const calories = workouts.reduce(
    (sum, item) => sum + Number(item.caloriesBurned || 0),
    0
  );

  function changeTab(value) {
    setTab(value);
  }

  function remove(id) {
    const key =
      tab === "plan"
        ? "fitlog-plan"
        : "fitlog-saved";

    const list = workouts.filter(
      (item) => item.id !== id
    );

    localStorage.setItem(
      key,
      JSON.stringify(list)
    );

    if (tab === "plan") {
      setPlan(list);
    } else {
      setSaved(list);
    }

    window.dispatchEvent(
      new Event(
        tab === "plan"
          ? "fitlog-plan-updated"
          : "fitlog-saved-updated"
      )
    );

    toast.success("Workout removed.");
  }

  function markDone(id) {
    if (done.includes(id)) return;

    const updated = [...done, id];

    localStorage.setItem(
      "fitlog-done",
      JSON.stringify(updated)
    );

    setDone(updated);

    toast.success("Workout completed!");
  }

  return (
    <div className="flex-1 px-4 py-8">
      <div className="mx-auto max-w-5xl">

        <Link
          href="/"
          className="text-xs font-bold uppercase text-zinc-500 transition hover:text-[#ccff00]"
        >
          ← Back to Workouts
        </Link>

        <h1 className="mt-6 text-3xl font-black uppercase tracking-wide">
          My Plan
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          {tab === "plan"
            ? "Cap of five lifts for today. Finish them, then load more."
            : "Your saved workouts for later."}
        </p>

        <div className="mt-8 grid grid-cols-3 gap-3">
          {[
            ["Exercises", workouts.length],
            ["Minutes", minutes],
            ["Calories", calories],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl border border-zinc-800 bg-[#111318] p-4"
            >
              <p className="text-[9px] uppercase tracking-wider text-zinc-500">
                {label}
              </p>

              <p className="mt-2 text-2xl font-black text-[#ccff00]">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/80 pb-4">

          <div className="flex gap-1 rounded-xl bg-[#111318] p-1">

            <button
              onClick={() => changeTab("plan")}
              className={`rounded-lg px-4 py-2 text-[11px] font-black uppercase transition-all ${
                tab === "plan"
                  ? "bg-[#1f232c] text-[#ccff00]"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Today's Plan
            </button>

            <button
              onClick={() => changeTab("saved")}
              className={`rounded-lg px-4 py-2 text-[11px] font-black uppercase transition-all ${
                tab === "saved"
                  ? "bg-[#1f232c] text-[#ccff00]"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Saved
            </button>

          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500">
              Sort by
            </span>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="cursor-pointer rounded-lg border border-zinc-800/80 bg-[#111318] px-3 py-1.5 text-xs font-bold text-white outline-none"
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

        <div className="mt-6 space-y-4">

          {sorted.length === 0 ? (
            <div className="rounded-xl border border-dashed border-zinc-800 p-12 text-center">

              <p className="text-sm text-zinc-500">
                No workouts here yet.
              </p>

              <Link
                href="/"
                className="mt-4 inline-block rounded-lg bg-[#ccff00] px-4 py-2 text-xs font-black uppercase text-black"
              >
                Browse Workouts
              </Link>

            </div>
          ) : (
            sorted.map((workout) => (
              <PlanWorkoutCard
                key={workout.id}
                workout={workout}
                isDone={done.includes(workout.id)}
                onDone={markDone}
                onRemove={remove}
                showDone={tab === "plan"}
              />
            ))
          )}

        </div>

      </div>
    </div>
  );
}

// মূল পেজ এক্সপোর্ট যা <Suspense> দিয়ে wrapper তৈরি করেছে
export default function MyPlanPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#0d0f12] text-white">
      <Navbar />
      <Suspense fallback={<div className="flex-1 p-8 text-center text-zinc-500">Loading plan...</div>}>
        <MyPlanContent />
      </Suspense>
      <Footer />
    </main>
  );
}