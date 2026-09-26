import Link from "next/link";

export default function NotFound() {
    return (
    <main className="flex min-h-screen items-center justify-center bg-[#0d0f12] px-4 text-white">
        <div className="w-full max-w-md text-center">

        <p className="text-7xl font-black tracking-tight text-[#ccff00]">
            404
        </p>

        <h1 className="mt-4 text-2xl font-black uppercase">
            Page Not Found
        </h1>

        <p className="mt-3 text-sm leading-6 text-zinc-500">
            The page you are looking for does not exist or may have
            been moved.
        </p>

        <Link
            href="/"
            className="mt-7 inline-flex rounded-lg bg-[#ccff00] px-5 py-3 text-[10px] font-black uppercase text-black transition hover:bg-[#b8e600]"
        >
            Back to Workouts
        </Link>

        </div>
    </main>
    );
}

