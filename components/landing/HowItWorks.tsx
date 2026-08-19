export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mx-auto mt-24 max-w-7xl px-6 pb-24"
    >
      <h2 className="text-center text-4xl font-bold text-white">
        How It Works
      </h2>

      <p className="mt-4 text-center text-slate-400">
        AI-powered customer retention in four simple steps.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="text-5xl">📂</div>

          <h3 className="mt-4 text-xl font-semibold">
            1. Upload Customer Data
          </h3>

          <p className="mt-3 text-slate-400">
            Upload your customer CSV containing purchases, transactions, and
            order history.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="text-5xl">🤖</div>

          <h3 className="mt-4 text-xl font-semibold">
            2. AI Analysis
          </h3>

          <p className="mt-3 text-slate-400">
            Our AI analyzes your dataset, identifies customers at risk of
            churning, detects issues, and generates actionable recommendations.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="text-5xl">🤝</div>

          <h3 className="mt-4 text-xl font-semibold">
            3. Smart Partner Matching
          </h3>

          <p className="mt-3 text-slate-400">
            Based on the AI recommendations, businesses are matched with
            verified partners that provide the right solutions for their needs.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="text-5xl">📈</div>

          <h3 className="mt-4 text-xl font-semibold">
            4. Improve Customer Retention
          </h3>

          <p className="mt-3 text-slate-400">
            Implement the recommendations, collaborate with partners, and
            improve customer satisfaction while reducing churn.
          </p>
        </div>
      </div>
    </section>
  );
}
