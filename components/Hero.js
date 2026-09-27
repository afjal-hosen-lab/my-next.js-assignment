"use client";

import Image from "next/image";

export default function Hero() {
  function scrollToLibrary() {
    const library = document.getElementById("library");

    if (library) {
      library.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  return (
    <section className="px-4 pt-8">
      <div
        className="
          relative mx-auto max-w-6xl
          overflow-hidden rounded-xl border border-zinc-800
          bg-[#111318]
          min-h-170
          sm:min-h-105
        "
      >

        <div
          className="
            relative z-20 w-full
            px-6 pt-12
            sm:max-w-xl sm:px-10 sm:py-10
          "
        >
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#ccff00] sm:text-xs">
            Workout Library
          </p>

          <h1
            className="
              max-w-82.5
              text-[42px] font-black uppercase
              leading-[0.92] tracking-tight text-white
              sm:max-w-lg sm:text-5xl
            "
          >
            Train with intent.
            <br />
            Log every set.
          </h1>

          <p
            className="
              mt-6 max-w-82.5
              text-[11px] leading-5 text-zinc-400
              sm:max-w-md sm:text-sm
            "
          >
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today&apos;s plan, and watch the week&apos;s work
            add up.
          </p>

          <button
            type="button"
            onClick={scrollToLibrary}
            className="
              mt-7 inline-flex
              rounded-md bg-[#ccff00]
              px-5 py-3
              text-[10px] font-black uppercase tracking-wide text-black
              transition
              hover:bg-white
              active:scale-95
            "
          >
            Browse workouts
          </button>
        </div>

        <div
          className="
            absolute bottom-0 left-1/2
            h-[48%] w-[82%]
            -translate-x-1/2
            sm:hidden
          "
        >
          <Image
            src="/assets/banner.png"
            alt="Workout machine"
            fill
            priority
            className="object-contain object-bottom"
          />
        </div>

        <div
          className="
            absolute bottom-0 right-0
            hidden h-full w-[42%]
            sm:block
          "
        >
          <Image
            src="/assets/banner.png"
            alt="Workout machine"
            fill
            priority
            className="object-contain object-bottom-right"
          />
        </div>

        <div
          className="
            pointer-events-none absolute inset-0 z-10
            bg-linear-to-b
            from-transparent
            via-transparent
            to-[#111318]/40
            sm:hidden
          "
        />
      </div>
    </section>
  );
}
