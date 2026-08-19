"use client";

import { useEffect, useState } from "react";
import { Bell, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Header() {
  const [companyName, setCompanyName] = useState("Loading...");

  useEffect(() => {
    async function loadCompany() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setCompanyName("Your Business");
        return;
      }

      const { data, error } = await supabase
        .from("users")
        .select("company_name")
        .eq("id", user.id)
        .single();

      if (error || !data) {
        console.error(error);
        setCompanyName("Your Business");
        return;
      }

      setCompanyName(data.company_name);
    }

    loadCompany();
  }, []);

  const hour = new Date().getHours();

  let greeting = "Good Evening 👋";

  if (hour < 12) {
    greeting = "Good Morning 👋";
  } else if (hour < 18) {
    greeting = "Good Afternoon 👋";
  }

  return (
    <div className="mb-10 flex items-center justify-between">
      <div>
        <p className="text-cyan-400 font-medium">
          {greeting}
        </p>

        <h1 className="mt-2 text-5xl font-bold">
          {companyName}
        </h1>

        <p className="mt-3 text-lg text-slate-400">
          AI has analysed your latest customer dataset.
        </p>
      </div>

      <div className="flex gap-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <Bell />
        </div>

        <div className="flex items-center gap-2 rounded-2xl bg-cyan-500 px-6 py-4 font-semibold">
          <Sparkles size={20} />
          Lumi AI
        </div>
      </div>
    </div>
  );
}
