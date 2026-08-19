"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Brain,
  Sparkles,
  Database,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    icon: Database,
    text: "Reading customer dataset...",
  },
  {
    icon: Brain,
    text: "Finding behaviour patterns...",
  },
  {
    icon: TrendingUp,
    text: "Predicting churn signals...",
  },
  {
    icon: Sparkles,
    text: "Generating AI recommendations...",
  },
];

export default function AnalyzePage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (current < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrent(current + 1);
      }, 1800);

      return () => clearTimeout(timer);
    }

    const done = setTimeout(() => {
      router.push("/dashboard");
    }, 2000);

    return () => clearTimeout(done);
  }, [current]);

  const Icon = steps[current].icon;

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center text-white">

      <div className="w-[650px]">

        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-10">

          <Icon
            size={70}
            className="mx-auto text-cyan-400 animate-pulse"
          />

          <h1 className="text-4xl font-bold text-center mt-8">
            AI is Understanding Your Customers
          </h1>

          <p className="text-center text-slate-400 mt-4">
            Please wait while our AI analyses customer behaviour...
          </p>

          <div className="mt-12 space-y-5">

            {steps.map((step, index) => {
              const StepIcon = step.icon;

              return (
                <div
                  key={index}
                  className={`flex items-center gap-4 rounded-xl p-5 transition
                  ${
                    index <= current
                      ? "bg-cyan-500/10 border border-cyan-500"
                      : "bg-slate-800"
                  }`}
                >
                  {index < current ? (
                    <CheckCircle2 className="text-green-400" />
                  ) : (
                    <StepIcon className="text-cyan-400" />
                  )}

                  <span>{step.text}</span>
                </div>
              );
            })}

          </div>

        </div>

      </div>

    </main>
  );
}
