"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Library from "@/components/Library";
import Footer from "@/components/Footer";

import { getWorkouts } from "@/lib/api";

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const data = await getWorkouts();

        setWorkouts(data);
      } catch (error) {
        console.error("API ERROR:", error);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <main className="min-h-screen bg-[#090a0d] text-white">
      <Navbar />

      <Hero />

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-[#ccff00]" />
        </div>
      ) : (
        <Library workouts={workouts} />
      )}

      <Footer />
    </main>
  );
}
