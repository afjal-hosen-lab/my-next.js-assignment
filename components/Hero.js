"use client";

import Image from "next/image";

export default function Hero() {
  function browseWorkouts() {
    document
      .getElementById("library")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }

  return (
    <section className="px-4 pt-8">
      <div className="relative mx-auto flex min-h-300px max-w-6xl items-center overflow-hidden rounded-xl border border-zinc-800 bg-[#111318]">

        <div className="relative z-10 w-full max-w-xl px-6 py-10 sm:px-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#ccff00]">
            Workout Library
          </p>

          <h1 className="max-w-lg text-4xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-5xl">
            Train with intent.
            <br />
            Log every set.
          </h1>

          <p className="mt-5 max-w-md text-xs leading-5 text-zinc-400 sm:text-sm">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <button
            onClick={browseWorkouts}
            type="button"
            className="mt-6 inline-flex rounded-md bg-[#ccff00] px-5 py-3 text-[10px] font-black uppercase tracking-wide text-black transition hover:bg-white"
          >
            Browse workouts
          </button>
        </div>

        <div className="absolute bottom-0 right-0 hidden h-full w-[42%] sm:block">
          <Image
            src="/assets/banner.png"
            alt="Workout machine"
            fill
            priority
            className="object-contain object-bottom-right"
          />
        </div>

      </div>
    </section>
  );
}

