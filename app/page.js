import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#090a0d] text-white">
      
      <Navbar />

      <Hero />

      <div className="mx-auto flex min-h-[45vh] max-w-6xl items-center justify-center px-4">
        <h2 className="text-2xl font-bold text-zinc-500">
          Workout Library Coming Soon...
        </h2>
      </div>

      <Footer />

    </main>
  );
}