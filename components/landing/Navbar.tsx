"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/50 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-white hover:text-cyan-400 transition"
        >
          AI Customer Retention
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <a
            href="#features"
            className="text-slate-300 hover:text-cyan-400 transition"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-slate-300 hover:text-cyan-400 transition"
          >
            How It Works
          </a>

          <Link
            href="/login"
            className="rounded-lg border border-slate-700 px-4 py-2 text-white hover:bg-slate-800 transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-lg bg-cyan-500 px-5 py-2 font-semibold text-white hover:bg-cyan-600 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
