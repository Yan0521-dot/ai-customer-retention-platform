"use client";

import { motion } from "framer-motion";
import { Building2, Handshake } from "lucide-react";

type Props = {
  onSelect: (type: "business" | "partner") => void;
};

export default function RegisterChoice({ onSelect }: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-8 mt-12">

      {/* Business Card */}

      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.25 }}
        onClick={() => onSelect("business")}
        className="cursor-pointer rounded-3xl border border-slate-800 bg-slate-900 p-10 hover:border-blue-500 transition-all"
      >

        <Building2
          size={54}
          className="text-blue-500"
        />

        <h2 className="text-3xl font-bold mt-6">
          Check Your Business
        </h2>

        <p className="text-slate-400 mt-4 leading-7">
          Upload your customer data and receive an AI-powered customer retention analysis with actionable recommendations.
        </p>

        <button className="mt-8 w-full rounded-xl bg-blue-600 py-4 text-lg font-semibold hover:bg-blue-700 transition">
          Continue
        </button>

      </motion.div>

      {/* Partner Card */}

      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.25 }}
        onClick={() => onSelect("partner")}
        className="cursor-pointer rounded-3xl border border-slate-800 bg-slate-900 p-10 hover:border-green-500 transition-all"
      >

        <Handshake
          size={54}
          className="text-green-500"
        />

        <h2 className="text-3xl font-bold mt-6">
          Become a Solution Partner
        </h2>

        <p className="text-slate-400 mt-4 leading-7">
          Register your business and let our AI recommend your services to companies that need help retaining customers.
        </p>

        <div className="mt-6 rounded-2xl bg-slate-800 p-4 border border-green-600">

          <p className="text-green-400 font-semibold">
            RM10 / month
          </p>

          <p className="text-sm text-slate-300 mt-2">
            Listed in AI recommendations • Increased exposure • Priority placement
          </p>

        </div>

        <button className="mt-8 w-full rounded-xl bg-green-600 py-4 text-lg font-semibold hover:bg-green-700 transition">
          Join Now
        </button>

      </motion.div>

    </div>
  );
}
