"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [planCount, setPlanCount] = useState(0);

  useEffect(() => {
    function updatePlanCount() {
      const plan = JSON.parse(
        localStorage.getItem("fitlog-plan") || "[]"
      );

      setPlanCount(plan.length);
    }

    // Load count when Navbar opens
    updatePlanCount();

    // Update count when workout is added/removed
    window.addEventListener(
      "fitlog-plan-updated",
      updatePlanCount
    );

    return () => {
      window.removeEventListener(
        "fitlog-plan-updated",
        updatePlanCount
      );
    };
  }, []);

  return (
    <header className="border-b border-zinc-800 bg-[#0b0c10]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">

        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="FitLog logo"
            width={26}
            height={26}
          />

          <span className="text-lg font-black uppercase text-white">
            FitLog
          </span>
        </Link>

        <nav className="hidden items-center gap-10 text-xs font-bold uppercase md:flex">
          <Link
            href="/"
            className="text-[#ccff00] transition hover:text-white"
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className="text-zinc-500 transition hover:text-white"
          >
            My Plan
          </Link>
        </nav>

        <div className="flex items-center gap-2">

          {/* Plan Count */}
          <Link
            href="/my-plan"
            className="rounded-full bg-[#ccff00] px-3 py-1.5 text-[10px] font-black uppercase text-black"
          >
            Plan {planCount}
          </Link>

          {/* Saved */}
          <Link
            href="/my-plan"
            className="rounded-full border border-zinc-700 px-3 py-1.5 text-[10px] font-black uppercase text-zinc-300"
          >
            Saved 0
          </Link>

        </div>

      </div>
    </header>
  );
}