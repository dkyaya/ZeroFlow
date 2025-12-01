// app/dashboard/page.jsx
// Dashboard with animated logo navbar, correct greeting,
// rotating daily subheadings, dynamic quick-nav, reordering button,
// and improved Foods card (scrollable + gradient).

import Link from "next/link";
import Logo from "../components/logo";
import { headers } from "next/headers";

// ---------------------------------------------------------
// FETCH SUMMARY
// ---------------------------------------------------------
async function getSummary() {
  const res = await fetch("http://localhost:3000/api/summary", {
    cache: "no-store",
  });

  if (!res.ok) {
    return {
      user: { firstName: "User", preferredName: null },
      caloriesTarget: 0,
      caloriesConsumed: 0,
      foods: [],
      workouts: [],
    };
  }

  return res.json();
}

// ---------------------------------------------------------
// DASHBOARD
// ---------------------------------------------------------
export default async function DashboardPage() {
  const summary = await getSummary();
  const {
    user,
    caloriesTarget,
    caloriesConsumed,
    foods = [],
    workouts = [],
  } = summary;

  // CURRENT ROUTE (for filtering quick-nav)
  const headersList = await headers();
  const currentPath =
    headersList.get("x-invoke-path") ||
    headersList.get("x-pathname") ||
    "";

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Log Food", href: "/food/log" },
    { name: "Log Workout", href: "/workout/log" },
    { name: "Summary", href: "/summary" },
    { name: "Settings", href: "/settings" },
  ];

  const filteredNav = navItems.filter((item) => item.href !== currentPath);

  // NAME LOGIC
  const name =
    user?.preferredName?.trim() ||
    user?.firstName?.trim() ||
    "User";

  // DATE
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  // ROTATING SUBHEADING
  const messages = [
    "Here’s your day at a glance.",
    "Let’s make today a strong one.",
    "Small steps, big movement.",
    "Fuel smart. Feel better.",
    "Your habits are building momentum.",
    "Every log gets you closer.",
    "Consistency outperforms intensity.",
    "Today is a great day to improve.",
    "Keep showing up. It works.",
    "Precision fuels progress.",
    "Good nutrition starts with awareness.",
    "Little adjustments, big long-term wins.",
    "Fuel choices shape performance.",
    "Eat for the work you want to do.",
    "Recovery starts with fueling right.",
    "Energy in → energy out.",
    "Training smarter starts here.",
    "The best athletes track.",
    "Let’s build something solid today.",
    "Proud of you for checking in.",
    "Your future self appreciates this.",
    "Keep going. You're doing better than you think.",
    "Slow and steady is still forward.",
    "Dashboard initialized.",
    "System calibrated for today.",
    "Fuel metrics updated.",
    "Your nutrition arc continues.",
    "Hydrate. Then dominate.",
  ];

  const idx = new Date().getDate() % messages.length;
  const dailyMessage = messages[idx];

  const remaining = Math.max(caloriesTarget - caloriesConsumed, 0);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* NAVBAR */}
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
          <Logo className="h-8 w-8" />
        </Link>
        <div className="text-sm text-slate-500">{today}</div>
      </nav>

      {/* GREETING */}
      <section className="mt-10 flex flex-col items-center">
        <h1 className="text-3xl font-semibold text-slate-900">Hello, {name}.</h1>
        <p className="text-slate-500 mt-1">{dailyMessage}</p>
      </section>

      {/* GRID CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 px-8 mt-12">

        {/* DAILY CALORIES CARD */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-slate-100">
          <h2 className="text-xl font-semibold mb-3">Daily Calories</h2>
          <p><span className="font-medium">Target:</span> {caloriesTarget} cal</p>
          <p><span className="font-medium">Consumed:</span> {caloriesConsumed} cal</p>
          <p className={`font-medium mt-2 ${remaining === 0 ? "text-red-600" : "text-green-700"}`}>
            Remaining: {remaining} cal
          </p>
        </div>

        {/* FOODS CARD — UPDATED */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-slate-100">
          <h2 className="text-xl font-semibold mb-4">Foods Today</h2>

          {foods.length === 0 ? (
            <p className="text-slate-600 text-sm">No foods logged yet.</p>
          ) : (
<div className="max-h-32 overflow-y-auto pr-2 relative">
  <ul className="flex flex-col gap-3">
    {foods.map((food, idx) => (
      <li
        key={idx}
        className="flex justify-between border-b pb-2 text-slate-700"
      >
        <span>{food.name}</span>
        <span>{food.calories} cal</span>
      </li>
    ))}
  </ul>

  {/* Gradient fade at bottom */}
  <div className="pointer-events-none absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent" />
</div>

          )}

          <Link href="/food/log" className="inline-block mt-6 text-blue-700 hover:underline">
            Log Food →
          </Link>
        </div>

        {/* WORKOUTS CARD */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-slate-100">
          <h2 className="text-xl font-semibold mb-4">Workouts</h2>

          {workouts.length === 0 ? (
            <p className="text-slate-600 text-sm">No workouts logged yet.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {workouts.map((w, idx) => (
                <li
                  key={idx}
                  className="flex justify-between border-b pb-2 text-slate-700"
                >
                  <span>{w.type} · {w.duration} min</span>
                  <span className="text-green-700">{w.caloriesBurned} cal</span>
                </li>
              ))}
            </ul>
          )}

          <Link href="/workout/log" className="inline-block mt-6 text-blue-700 hover:underline">
            Log Workout →
          </Link>
        </div>

      </section>

      {/* REORDER BUTTON */}
      <button
        className="
          fixed bottom-6 right-6 rounded-full w-12 h-12 bg-blue-700 
          text-white shadow-lg hover:bg-blue-800 flex items-center 
          justify-center text-xl
        "
        title="Reorder Dashboard"
      >
        ⠿
      </button>

      {/* QUICK NAV */}
      <div className="fixed bottom-20 right-6">
        <details className="group relative">
          <summary
            className="
              w-12 h-12 bg-slate-900 text-white rounded-full cursor-pointer
              shadow-lg flex items-center justify-center text-xl
              hover:bg-slate-800 list-none
            "
            title="Quick Navigation"
          >
            ☰
          </summary>

          <div className="absolute bottom-14 right-0 bg-white shadow-xl rounded-xl p-4 border border-slate-100 w-40">
            <div className="flex flex-col gap-2 text-sm">

              {filteredNav.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-blue-700">
                  {item.name}
                </Link>
              ))}

              <div className="border-t border-slate-200 pt-2 mt-2">
                <Link href="/login" className="text-red-600 hover:text-red-700">
                  Log Out
                </Link>
              </div>

            </div>
          </div>
        </details>
      </div>
    </main>
  );
}
