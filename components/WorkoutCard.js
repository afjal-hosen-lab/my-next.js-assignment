import Image from "next/image";
import Link from "next/link";

export default function WorkoutCard({ workout }) {
    return (
    <Link
        href={`/workout/${workout.id}`}
        className="group block overflow-hidden rounded-xl border border-zinc-800 bg-[#111318] transition duration-300 hover:-translate-y-1 hover:border-[#ccff00]"
    >

        <div className="relative aspect-video overflow-hidden bg-zinc-900">
        <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
        />
        </div>

        <div className="p-3">
        
        <div className="mb-3 flex flex-wrap gap-1.5">
            {workout.muscleGroups.map((muscle) => (
            <span
                key={muscle}
                className="rounded-full bg-[#ccff00] px-2 py-1 text-[8px] font-black uppercase text-black"
            >
                {muscle}
            </span>
            ))}
        </div>

        <h3 className="text-sm font-black uppercase text-white">
            {workout.name}
        </h3>

        <p className="mt-1 text-[10px] text-zinc-500">
            {workout.equipment}
        </p>

        <div className="mt-4 grid grid-cols-3 border-t border-zinc-800 pt-3 text-[9px] text-zinc-500">
            <span>◷ {workout.duration} min</span>
            <span>🔥 {workout.caloriesBurned} kcal</span>
            <span>★ {workout.rating}</span>
        </div>

        </div>
    </Link>
    );
}