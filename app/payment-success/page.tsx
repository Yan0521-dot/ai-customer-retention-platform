"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function PaymentSuccess() {
  const router = useRouter();

  useEffect(() => {
    async function savePartner() {
      try {
        const pending = sessionStorage.getItem("pendingPartner");

        if (!pending) {
          router.push("/partner");
          return;
        }

        const partner = JSON.parse(pending);

        const { error } = await supabase
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

        if (error) {
          console.error(error);
          alert(error.message);
          return;
        }

        sessionStorage.removeItem("pendingPartner");

        setTimeout(() => {
          router.push("/partner");
        }, 3000);
      } catch (err) {
        console.error(err);
        alert("Failed to save partner.");
      }
    }

    savePartner();
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="text-center">
        <div className="text-7xl">✅</div>

        <h1 className="text-5xl font-bold mt-6">
          Subscription Successful
        </h1>

        <p className="text-slate-400 mt-4">
          Saving your partner profile...
        </p>
      </div>
    </main>
  );
}
