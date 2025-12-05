"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "../components/logo";

const goalLabels = {
  lose: "Weight Loss",
  maintain: "Maintenance",
  gain: "Muscle Gain",
  performance: "Performance",
};

export default function SummaryPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/summary/weekly")
      .then((res) => res.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setData(d);
      })
      .catch(() => setError("Failed to load summary"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-500">Loading weekly summary...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white shadow rounded-xl p-6 border text-center max-w-md">
          <p className="text-red-600">{error}</p>
          <Link href="/dashboard" className="mt-4 inline-block text-blue-700 hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  const { user, dailyStats, weeklyTotals, weeklyAverages } = data;
  const name = user?.preferredName || user?.firstName || "";
  const goalLabel = goalLabels[user?.goal] || "Maintenance";

  // Find max for chart scaling
  const maxCals = Math.max(...dailyStats.map((d) => d.calories), 100);
  const maxBurned = Math.max(...dailyStats.map((d) => d.burned), 100);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* NAVBAR */}
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/dashboard" className="hover:text-blue-700">Dashboard</Link>
          <Link href="/summary" className="font-medium text-blue-700">Summary</Link>
          <Link href="/settings" className="hover:text-blue-700">Settings</Link>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 mt-10">
        <h1 className="text-3xl font-semibold text-center">Weekly Summary</h1>
        <p className="text-slate-500 text-center mt-1">
          {name ? `${name}'s` : "Your"} last 7 days at a glance
        </p>
        <div className="flex justify-center mt-2">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
            Goal: {goalLabel}
          </span>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white rounded-xl shadow border border-slate-100 p-4 text-center">
            <p className="text-3xl font-bold text-blue-700">{weeklyTotals.daysLogged}</p>
            <p className="text-sm text-slate-500 mt-1">Days Logged</p>
          </div>
          <div className="bg-white rounded-xl shadow border border-slate-100 p-4 text-center">
            <p className="text-3xl font-bold text-green-600">{weeklyTotals.workoutsLogged}</p>
            <p className="text-sm text-slate-500 mt-1">Workout Days</p>
          </div>
          <div className="bg-white rounded-xl shadow border border-slate-100 p-4 text-center">
            <p className="text-3xl font-bold text-slate-800">{weeklyTotals.workoutMins}</p>
            <p className="text-sm text-slate-500 mt-1">Minutes Active</p>
          </div>
          <div className="bg-white rounded-xl shadow border border-slate-100 p-4 text-center">
            <p className="text-3xl font-bold text-orange-600">{weeklyTotals.burned}</p>
            <p className="text-sm text-slate-500 mt-1">Calories Burned</p>
          </div>
        </div>

        {/* AVERAGES */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 mt-6">
          <h2 className="text-lg font-semibold mb-4">Daily Averages</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-slate-800">{weeklyAverages.calories}</p>
              <p className="text-sm text-slate-500">Calories</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-700">{weeklyAverages.protein}g</p>
              <p className="text-sm text-slate-500">Protein</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-500">{weeklyAverages.carbs}g</p>
              <p className="text-sm text-slate-500">Carbs</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-900">{weeklyAverages.fat}g</p>
              <p className="text-sm text-slate-500">Fat</p>
            </div>
          </div>
        </div>

        {/* CALORIES CHART */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 mt-6">
          <h2 className="text-lg font-semibold mb-4">Calories Consumed</h2>
          <div className="flex items-end justify-between h-40 gap-2">
            {dailyStats.map((day, i) => {
              const h = day.calories > 0 ? Math.max((day.calories / maxCals) * 100, 5) : 3;
              return (
                <div key={i} className="flex flex-col items-center gap-1 flex-1 h-full justify-end">
                  <div className="w-full bg-slate-100 rounded-t relative group flex items-end" style={{ height: "100%" }}>
                    <div
                      className={`w-full rounded-t transition-all duration-500 absolute bottom-0 ${
                        day.calories > 0 ? "bg-blue-500" : "bg-slate-200"
                      }`}
                      style={{ height: `${h}%` }}
                    >
                      {day.calories > 0 && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10">
                          {day.calories} cal
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">{day.dayName}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* WORKOUTS CHART */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 mt-6">
          <h2 className="text-lg font-semibold mb-4">Calories Burned</h2>
          <div className="flex items-end justify-between h-40 gap-2">
            {dailyStats.map((day, i) => {
              const h = day.burned > 0 ? Math.max((day.burned / maxBurned) * 100, 5) : 3;
              return (
                <div key={i} className="flex flex-col items-center gap-1 flex-1 h-full justify-end">
                  <div className="w-full bg-slate-100 rounded-t relative group flex items-end" style={{ height: "100%" }}>
                    <div
                      className={`w-full rounded-t transition-all duration-500 absolute bottom-0 ${
                        day.burned > 0 ? "bg-green-500" : "bg-slate-200"
                      }`}
                      style={{ height: `${h}%` }}
                    >
                      {day.burned > 0 && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10">
                          {day.burned} cal
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">{day.dayName}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* DAILY BREAKDOWN TABLE */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 mt-6">
          <h2 className="text-lg font-semibold mb-4">Daily Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 px-2 font-medium text-slate-600">Day</th>
                  <th className="text-right py-2 px-2 font-medium text-slate-600">Calories</th>
                  <th className="text-right py-2 px-2 font-medium text-slate-600">Protein</th>
                  <th className="text-right py-2 px-2 font-medium text-slate-600">Carbs</th>
                  <th className="text-right py-2 px-2 font-medium text-slate-600">Fat</th>
                  <th className="text-right py-2 px-2 font-medium text-slate-600">Burned</th>
                </tr>
              </thead>
              <tbody>
                {dailyStats.map((day, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-2 px-2 font-medium">{day.dayName}</td>
                    <td className="py-2 px-2 text-right">{day.calories || "-"}</td>
                    <td className="py-2 px-2 text-right">{day.protein || "-"}g</td>
                    <td className="py-2 px-2 text-right">{day.carbs || "-"}g</td>
                    <td className="py-2 px-2 text-right">{day.fat || "-"}g</td>
                    <td className="py-2 px-2 text-right text-green-600">{day.burned || "-"}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50 font-semibold">
                  <td className="py-2 px-2">Total</td>
                  <td className="py-2 px-2 text-right">{weeklyTotals.calories}</td>
                  <td className="py-2 px-2 text-right">{weeklyTotals.protein}g</td>
                  <td className="py-2 px-2 text-right">{weeklyTotals.carbs}g</td>
                  <td className="py-2 px-2 text-right">{weeklyTotals.fat}g</td>
                  <td className="py-2 px-2 text-right text-green-600">{weeklyTotals.burned}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* BACK LINK */}
        <div className="text-center mt-8">
          <Link href="/dashboard" className="text-blue-700 hover:underline">
            ← Back to Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
