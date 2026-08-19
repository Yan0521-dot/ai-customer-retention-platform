"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PartnerDashboard() {
  const [loading, setLoading] = useState(true);
  const [partner, setPartner] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    async function loadDashboard() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
         window.location.href = "/login";
        return;
      }

      // Load partner profile
      const { data: partnerData, error: partnerError } = await supabase
        .from("partners")
        .select("*")
        .eq("email", user.email)
        .single();

      if (partnerError || !partnerData) {
        console.error(partnerError);
        setLoading(false);
        return;
      }

      setPartner(partnerData);

      // Load matching customer results
      const { data: customerResults, error: customerError } = await supabase
        .from("customer_results")
        .select("*")
        .eq("recommended_partner", partnerData.category)
        .order("churn_risk", { ascending: false });

      if (customerError) {
        console.error(customerError);
        setLoading(false);
        return;
      }

      const finalLeads = [];

      for (const result of customerResults || []) {
        // analysis
        const { data: analysis } = await supabase
          .from("analyses")
          .select("*")
          .eq("id", result.analysis_id)
          .single();

        if (!analysis) continue;

        // upload
        const { data: upload } = await supabase
          .from("uploads")
          .select("*")
          .eq("id", analysis.upload_id)
          .single();

        if (!upload) continue;

        // business
        const { data: business } = await supabase
          .from("users")
          .select("*")
          .eq("id", upload.user_id)
          .single();

        if (!business) continue;

        finalLeads.push({
          ...result,
          company_name: business.company_name,
          business_type: business.business_type,
          filename: upload.filename,
        });
      }

      setLeads(finalLeads);
      setLoading(false);
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  if (!partner) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Partner profile not found.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-5xl font-bold">
        Welcome, {partner.business_name}
      </h1>

      <p className="mt-2 text-slate-400">
        Category: {partner.category}
      </p>

      <h2 className="mt-10 text-3xl font-bold">
        Businesses needing {partner.category}
      </h2>

      {leads.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-8">
          No matching businesses found.
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
            >
              <h3 className="text-2xl font-bold">
                {lead.company_name}
              </h3>

              <p className="text-slate-400">
                {lead.business_type}
              </p>

              <p className="mt-4">
                <span className="font-semibold">Customer:</span>{" "}
                {lead.customer_name}
              </p>

              <p className="mt-2 text-red-400 font-bold">
                Churn Risk: {lead.churn_risk}%
              </p>

              <p className="mt-4 text-slate-300">
                {lead.reason}
              </p>

              <div className="mt-5 rounded-xl bg-slate-950 border border-slate-800 p-4">
                <p className="font-semibold text-cyan-400">
                  AI Recommendation
                </p>

                <p className="mt-2 text-slate-300">
                  {lead.recommendation}
                </p>
              </div>

              <p className="mt-4 text-sm text-slate-500">
                Dataset: {lead.filename}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
