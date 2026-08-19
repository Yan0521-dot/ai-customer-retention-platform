"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";

import {
  Sparkles,
  Brain,
  Lightbulb,
  TrendingUp,
  Building2,
} from "lucide-react";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  customer: any;
}

export default function RecommendationPanel({
  open,
  setOpen,
  customer,
}: Props) {
  const [partner, setPartner] = useState<any>(null);

  useEffect(() => {
    async function loadPartner() {
      if (!customer?.recommendedPartner) {
        setPartner(null);
        return;
      }

      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .eq("category", customer.recommendedPartner)
        .eq("verified", true)
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error(error);
        return;
      }

      setPartner(data);
    }

    loadPartner();
  }, [customer]);

  if (!customer) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="bg-slate-950 text-white border-slate-800 w-[520px] sm:max-w-[520px] overflow-y-auto">

        <SheetHeader>
          <SheetTitle className="text-2xl flex items-center gap-2 text-white">
            <Sparkles className="text-cyan-400" />
            AI Retention Assistant
          </SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-6">

          {/* Customer */}

          <div>
            <h2 className="text-2xl font-bold">
              {customer.name}
            </h2>

            <Badge className="mt-3 bg-red-500/20 border-red-500 text-red-400">
              High Churn Risk • {customer.churnRisk}%
            </Badge>
          </div>

          {/* Why */}

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

            <div className="mb-3 flex items-center gap-2">
              <Brain className="text-cyan-400" />
              <h3 className="font-semibold">
                Why AI Flagged This Customer
              </h3>
            </div>

            <p className="leading-7 text-slate-300">
              {customer.reason}
            </p>

          </div>

          {/* Recommendation */}

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

            <div className="mb-3 flex items-center gap-2">
              <Lightbulb className="text-yellow-400" />
              <h3 className="font-semibold">
                AI Recommendation
              </h3>
            </div>

            <p className="leading-7 text-slate-300">
              {customer.recommendation}
            </p>

          </div>

          {/* Partner */}

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">

            <div className="mb-3 flex items-center gap-2">
              <Building2 className="text-cyan-400" />
              <h3 className="font-semibold">
                Recommended Business Partner
              </h3>
            </div>

            <p className="text-cyan-400 font-semibold">
              {customer.recommendedPartner}
            </p>

            <div className="mt-5 rounded-xl border border-slate-700 bg-slate-950 p-5">

              {partner ? (
                <>
                  <h4 className="text-lg font-bold text-cyan-400">
                    {partner.business_name}
                  </h4>

                  <p className="mt-2 text-slate-400">
                    {partner.description}
                  </p>

                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-block rounded-xl bg-cyan-500 px-5 py-3 font-semibold transition hover:bg-cyan-600"
                  >
                    Visit Business →
                  </a>
                </>
              ) : (
                <div>
                  <h4 className="text-lg font-bold text-slate-400">
                    No Verified Partner
                  </h4>

                  <p className="mt-2 text-slate-500">
                    There are currently no verified partners registered under
                    the "{customer.recommendedPartner}" category.
                  </p>
                </div>
              )}

            </div>

          </div>

          {/* Impact */}

          <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-5">

            <div className="mb-3 flex items-center gap-2">
              <TrendingUp className="text-green-400" />
              <h3 className="font-semibold">
                Predicted Business Impact
              </h3>
            </div>

            <p className="text-slate-300">
              If the recommended action is implemented within the next
              <span className="font-bold text-green-400"> 48 hours</span>,
              the AI predicts a significant increase in customer retention and
              long-term engagement.
            </p>

          </div>

        </div>

      </SheetContent>
    </Sheet>
  );
}
