import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-[#0b0c10]">
      <div className="mx-auto flex min-h-20 max-w-6xl flex-col items-start justify-between gap-4 px-4 py-5 sm:flex-row sm:items-center">
        
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="FitLog logo"
            width={20}
            height={20}
          />

          <span className="text-sm font-black uppercase text-white">
            FitLog
          </span>
        </div>

        {/* Copyright */}
        <p className="text-[10px] text-zinc-600">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}