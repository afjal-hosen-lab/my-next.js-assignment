"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

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
      window.removeEventListener("fitlog-plan-updated", loadCounts);
      window.removeEventListener("fitlog-saved-updated", loadCounts);
    };
  }, []);

  return (
    <header className="border-b border-zinc-800 bg-[#0b0c10]">
      <div className="mx-auto max-w-6xl px-4">

        <div className="flex h-16 items-center justify-between">

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

          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/my-plan"
              className="rounded-full bg-[#ccff00] px-3 py-1.5 text-[10px] font-black uppercase text-black"
            >
              Plan {planCount}
            </Link>

            <Link
              href="/my-plan?tab=saved"
              className="rounded-full border border-zinc-700 px-3 py-1.5 text-[10px] font-black uppercase text-zinc-300"
            >
              Saved {savedCount}
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 rounded-lg border border-zinc-800 p-2 md:hidden"
            aria-label="Toggle menu"
          >
            <span className="h-0.5 w-5 bg-white"></span>
            <span className="h-0.5 w-5 bg-white"></span>
            <span className="h-0.5 w-5 bg-white"></span>
          </button>

        </div>

        {menuOpen && (
          <div className="border-t border-zinc-800 py-4 md:hidden">

            <div className="flex flex-col gap-2">

              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-xs font-bold uppercase text-zinc-300 hover:bg-[#111318] hover:text-[#ccff00]"
              >
                Workouts
              </Link>

              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-xs font-bold uppercase text-zinc-300 hover:bg-[#111318] hover:text-[#ccff00]"
              >
                My Plan
              </Link>

              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-3 text-xs font-bold uppercase text-zinc-300 hover:bg-[#111318] hover:text-[#ccff00]"
              >
                <span>Today's Plan</span>

                <span className="rounded-full bg-[#ccff00] px-2 py-1 text-[9px] font-black text-black">
                  {planCount}
                </span>
              </Link>

              <Link
                href="/my-plan?tab=saved"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-3 text-xs font-bold uppercase text-zinc-300 hover:bg-[#111318] hover:text-[#ccff00]"
              >
                <span>Saved</span>

                <span className="rounded-full border border-zinc-700 px-2 py-1 text-[9px] font-black text-zinc-300">
                  {savedCount}
                </span>
              </Link>

            </div>
          </div>
        )}

      </div>
    </header>
  );
}