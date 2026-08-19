"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function BusinessForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    businessName: "",
    businessType: "",
    owner: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  async function registerBusiness() {
    if (
      !form.businessName ||
      !form.businessType ||
      !form.owner ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      // Create Supabase Auth user
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });
      console.log("User:", data.user);
      console.log("Session:", data.session);

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      if (!data.user) {
        alert("Unable to create account.");
        setLoading(false);
        return;
      }


const user = data.user;

const { error: insertError } = await supabase
  .from("users")
  .insert({
    id: user.id,
    full_name: form.owner,
    company_name: form.businessName,
    email: form.email,
    business_type: form.businessType,
  });

if (insertError) {
  alert(insertError.message);
  setLoading(false);
  return;
}

alert(
  "Account created successfully!\n\nPlease verify your email before logging in."
);

router.push("/login");


alert(
  "Account created successfully!\n\nPlease verify your email before logging in."
);

router.push("/login");
return;

      // Save business name locally until dashboard reads from DB
      sessionStorage.setItem("companyName", form.businessName);

      router.push("/upload");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto mt-12">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10">

        <h2 className="text-3xl font-bold">
          Business Registration
        </h2>

        <p className="text-slate-400 mt-2">
          Fill in your business details to start your AI-powered analysis.
        </p>

        <div className="space-y-6 mt-8">

          <div>
            <label className="block mb-2 text-slate-300">
              Business Name
            </label>

            <input
              className="w-full rounded-xl bg-slate-800 border border-slate-700 p-4 outline-none focus:border-cyan-500"
              placeholder="ABC Enterprise"
              value={form.businessName}
              onChange={(e) =>
                setForm({
                  ...form,
                  businessName: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 text-slate-300">
              Business Type
            </label>

            <select
              className="w-full rounded-xl bg-slate-800 border border-slate-700 p-4"
              value={form.businessType}
              onChange={(e) =>
                setForm({
                  ...form,
                  businessType: e.target.value,
                })
              }
            >
              <option value="">Select Business Type</option>
              <option>Restaurant</option>
              <option>Cafe</option>
              <option>Retail</option>
              <option>E-Commerce</option>
              <option>Beauty & Salon</option>
              <option>Gym & Fitness</option>
              <option>Technology</option>
              <option>Education</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-slate-300">
              Business Owner
            </label>

            <input
              className="w-full rounded-xl bg-slate-800 border border-slate-700 p-4 outline-none focus:border-cyan-500"
              placeholder="John Tan"
              value={form.owner}
              onChange={(e) =>
                setForm({
                  ...form,
                  owner: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 text-slate-300">
              Email Address
            </label>

            <input
              type="email"
              className="w-full rounded-xl bg-slate-800 border border-slate-700 p-4 outline-none focus:border-cyan-500"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 text-slate-300">
              Password
            </label>

            <input
              type="password"
              className="w-full rounded-xl bg-slate-800 border border-slate-700 p-4 outline-none focus:border-cyan-500"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 text-slate-300">
              Confirm Password
            </label>

            <input
              type="password"
              className="w-full rounded-xl bg-slate-800 border border-slate-700 p-4 outline-none focus:border-cyan-500"
              placeholder="••••••••"
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({
                  ...form,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>

          <button
            onClick={registerBusiness}
            disabled={loading}
            className="w-full rounded-xl bg-cyan-500 py-4 text-lg font-semibold hover:bg-cyan-600 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account & Continue →"}
          </button>

        </div>

      </div>
    </div>
  );
}
