"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Users,
  AlertTriangle,
  TrendingUp,
  DollarSign,
} from "lucide-react";

interface Customer {
  name: string;
  churnRisk: number;
}

export default function Stats() {
  const [healthy, setHealthy] = useState(0);
  const [attention, setAttention] = useState(0);
  const [critical, setCritical] = useState(0);
  const [averageRisk, setAverageRisk] = useState(0);

  useEffect(() => {
    const stored = sessionStorage.getItem("analysis");

    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);

      const customers: Customer[] = Array.isArray(parsed)
        ? parsed
        : parsed.customers ?? [];

      if (customers.length === 0) return;

      setHealthy(
        customers.filter((c) => c.churnRisk < 40).length
      );

      setAttention(
        customers.filter(
          (c) => c.churnRisk >= 40 && c.churnRisk < 70
        ).length
      );

      setCritical(
        customers.filter((c) => c.churnRisk >= 70).length
      );

      const avg =
        customers.reduce(
          (sum, c) => sum + Number(c.churnRisk),
          0
        ) / customers.length;

      setAverageRisk(Math.round(avg));
    } catch (err) {
      console.error(err);
    }
  }, []);

  const stats = [
    {
      title: "Healthy Customers",
      value: healthy,
      icon: Users,
      color: "text-green-400",
    },
    {
      title: "Needs Attention",
      value: attention,
      icon: AlertTriangle,
      color: "text-yellow-400",
    },
    {
      title: "Critical Risk",
      value: critical,
      icon: TrendingUp,
      color: "text-red-400",
    },
    {
      title: "Average Churn Risk",
      value: `${averageRisk}%`,
      icon: DollarSign,
      color: "text-cyan-400",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <Card
            key={item.title}
            className="bg-slate-900 border-slate-800 rounded-3xl p-6 hover:border-cyan-500 transition-all hover:scale-105"
          >
            <Icon className={`${item.color} mb-6`} size={34} />

            <h2 className="text-4xl font-bold">
              {item.value}
            </h2>

            <p className="text-slate-400 mt-2">
              {item.title}
            </p>
          </Card>
        );
      })}
    </div>
  );
}
