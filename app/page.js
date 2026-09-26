import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#090a0d] text-white">
      
      <Navbar />

      <div className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-4">
        <h1 className="text-3xl font-bold">
          FitLog
        </h1>
      </div>

      <Footer />

    </main>
  );
}