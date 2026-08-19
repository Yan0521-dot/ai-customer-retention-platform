import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";

export default function Home() {
  return (
<main className="min-h-screen overflow-x-hidden bg-slate-900 text-white">
      <Navbar />
      <Hero />
      <HowItWorks />
    </main>
  );
}
