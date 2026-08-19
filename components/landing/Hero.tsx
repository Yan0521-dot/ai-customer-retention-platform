"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Upload, BrainCircuit, Target } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">

      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-20 top-40 h-72 w-72 rounded-full bg-cyan-500/20 blur-[140px]" />
        <div className="absolute right-20 bottom-32 h-72 w-72 rounded-full bg-indigo-500/20 blur-[140px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-7xl text-center"
      >

        <p className="mb-4 uppercase tracking-[0.3em] text-cyan-400">
          AI Customer Retention Platform
        </p>

        <h1 className="text-6xl font-black leading-tight md:text-7xl">
          Understand Why
          <br />
          Customers Leave.
        </h1>

        <h2 className="mt-3 text-3xl font-semibold text-slate-300">
          Give Them A Reason To Stay.
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-400">
          Upload customer data, detect early churn signals, discover why
          customers are disengaging, and receive personalized retention
          strategies powered by AI.
        </p>

<div className="mt-10 flex justify-center gap-4 flex-wrap">

  <a
    href="/register"
    className="rounded-xl bg-cyan-500 px-8 py-4 text-lg font-semibold hover:bg-cyan-600 transition"
  >
    Check Your Business →
  </a>

  <a
    href="/register"
    className="rounded-xl border border-cyan-500 px-8 py-4 text-lg font-semibold text-cyan-400 hover:bg-cyan-500 hover:text-white transition"
  >
    Be a Solution to a Business →
  </a>

</div>

        {/* Features */}

        <div className="mt-24 grid gap-8 md:grid-cols-3">

          <Feature
            icon={<Upload size={34} />}
            title="Upload Customer Data"
            desc="Import CSV data from your CRM in seconds."
          />

          <Feature
            icon={<BrainCircuit size={34} />}
            title="AI Finds Hidden Risks"
            desc="Detect disengagement before customers silently churn."
          />

          <Feature
            icon={<Target size={34} />}
            title="Retention Strategy"
            desc="Receive personalized actions to keep customers engaged."
          />

        </div>

      </motion.div>
    </section>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all"
    >
      <div className="mb-5 flex justify-center text-cyan-400">
        {icon}
      </div>

      <h3 className="text-xl font-semibold">{title}</h3>

      <p className="mt-3 text-slate-400">
        {desc}
      </p>
    </motion.div>
  );
}
