"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "../../components/logo";

import BarcodeScanner from "../../components/BarcodeScanner";
import FoodAutocomplete from "../../components/FoodAutocomplete";
import { findFoodByBarcode } from "@/lib/findFoodByBarcode";

export default function LogFoodPage() {
  const router = useRouter();

  const [showScanner, setShowScanner] = useState(false);
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [category, setCategory] = useState("");

  // When user selects from autocomplete
  function handleSelect(item) {
    setFoodName(item.name);
    setCalories(item.calories);
    setCategory(item.category || "");
  }

  // When barcode scan succeeds
  function handleBarcodeDetected(code) {
    const match = findFoodByBarcode(code);

    if (match) {
      setFoodName(match.name);
      setCalories(match.calories);
      setCategory(match.category || "");
    } else {
      alert(`Unknown barcode: ${code}`);
    }

    setShowScanner(false);
  }

  // SUBMIT → Add food → Redirect to dashboard
  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/food/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: foodName,
        calories: Number(calories),
        category,
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

      {/* SCANNER OVERLAY */}
      {showScanner && (
        <BarcodeScanner
          onDetected={handleBarcodeDetected}
          onClose={() => setShowScanner(false)}
        />
      )}

      {/* -------------------------------------------------- */}
      {/* PAGE CONTENT */}
      {/* -------------------------------------------------- */}
      <section className="max-w-xl mx-auto px-6 mt-10">
        <h1 className="text-3xl font-semibold text-center">Log Food</h1>
        <p className="text-slate-500 text-center mt-1">
          Add meals quickly with search or barcode scan.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white border rounded-xl shadow-xl p-6 mt-8 flex flex-col gap-4"
        >
          {/* AUTOCOMPLETE */}
          <FoodAutocomplete onSelect={handleSelect} />

          {/* Food name */}
          <input
            value={foodName}
            onChange={e => setFoodName(e.target.value)}
            placeholder="Food name"
            className="border px-4 py-2 rounded-lg"
            required
          />

          {/* Calories */}
          <input
            value={calories}
            type="number"
            onChange={e => setCalories(e.target.value)}
            placeholder="Calories"
            className="border px-4 py-2 rounded-lg"
            required
          />

          {/* Category */}
          <input
            value={category}
            onChange={e => setCategory(e.target.value)}
            placeholder="Category (optional)"
            className="border px-4 py-2 rounded-lg"
          />

          {/* Barcode Scan Button */}
          <button
            type="button"
            onClick={() => setShowScanner(true)}
            className="py-2 px-4 rounded-lg border border-blue-700 text-blue-700 hover:bg-blue-50 transition"
          >
            Scan Barcode
          </button>

          {/* Submit */}
          <button
            type="submit"
            className="py-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition shadow-md"
          >
            Log Food
          </button>
        </form>
      </section>
    </main>
  );
}
