"use client";

import { useState } from "react";
import RegisterChoice from "@/components/register/RegisterChoice";
import BusinessForm from "@/components/register/BusinessForm";
import PartnerForm from "@/components/register/PartnerForm";

export default function RegisterPage() {
  const [selected, setSelected] = useState<"business" | "partner" | null>(null);

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-12">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-center">
          Join RetainAI
        </h1>

        <p className="text-center text-slate-400 mt-4 max-w-2xl mx-auto">
          Choose how you'd like to use the platform.
        </p>

        {!selected && (
          <RegisterChoice onSelect={setSelected} />
        )}

        {selected === "business" && (
          <BusinessForm />
        )}

        {selected === "partner" && (
          <PartnerForm />
        )}

      </div>

    </main>
  );
}
