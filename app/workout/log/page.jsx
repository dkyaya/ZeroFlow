"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "../../components/logo";

export default function LogWorkoutPage() {
  const router = useRouter();
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [caloriesBurned, setCaloriesBurned] = useState("");
  const [rpe, setRpe] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!type || !duration || !caloriesBurned) {
      setError("Please fill in all required fields.");
      return;
    }

    const res = await fetch("/api/workout/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        duration,
        caloriesBurned,
        rpe,
        notes,
      }),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      setError("Failed to log workout.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* NAVBAR */}
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
          <Logo className="h-8 w-8" />
        </Link>
        <div className="flex items-center gap-4 text-sm">
           <Link href="/dashboard" className="hover:text-blue-700">Dashboard</Link>
           <Link href="/food/log" className="hover:text-blue-700">Log Food</Link>
           <Link href="/workout/log" className="hover:text-blue-700 font-medium text-blue-700">Log Workout</Link>
        </div>
      </nav>

      {/* FORM */}
      <section className="max-w-xl mx-auto px-6 mt-10">
        <h1 className="text-3xl font-semibold text-center">Log Workout</h1>
        <p className="text-slate-500 text-center mt-1">
          Track your exercise and calories burned.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white border rounded-xl shadow-xl p-8 mt-8 flex flex-col gap-5"
        >
          {error && (
            <p className="text-red-600 text-sm text-center">{error}</p>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Workout Type</label>
            <input
              type="text"
              placeholder="e.g. Running, Weightlifting, Yoga"
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border px-4 py-2 rounded-lg focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700">Duration (min)</label>
              <input
                type="number"
                placeholder="30"
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700">Calories Burned</label>
              <input
                type="number"
                placeholder="200"
                required
                value={caloriesBurned}
                onChange={(e) => setCaloriesBurned(e.target.value)}
                className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
             <label className="text-sm font-medium text-slate-700">
                RPE (1-10) <span className="text-xs text-slate-400 font-normal">(Optional)</span>
             </label>
             <input
               type="number"
               min="1"
               max="10"
               placeholder="7"
               value={rpe}
               onChange={(e) => setRpe(e.target.value)}
               className="border px-4 py-2 rounded-lg focus:outline-none focus:border-blue-600"
             />
             <p className="text-xs text-slate-500">Rate of Perceived Exertion</p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">
               Notes <span className="text-xs text-slate-400 font-normal">(Optional)</span>
            </label>
            <textarea
              placeholder="How did it feel?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="border px-4 py-2 rounded-lg h-24 focus:outline-none focus:border-blue-600 resize-none"
            />
          </div>

          <button
            type="submit"
            className="mt-2 py-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition shadow-md"
          >
            Save Workout
          </button>
        </form>
      </section>
    </main>
  );
}
