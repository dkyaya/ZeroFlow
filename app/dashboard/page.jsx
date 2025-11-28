// app/dashboard/page.jsx
// ZeroFlow Dashboard — Clean, modern, responsive dashboard for daily stats.

import Navbar from "../components/Navbar";

async function getSummary() {
  const res = await fetch("http://localhost:3000/api/summary/route", {
    cache: "no-store",
  });

  if (!res.ok) {
    return {
      caloriesTarget: 0,
      caloriesConsumed: 0,
      foods: [],
    };
  }

  return res.json();
}

export default async function DashboardPage() {
  const summary = await getSummary();

  const { caloriesTarget, caloriesConsumed, foods } = summary;
  const remaining = Math.max(caloriesTarget - caloriesConsumed, 0);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* NAV */}
      <Navbar />

      {/* PAGE CONTENT */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold text-slate-900 mb-8">
          Today’s Overview
        </h1>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* STATS CARD */}
          <section className="bg-white shadow-md rounded-2xl p-8 border border-slate-100">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">
              Daily Summary
            </h2>

            <div className="space-y-4 text-slate-700">
              <p>
                <span className="font-medium">Calorie Target:</span>{" "}
                {caloriesTarget} kcal
              </p>

              <p>
                <span className="font-medium">Consumed:</span>{" "}
                {caloriesConsumed} kcal
              </p>

              <p>
                <span
                  className={`font-medium ${
                    remaining === 0 ? "text-red-600" : "text-green-700"
                  }`}
                >
                  Remaining:
                </span>{" "}
                {remaining} kcal
              </p>
            </div>
          </section>

          {/* FOOD LOG */}
          <section className="bg-white shadow-md rounded-2xl p-8 border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Foods Logged Today
              </h2>
              <a
                href="/food/log"
                className="px-4 py-2 rounded-lg bg-blue-700 text-white text-sm font-medium hover:bg-blue-800 transition shadow-sm"
              >
                + Add Food
              </a>
            </div>

            {foods.length === 0 ? (
              <p className="text-slate-500 text-sm">
                Nothing logged yet. Start tracking your meals.
              </p>
            ) : (
              <ul className="space-y-4">
                {foods.map((f, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between border-b pb-3 text-slate-700"
                  >
                    <span className="font-medium">{f.name}</span>
                    <span>{f.calories} kcal</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

        </div>
      </div>
    </main>
  );
}
