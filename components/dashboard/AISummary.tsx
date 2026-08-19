"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AISummary() {
  const [summary, setSummary] = useState("Loading AI summary...");

  useEffect(() => {
    async function loadSummary() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setSummary("Please log in.");
        return;
      }

      // Get latest upload
      const { data: upload } = await supabase
        .from("uploads")
        .select("id")
        .eq("user_id", user.id)
        .order("uploaded_at", { ascending: false })
        .limit(1)
        .single();

      if (!upload) {
        setSummary("Upload a CSV to generate an AI summary.");
        return;
      }

      // Get latest analysis
      const { data: analysis } = await supabase
        .from("analyses")
        .select("summary")
        .eq("upload_id", upload.id)
        .single();

      if (!analysis) {
        setSummary("No AI summary found.");
        return;
      }

      setSummary(analysis.summary);
    }

    loadSummary();
  }, []);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="text-2xl font-bold text-cyan-400">
        AI Business Summary
      </h2>

      <p className="mt-4 text-slate-300 leading-7">
        {summary}
      </p>
    </div>
  );
}
