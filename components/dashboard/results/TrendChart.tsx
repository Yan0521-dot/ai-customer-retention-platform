"use client";

import { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

interface ChartData {
  month: string;
  risk: number;
}

export default function TrendChart() {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const csv = sessionStorage.getItem("uploadedCSV");

    if (!csv) return;

    const rows = JSON.parse(csv);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthMap: Record<string, number[]> = {};

    rows.forEach((row: any) => {
      if (!row.last_purchase) return;

      const date = new Date(row.last_purchase);

      if (isNaN(date.getTime())) return;

      const month = months[date.getMonth()];

      if (!monthMap[month]) {
        monthMap[month] = [];
      }

      const inactive = Number(row.days_inactive ?? 0);

      const risk = Math.min(
        100,
        inactive * 2 +
          Math.max(
            0,
            30 - Number(row.purchase_frequency ?? 0) * 5
          )
      );

      monthMap[month].push(risk);
    });

    const chart = Object.keys(monthMap).map((month) => ({
      month,
      risk:
        Math.round(
          monthMap[month].reduce((a, b) => a + b, 0) /
            monthMap[month].length
        ) || 0,
    }));

    setData(chart);
  }, []);

  return (
    <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-8">

      <div className="flex items-center justify-between mb-8">

        <div>
          <h2 className="text-2xl font-bold">
            Customer Retention Trend
          </h2>

          <p className="text-slate-400 mt-1">
            AI detected changes in customer engagement over time.
          </p>
        </div>

        <div className="rounded-xl bg-cyan-500/10 border border-cyan-500 px-4 py-2 text-cyan-400 font-semibold">
          Live Analysis
        </div>

      </div>

      {data.length === 0 ? (
        <div className="h-[340px] flex items-center justify-center text-slate-400">
          Upload a dataset containing <b className="mx-1">last_purchase</b>
          dates to generate the trend.
        </div>
      ) : (
        <div className="h-[340px]">

          <ResponsiveContainer width="100%" height="100%">

            <AreaChart data={data}>

              <defs>

                <linearGradient
                  id="colorRisk"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#06b6d4"
                    stopOpacity={0.6}
                  />

                  <stop
                    offset="95%"
                    stopColor="#06b6d4"
                    stopOpacity={0}
                  />
                </linearGradient>

              </defs>

              <CartesianGrid
                stroke="#1e293b"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="month"
                stroke="#94a3b8"
              />

              <YAxis
                stroke="#94a3b8"
                domain={[0, 100]}
              />

              <Tooltip
                contentStyle={{
                  background: "#0f172a",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                }}
              />

              <Area
                type="monotone"
                dataKey="risk"
                fill="url(#colorRisk)"
                stroke="none"
              />

              <Line
                type="monotone"
                dataKey="risk"
                stroke="#06b6d4"
                strokeWidth={4}
                dot={{
                  r: 5,
                  fill: "#06b6d4",
                }}
                activeDot={{
                  r: 8,
                }}
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>
      )}

    </div>
  );
}
