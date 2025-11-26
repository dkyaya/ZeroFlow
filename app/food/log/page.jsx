// app/food/log/page.jsx
// Food logging page for ZeroFlow (Final Project Version)
// Allows users to enter a food name + calorie amount
// Submits to the /api/food/log API route using POST.

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogFoodPage() {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/food/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        calories: Number(calories),
      }),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      setError("Failed to log food.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
          Log Food
        </h1>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Food name input */}
          <div>
            <label className="text-gray-700 mb-1 block">Food Name</label>
            <input
              type="text"
              required
              className="border rounded-lg px-3 py-2 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Chicken Breast"
            />
          </div>

          {/* Calorie input */}
          <div>
            <label className="text-gray-700 mb-1 block">Calories</label>
            <input
              type="number"
              required
              className="border rounded-lg px-3 py-2 w-full"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="e.g., 200"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Add Entry
          </button>
        </form>
      </div>
    </main>
  );
}
