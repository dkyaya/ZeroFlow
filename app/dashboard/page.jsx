// app/dashboard/page.jsx
// Dashboard page for ZeroFlow (Final Project Version)
// Shows the user's daily calorie target, calories eaten, remaining calories,
// and a simple list of logged foods for the current day.
// This is a Server Component by default (no "use client").

async function getSummary() {
  // Fetches daily summary from API route.
  // Next.js fetch automatically caches unless specified otherwise.
  // For dynamic data (like today's logs), we disable caching.
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
  // Retrieves summary data for display.
  const summary = await getSummary();

  const { caloriesTarget, caloriesConsumed, foods } = summary;

  const remaining = Math.max(caloriesTarget - caloriesConsumed, 0);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      {/* 
        Layout:
        - top spacing
        - centered content
        - soft background
      */}

      <h1 className="text-3xl font-semibold text-blue-700 mb-8">
        Your Dashboard
      </h1>

      {/* ----- CALORIE SUMMARY CARD ----- */}
      <div className="bg-white shadow-md rounded-xl p-6 max-w-xl mb-10">
        <h2 className="text-xl font-medium mb-4">Today's Summary</h2>

        <div className="flex flex-col gap-2 text-gray-700">
          <p>
            <span className="font-semibold">Target:</span>{" "}
            {caloriesTarget} calories
          </p>
          <p>
            <span className="font-semibold">Consumed:</span>{" "}
            {caloriesConsumed} calories
          </p>
          <p>
            <span className={`font-semibold ${remaining === 0 ? "text-red-600" : "text-green-700"}`}>
              Remaining:
            </span>{" "}
            {remaining} calories
          </p>
        </div>
      </div>

      {/* ----- TODAY'S FOOD LOG SECTION ----- */}
      <div className="bg-white shadow-md rounded-xl p-6 max-w-xl">
        <h2 className="text-xl font-medium mb-4">Foods Logged Today</h2>

        {foods.length === 0 ? (
          <p className="text-gray-600 text-sm">No foods logged yet.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {foods.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between border-b pb-2 text-gray-700"
              >
                <span>{item.name}</span>
                <span>{item.calories} cal</span>
              </li>
            ))}
          </ul>
        )}

        {/* Log food link */}
        <a
          href="/food/log"
          className="mt-6 inline-block text-blue-600 hover:underline"
        >
          Log a Food →
        </a>
      </div>
    </main>
  );
}
