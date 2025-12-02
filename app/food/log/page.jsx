"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "../../components/logo";

import FoodAutocomplete from "../../components/FoodAutocomplete";

export default function LogFoodPage() {
  const router = useRouter();

  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState(0);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [error, setError] = useState("");

  // When user selects from autocomplete
  function handleSelect(item) {
    setFoodName(item.name);
    const macros = item.macros || {};
    setCalories(Math.round(macros.calories ?? 0));
    setProtein(Math.round(macros.protein ?? 0));
    setCarbs(Math.round(macros.carbs ?? 0));
    setFat(Math.round(macros.fat ?? 0));
    setQuantity(1);
  }

  // SUBMIT → Add food → Redirect to dashboard
  async function handleSubmit(e) {
    e.preventDefault();

    if (!foodName || calories <= 0) {
      setError("Please select a food first.");
      return;
    }

    setConfirmOpen(true);
  }

  async function handleConfirmLog() {
    setConfirmOpen(false);
    setError("");

    const res = await fetch("/api/food/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: foodName,
        calories: Number(calories) * quantity,
        protein: Number(protein) * quantity,
        carbs: Number(carbs) * quantity,
        fat: Number(fat) * quantity,
        quantity,
      }),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      alert("Could not log food. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* -------------------------------------------------- */}
      {/* NAVBAR (same layout as dashboard) */}
      {/* -------------------------------------------------- */}
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
          <Logo className="h-8 w-8" />
        </Link>

        <div className="flex items-center gap-4 text-sm">
          <Link href="/dashboard" className="hover:text-blue-700">Dashboard</Link>
          <Link href="/food/log" className="hover:text-blue-700 font-medium text-blue-700">
            Log Food
          </Link>
          <Link href="/workout/log" className="hover:text-blue-700">Log Workout</Link>
        </div>
      </nav>

      {/* -------------------------------------------------- */}
      {/* PAGE CONTENT */}
      {/* -------------------------------------------------- */}
      <section className="max-w-xl mx-auto px-6 mt-10">
        <h1 className="text-3xl font-semibold text-center">Log Food</h1>
        <p className="text-slate-500 text-center mt-1">
          Add meals quickly with search and confirm the details.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white border rounded-xl shadow-xl p-6 mt-8 flex flex-col gap-4"
        >
          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}
          {/* AUTOCOMPLETE */}
          <FoodAutocomplete onSelect={handleSelect} />

          {/* Selected summary */}
          <div className="p-4 border rounded-lg bg-slate-50">
            <p className="font-semibold text-slate-900">{foodName || "No food selected"}</p>
            <p className="text-sm text-slate-600 mt-1">
              {Math.round(calories)} kcal · {Math.round(protein)}g P · {Math.round(carbs)}g C · {Math.round(fat)}g F
            </p>
          </div>

          {/* Quantity */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-slate-700">Quantity</label>
            <input
            value={quantity}
            type="number"
            min={1}
            step={1}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              setQuantity(Number.isInteger(val) && val > 0 ? val : 1);
            }}
            className="border px-4 py-2 rounded-lg"
          />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="py-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition shadow-md"
          >
            Log Food
          </button>
        </form>

        {/* Confirmation modal */}
        {confirmOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Confirm Log
              </h3>
              <p className="text-slate-700">
                <span className="font-semibold">{foodName}</span>
              </p>
              <p className="text-slate-600 text-sm mt-1">
                {Math.round(calories)} kcal · {Math.round(protein)}g P ·{" "}
                {Math.round(carbs)}g C · {Math.round(fat)}g F
              </p>
              <p className="text-slate-600 text-sm mt-1">Quantity: {quantity}</p>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setConfirmOpen(false)}
                  className="flex-1 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmLog}
                  className="flex-1 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition shadow-sm"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
