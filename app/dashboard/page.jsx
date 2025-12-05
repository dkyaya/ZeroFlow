// app/dashboard/page.jsx
// Dashboard with calorie tracking, macro goals, workout stats

import Link from "next/link";
import Logo from "../components/logo";
import { headers, cookies } from "next/headers";

// ---------------------------------------------------------
// FETCH SUMMARY
// ---------------------------------------------------------
async function getSummary() {
  const headerStore = await headers();
  const cookieStore = await cookies();
  const host =
    headerStore.get("x-forwarded-host") ||
    headerStore.get("host") ||
    "localhost:3000";
  const protocol =
    headerStore.get("x-forwarded-proto") ||
    (host.includes("localhost") ? "http" : "https");
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${baseUrl}/api/summary`, {
    cache: "no-store",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Summary fetch failed: ${res.status}`);
  }
  return res.json();
}

// Goal display names
const goalLabels = {
  lose: "Weight Loss",
  maintain: "Maintenance",
  gain: "Muscle Gain",
  performance: "Performance",
};

// ---------------------------------------------------------
// DASHBOARD
// ---------------------------------------------------------
export default async function DashboardPage() {
  let summary;
  try {
    summary = await getSummary();
  } catch (e) {
    return (
      <main className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center">
        <div className="bg-white shadow rounded-xl p-6 border border-slate-200 max-w-md text-center">
          <p className="font-semibold text-slate-900 mb-2">Unable to load dashboard</p>
          <p className="text-slate-600 text-sm">{e.message}</p>
          <Link href="/login" className="mt-4 inline-block text-blue-700 hover:underline">
            Return to login
          </Link>
        </div>
      </main>
    );
  }

  const {
    user,
    caloriesTarget = 0,
    caloriesConsumed = 0,
    caloriesBurnedToday = 0,
    macros = { protein: 0, carbs: 0, fat: 0 },
    macrosTarget = { protein: 150, carbs: 200, fat: 65 },
    foods = [],
    workouts = [],
    weeklyWorkoutStats = [],
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
    { name: "Manage Foods", href: "/food/manage" },
    { name: "Log Workout", href: "/workout/log" },
    { name: "Summary", href: "/summary" },
    { name: "Settings", href: "/settings" },
  ];

  const filteredNav = navItems.filter((item) => item.href !== currentPath);

  // NAME LOGIC
  const name = user?.preferredName?.trim() || user?.firstName?.trim() || "";
  const userGoal = user?.goal || "maintain";
  const goalLabel = goalLabels[userGoal] || "Maintenance";

  // DATE
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  // ROTATING SUBHEADING
  const messages = [
    "Here's your day at a glance.",
    "Let's make today a strong one.",
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
    "Let's build something solid today.",
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

  // NET CALORIES: Target + Burned - Consumed = Remaining
  const effectiveTarget = caloriesTarget + caloriesBurnedToday;
  const netRemaining = Math.max(effectiveTarget - caloriesConsumed, 0);
  const ringCirc = 2 * Math.PI * 42;
  const progressRatio =
    effectiveTarget > 0 ? Math.min(caloriesConsumed / effectiveTarget, 2) : 0;

  const overage = caloriesConsumed - effectiveTarget;
  const statusMessage =
    overage >= 400
      ? "You are significantly above your target today."
      : netRemaining <= 500 && netRemaining > 0
      ? "You're close to your target. Plan your next meal carefully."
      : "";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pb-24">
      {/* NAVBAR */}
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
          <Logo className="h-8 w-8" />
        </Link>
        <div className="text-sm text-slate-500">{today}</div>
      </nav>

      {/* GREETING */}
      <section className="mt-10 flex flex-col items-center px-4">
        <h1 className="text-3xl font-semibold text-slate-900 text-center">
          {name ? `Hello, ${name}.` : "Welcome to ZeroFlow."}
        </h1>
        <p className="text-slate-500 mt-1">{dailyMessage}</p>
        <span className="mt-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
          Goal: {goalLabel}
        </span>
        {statusMessage && (
          <p className="mt-2 text-sm font-medium text-red-600">{statusMessage}</p>
        )}
      </section>

      {/* GRID CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 px-8 mt-12">
        {/* CALORIES CARD */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-slate-100 flex flex-col gap-6">
          {/* TOP: Progress Ring + numbers */}
          <div className="flex items-center gap-6">
            {/* Progress Ring */}
            <div className="relative h-24 w-24 flex-shrink-0">
              <svg className="h-full w-full transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  stroke="#E2E8F0"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  stroke="#1E40AF"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={ringCirc}
                  strokeDashoffset={(1 - progressRatio) * ringCirc}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-semibold text-slate-800">
                  {effectiveTarget > 0
                    ? Math.round((caloriesConsumed / effectiveTarget) * 100)
                    : 0}
                  %
                </span>
              </div>
            </div>

            {/* Numbers */}
            <div className="min-w-0">
              <h2 className="text-xl font-semibold mb-2">Daily Calories</h2>
              <p className="text-sm">
                <span className="font-medium">Target:</span> {caloriesTarget}
              </p>
              {caloriesBurnedToday > 0 && (
                <p className="text-sm text-green-600">
                  <span className="font-medium">Burned:</span> +{caloriesBurnedToday}
                </p>
              )}
              <p className="text-sm">
                <span className="font-medium">Consumed:</span> {caloriesConsumed}
              </p>
              <p
                className={`font-semibold mt-1 ${
                  overage > 0 ? "text-red-600" : "text-green-700"
                }`}
              >
                Remaining: {netRemaining} cal
              </p>
            </div>
          </div>

          {/* MACRO TARGETS */}
          <div className="border-t border-slate-100 pt-4">
            <p className="font-medium text-slate-700 mb-3">Macro Targets</p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-semibold text-blue-700">
                  {macros.protein}
                  <span className="text-sm font-normal text-slate-400">/{macrosTarget.protein}g</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">Protein</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-blue-500">
                  {macros.carbs}
                  <span className="text-sm font-normal text-slate-400">/{macrosTarget.carbs}g</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">Carbs</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-blue-900">
                  {macros.fat}
                  <span className="text-sm font-normal text-slate-400">/{macrosTarget.fat}g</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">Fat</p>
              </div>
            </div>
          </div>
        </div>

        {/* FOODS CARD */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-slate-100">
          <h2 className="text-xl font-semibold mb-4">Foods Today</h2>

          {foods.length === 0 ? (
            <p className="text-slate-600 text-sm">No foods logged yet.</p>
          ) : (
            <div className="max-h-36 overflow-y-auto pr-2 relative">
              <ul className="flex flex-col gap-3">
                {foods.map((food, i) => (
                  <li
                    key={i}
                    className="flex justify-between border-b pb-2 text-slate-700"
                  >
                    <div className="flex flex-col min-w-0 mr-2">
                      <span className="truncate">{food.name}</span>
                      <span className="text-xs text-slate-500">
                        {food.protein}g P · {food.carbs}g C · {food.fat}g F
                      </span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span>{food.calories} cal</span>
                      {food.quantity && food.quantity !== 1 ? (
                        <span className="block text-xs text-slate-500">
                          x{food.quantity}
                        </span>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
              <div className="pointer-events-none absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent" />
            </div>
          )}

          <Link
            href="/food/log"
            className="inline-block mt-6 text-blue-700 hover:underline"
          >
            Log Food →
          </Link>
        </div>

        {/* WORKOUTS CARD */}
        <div className="bg-white shadow-lg rounded-xl p-6 border border-slate-100 md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Workouts</h2>
            {caloriesBurnedToday > 0 && (
              <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                {caloriesBurnedToday} cal burned today
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Today's Workouts */}
            <div>
              <h3 className="text-sm font-medium text-slate-600 mb-3">Today</h3>
              {workouts.length === 0 ? (
                <p className="text-slate-500 text-sm">No workouts logged yet.</p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {workouts.map((w, i) => (
                    <li
                      key={i}
                      className="flex justify-between items-center bg-slate-50 rounded-lg px-3 py-2"
                    >
                      <div className="min-w-0 mr-2">
                        <span className="font-medium truncate block">{w.type}</span>
                        <span className="text-xs text-slate-500">{w.duration} min</span>
                      </div>
                      <span className="text-green-700 font-medium flex-shrink-0">
                        {w.caloriesBurned} cal
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <Link
                href="/workout/log"
                className="inline-block mt-4 text-blue-700 hover:underline text-sm"
              >
                Log Workout →
              </Link>
            </div>

            {/* WEEKLY GRAPH */}
            <div>
              <h3 className="text-sm font-medium text-slate-600 mb-3">Last 7 Days</h3>
              {weeklyWorkoutStats.length > 0 ? (
                <div className="flex items-end justify-between h-28 gap-1">
                  {weeklyWorkoutStats.map((stat, i) => {
                    const max = Math.max(
                      ...weeklyWorkoutStats.map((s) => s.calories),
                      100
                    );
                    const h = stat.calories > 0 ? Math.max((stat.calories / max) * 100, 8) : 4;
                    return (
                      <div
                        key={i}
                        className="flex flex-col items-center gap-1 flex-1 h-full justify-end"
                      >
                        <div
                          className="w-full bg-blue-50 rounded-t relative group flex items-end"
                          style={{ height: "100%" }}
                        >
                          <div
                            className={`w-full rounded-t transition-all duration-500 absolute bottom-0 ${
                              stat.calories > 0 ? "bg-blue-500" : "bg-slate-200"
                            }`}
                            style={{ height: `${h}%` }}
                          >
                            {stat.calories > 0 && (
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-slate-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10">
                                {stat.calories} cal
                              </div>
                            )}
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-500">{stat.day}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-slate-500 text-sm">No data yet.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* QUICK NAV */}
      <div className="fixed bottom-6 right-6">
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

          <div className="absolute bottom-14 right-0 bg-white shadow-xl rounded-xl p-4 border border-slate-100 w-44">
            <div className="flex flex-col gap-2 text-sm">
              {filteredNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-blue-700"
                >
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
