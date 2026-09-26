import WorkoutCard from "./WorkoutCard";

export default function Library({ workouts }) {
    return (
    <section id="library" className="px-4 py-10">
        <div className="mx-auto max-w-6xl">
        
        <div className="mb-6">
            <h2 className="text-2xl font-black uppercase text-white">
            The Library
            </h2>

            <p className="mt-1 text-xs text-zinc-500">
            Twelve lifts covering every major muscle group.
            </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
            <WorkoutCard
                key={workout.id}
                workout={workout}
            />
            ))}
        </div>

        </div>
    </section>
    );
}