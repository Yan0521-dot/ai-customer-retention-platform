"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import RecommendationPanel from "./RecommendationPanel";

interface Customer {
  name: string;
  churnRisk: number;
  reason: string;
  recommendation: string;
  recommendedPartner: string;
}

export default function RiskTable() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function loadCustomers() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      // Latest upload
      const { data: upload, error: uploadError } = await supabase
        .from("uploads")
        .select("id")
        .eq("user_id", user.id)
        .order("uploaded_at", { ascending: false })
        .limit(1)
        .single();

      if (uploadError || !upload) {
        console.error(uploadError);
        return;
      }

      // Analysis for that upload
      const { data: analysis, error: analysisError } = await supabase
        .from("analyses")
        .select("id")
        .eq("upload_id", upload.id)
        .single();

      if (analysisError || !analysis) {
        console.error(analysisError);
        return;
      }

      // Customer results
      const { data, error } = await supabase
        .from("customer_results")
        .select("*")
        .eq("analysis_id", analysis.id)
        .order("churn_risk", { ascending: false });

      if (error) {
        console.error(error);
        return;
      }

      setCustomers(
        data.map((row) => ({
          name: row.customer_name,
          churnRisk: row.churn_risk,
          reason: row.reason,
          recommendation: row.recommendation,
          recommendedPartner: row.recommended_partner,
        }))
      );
    }

    loadCustomers();
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-6">
        High-Risk Customers
      </h2>

      {customers.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-slate-400">
          No AI analysis found.
          <br />
          Upload a CSV to begin.
        </div>
      ) : (
        <div className="space-y-5">
          {customers.map((customer) => (
            <div
              key={customer.name}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-cyan-500 transition"
            >
              <div className="flex justify-between items-start">
                <div className="max-w-xl">
                  <h3 className="text-xl font-semibold">
                    {customer.name}
                  </h3>

                  <p className="mt-2 text-slate-400 line-clamp-2">
                    {customer.reason}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-red-400">
                  <AlertTriangle size={18} />

                  <span className="font-bold text-lg">
                    {customer.churnRisk}%
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedCustomer(customer);
                  setOpen(true);
                }}
                className="mt-6 flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 hover:bg-cyan-600 transition"
              >
                View AI Recommendation
                <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      <RecommendationPanel
        open={open}
        setOpen={setOpen}
        customer={selectedCustomer}
      />
    </div>
  );
}
