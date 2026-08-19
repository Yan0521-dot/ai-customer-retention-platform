"use client";

import { useEffect } from "react";
import { Sparkles } from "lucide-react";

export default function AnalyzePage() {

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/dashboard/results";
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center text-white">

      <div className="text-center">

        <Sparkles
          size={80}
          className="mx-auto animate-pulse text-cyan-400"
        />

        <h1 className="text-5xl font-bold mt-8">
          Understanding Customer Behaviour...
        </h1>

        <p className="text-slate-400 mt-4">
          Detecting churn signals and generating retention strategies.
        </p>

      </div>

    </main>
  );
}
