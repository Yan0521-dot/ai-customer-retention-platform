"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

async function login() {
  setLoading(true);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    setLoading(false);
    return;
  }

  if (!data.user) {
    alert("Unable to login.");
    setLoading(false);
    return;
  }

  // -----------------------------
  // Save pending BUSINESS profile
  // -----------------------------
  const pendingProfile = sessionStorage.getItem("pendingProfile");

  if (pendingProfile) {
    const profile = JSON.parse(pendingProfile);

    const { error: dbError } = await supabase
      .from("users")
      .upsert({
        id: data.user.id,
        full_name: profile.full_name,
        company_name: profile.company_name,
        business_type: profile.business_type,
        email: profile.email,
      });

    if (dbError) {
      alert(dbError.message);
      setLoading(false);
      return;
    }

    sessionStorage.removeItem("pendingProfile");
  }

  // -----------------------------
  // Save pending PARTNER profile
  // -----------------------------
  const pendingPartner = sessionStorage.getItem("pendingPartner");

  if (pendingPartner) {
    const partner = JSON.parse(pendingPartner);

    const { error: partnerError } = await supabase
      .from("partners")
      .insert({
        business_name: partner.business_name,
        category: partner.category,
        website: partner.website,
        description: partner.description,
        owner_name: partner.owner_name,
        email: partner.email,
        verified: true,
      });

    if (partnerError) {
      console.error(partnerError);
    }

    sessionStorage.removeItem("pendingPartner");
  }

  // -----------------------------
  // Check partner account
  // -----------------------------
  const { data: partnerData, error: checkError } = await supabase
    .from("partners")
    .select("*")
    .eq("email", data.user.email)
    .maybeSingle();

  console.log("Logged in email:", data.user.email);
  console.log("Partner found:", partnerData);
  console.log("Partner error:", checkError);

  setLoading(false);

  if (partnerData) {
    console.log("Redirecting -> /partner");
    router.push("/partner");
  } else {
    console.log("Redirecting -> /upload");
    router.push("/upload");
  }
}

  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8">

        <h1 className="text-3xl font-bold text-white">
          Login
        </h1>

        <p className="mt-2 text-slate-400">
          Login to continue.
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-6 w-full rounded-xl border border-slate-700 bg-slate-800 p-4 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-800 p-4 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <button
          onClick={login}
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-cyan-500 py-4 font-semibold text-white hover:bg-cyan-600 transition disabled:opacity-50"
        >
          {loading ? "Signing In..." : "Login"}
        </button>

      </div>
    </main>
  );
}
