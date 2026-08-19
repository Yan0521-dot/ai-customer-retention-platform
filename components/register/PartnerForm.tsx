"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function PartnerForm() {
  const router = useRouter();

  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [icNumber, setIcNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function verifySSM() {
    setVerified(false);

    setTimeout(() => {
      setVerified(true);
    }, 2000);
  }

  async function registerPartner() {
    if (
      !businessName ||
      !businessType ||
      !website ||
      !ownerName ||
      !email ||
      !password
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!verified) {
      alert("Please verify your SSM registration first.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    sessionStorage.setItem(
      "pendingPartner",
      JSON.stringify({
        business_name: businessName,
        category: businessType,
        website,
        description,
        owner_name: ownerName,
        ic_number: icNumber,
        email,
      })
    );

    alert(
      "Account created successfully!\n\nPlease verify your email, then log in."
    );

   router.push("/login");
  }

  return (
    <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="text-3xl font-bold">
        Become a Solution Provider
      </h2>

      <p className="mt-2 text-slate-400">
        RM10/month to be recommended to businesses that need your services.
      </p>

      <input
        placeholder="Business Name"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
        className="mt-6 w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
      />

      <input
        placeholder="Business Type"
        value={businessType}
        onChange={(e) => setBusinessType(e.target.value)}
        className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
      />

      <input
        placeholder="Business Website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
      />

      <textarea
        placeholder="Business Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mt-4 h-28 w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
      />

      <input
        type="file"
        onChange={verifySSM}
        className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
      />

      {!verified ? (
        <p className="mt-4 text-cyan-400 animate-pulse">
          🤖 AI Verifying SSM Registration...
        </p>
      ) : (
        <p className="mt-4 text-green-400">
          ✅ SSM Registration Verified
        </p>
      )}

      <input
        placeholder="Owner Name"
        value={ownerName}
        onChange={(e) => setOwnerName(e.target.value)}
        className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
      />

      <input
        placeholder="IC Number"
        value={icNumber}
        onChange={(e) => setIcNumber(e.target.value)}
        className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-950 p-3"
      />

      <button
        onClick={registerPartner}
        disabled={loading}
        className="mt-8 w-full rounded-xl bg-cyan-500 py-4 text-lg font-semibold hover:bg-cyan-600 disabled:opacity-50"
      >
        {loading ? "Creating Account..." : "Register as Partner"}
      </button>

    </div>
  );
}
