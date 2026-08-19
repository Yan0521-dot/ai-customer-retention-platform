import Header from "@/components/dashboard/Header";
import Stats from "@/components/dashboard/results/Stats";
import TrendChart from "@/components/dashboard/results/TrendChart";
import RiskTable from "@/components/dashboard/results/RiskTable";
import AISummary from "@/components/dashboard/AISummary";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-8 py-10">
        <Header />

        <Stats />

        <div className="grid lg:grid-cols-3 gap-8 mt-10">
          <div className="lg:col-span-2">
            <TrendChart />
          </div>

          <AISummary />
        </div>

        <RiskTable />
      </div>
    </main>
  );
}
