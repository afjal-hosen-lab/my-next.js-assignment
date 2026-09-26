"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  function loadCounts() {
    const plan = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]"
    );

    const saved = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    setPlanCount(plan.length);
    setSavedCount(saved.length);
  }

  useEffect(() => {
    loadCounts();

    window.addEventListener("fitlog-plan-updated", loadCounts);
    window.addEventListener("fitlog-saved-updated", loadCounts);

    return () => {
      window.removeEventListener(
        "fitlog-plan-updated",
        loadCounts
      );

      window.removeEventListener(
        "fitlog-saved-updated",
        loadCounts
      );
    };
  }, []);

  return (
    <header className="border-b border-zinc-800 bg-[#0b0c10]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">

        {/* Logo */}
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

        {/* Navigation */}
        <nav className="hidden items-center gap-10 text-xs font-bold uppercase md:flex">
          <Link
            href="/"
            className="text-[#ccff00] transition hover:text-white"
          >
            Workouts
          </Link>

          <Link
            href="/my-plan?tab=plan"
            className="text-zinc-500 transition hover:text-white"
          >
            My Plan
          </Link>
        </nav>

        {/* Counters */}
        <div className="flex items-center gap-2">

          {/* Plan */}
          <Link
            href="/my-plan?tab=plan"
            className="rounded-full bg-[#ccff00] px-3 py-1.5 text-[10px] font-black uppercase text-black transition hover:bg-white"
          >
            Plan {planCount}
          </Link>

          {/* Saved */}
          <Link
            href="/my-plan?tab=saved"
            className="rounded-full border border-zinc-700 px-3 py-1.5 text-[10px] font-black uppercase text-zinc-300 transition hover:border-[#ccff00] hover:text-[#ccff00]"
          >
            Saved {savedCount}
          </Link>

        </div>
      </div>
    </header>
  );
}
