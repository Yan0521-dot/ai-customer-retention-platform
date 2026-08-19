import Stats from "@/components/dashboard/results/Stats";
import TrendChart from "@/components/dashboard/results/TrendChart";
import RiskTable from "@/components/dashboard/results/RiskTable";

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-8 py-10">

        <h1 className="text-5xl font-bold">
          Customer Retention Insights
        </h1>

        <p className="text-slate-400 mt-3 text-lg">
          AI has analysed your customer behaviour and identified opportunities to reduce churn.
        </p>

        <Stats />
 
       <TrendChart />

       <RiskTable />
      </div>

    </main>
  );
}
