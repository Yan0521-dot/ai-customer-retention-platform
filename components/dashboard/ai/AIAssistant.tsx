"use client";

import { Sparkles, Send } from "lucide-react";
import { useState } from "react";

const replies: Record<string, string> = {
  "Sarah Lim":
    "Sarah's purchase frequency has declined by 61% over the last 18 days. Recommend sending a personalized loyalty voucher within 48 hours.",

  "Jason Tan":
    "Jason is buying less frequently than usual. AI suggests recommending products similar to previous purchases.",

  "Emily Wong":
    "Emily recently left negative support feedback. Prioritize customer support follow-up before promotional offers.",
};

export default function AIAssistant() {
  const [answer, setAnswer] = useState(
    "Select a customer to view AI insights."
  );

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 h-full">

      <div className="flex items-center gap-3 mb-6">

        <Sparkles className="text-cyan-400"/>

        <h2 className="text-2xl font-bold">
          Lumi AI
        </h2>

      </div>

      <div className="space-y-3">

        {Object.keys(replies).map((customer) => (

          <button
            key={customer}
            onClick={() => setAnswer(replies[customer])}
            className="w-full rounded-xl bg-slate-800 hover:bg-slate-700 transition p-3 text-left"
          >
            {customer}
          </button>

        ))}

      </div>

      <div className="mt-8 rounded-2xl bg-slate-800 p-5 min-h-[180px]">

        <p className="leading-7 text-slate-300">
          {answer}
        </p>

      </div>

      <button className="mt-6 w-full rounded-xl bg-cyan-500 py-3 hover:bg-cyan-600 transition flex justify-center gap-2">

        <Send size={18}/>

        Generate Strategy

      </button>

    </div>
  );
}
