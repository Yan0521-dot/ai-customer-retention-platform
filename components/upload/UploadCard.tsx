"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud, FileText } from "lucide-react";
import Papa from "papaparse";
import { supabase } from "@/lib/supabase";

export default function UploadCard() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [step, setStep] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setFileName(file.name);
    setLoading(true);

    setStep("Uploading dataset...");

    try {
      const csv = await file.text();

      const parsed = Papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
      });

      setTimeout(() => {
        setStep("Cleaning customer records...");
      }, 800);

      setTimeout(() => {
        setStep("Running AI churn prediction...");
      }, 1700);

      // Ask Gemini to analyze
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customers: parsed.data,
        }),
      });

      const json = await res.json();

      if (!json.success) {
        alert("AI analysis failed.");
        setLoading(false);
        return;
      }

      console.log("Full API Response:", json);

      // Get logged in user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log("Auth User:", user);

      if (!user) {
        alert("Please login first.");
        setLoading(false);
        return;
      }

      // Check matching profile
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      console.log("Matching Profile:", profile);
      console.log("Profile Error:", profileError);

      if (!profile) {
        alert("No matching user found in public.users");
        setLoading(false);
        return;
      }

      // Save upload
      const { data: upload, error: uploadError } = await supabase
        .from("uploads")
        .insert({
          user_id: profile.id,
          filename: file.name,
          csv_data: parsed.data,
        })
        .select()
        .single();

      console.log("Upload:", upload);
      console.log("Upload Error:", uploadError);

      if (uploadError) {
        console.error(uploadError);
        alert(uploadError.message);
        setLoading(false);
        return;
      }

      // Save analysis summary
      const { data: analysis, error: analysisError } = await supabase
        .from("analyses")
        .insert({
          upload_id: upload.id,
          summary: json.data.summary,
        })
        .select()
        .single();

      if (analysisError) {
        console.error(analysisError);
        alert(analysisError.message);
        setLoading(false);
        return;
      }

      // Save AI results
      const customerRows = json.data.customers.map((customer: any) => ({
        analysis_id: analysis.id,
        customer_name: customer.name,
        churn_risk: customer.churnRisk,
        reason: customer.reason,
        recommendation: customer.recommendation,
        recommended_partner: customer.recommendedPartner,
      }));

      const { error: customerError } = await supabase
        .from("customer_results")
        .insert(customerRows);

      if (customerError) {
        console.error(customerError);
        alert(customerError.message);
        setLoading(false);
        return;
      }

      sessionStorage.setItem(
        "uploadedCSV",
        JSON.stringify(parsed.data)
      );

      sessionStorage.setItem(
        "analysis",
        JSON.stringify(json.data.customers)
      );

      sessionStorage.setItem(
        "summary",
        json.data.summary
      );

      setTimeout(() => {
        setStep("Generating personalised recommendations...");
      }, 2600);

      setTimeout(() => {
        router.push("/dashboard");
      }, 4200);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while analysing the CSV.");
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-20">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-12">
        <UploadCloud
          size={70}
          className="mx-auto text-cyan-400"
        />

        <h1 className="text-4xl font-bold text-center mt-8">
          Upload Customer Dataset
        </h1>

        <p className="text-slate-400 text-center mt-4">
          Upload a CSV containing customer behaviour.
        </p>

        <input
          hidden
          ref={inputRef}
          type="file"
          accept=".csv"
          onChange={handleFile}
        />

        <button
          onClick={() => inputRef.current?.click()}
          disabled={loading}
          className="mt-10 w-full rounded-xl bg-cyan-500 py-4 text-xl hover:bg-cyan-600 transition disabled:opacity-50"
        >
          {loading ? "Processing..." : "Choose CSV File"}
        </button>

        {fileName && (
          <div className="mt-6 flex items-center gap-3 text-green-400">
            <FileText size={20} />
            {fileName}
          </div>
        )}

        {loading && (
          <div className="mt-10 rounded-2xl border border-slate-700 bg-slate-950 p-6">
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded-full bg-cyan-400 animate-ping"></div>

              <span className="font-semibold text-cyan-400">
                AI Engine Active
              </span>
            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-full bg-cyan-500 animate-pulse"></div>
            </div>

            <p className="mt-6 text-lg font-medium">
              {step}
            </p>

            <p className="mt-2 text-slate-500">
              Please wait while our AI analyses your customer data...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
