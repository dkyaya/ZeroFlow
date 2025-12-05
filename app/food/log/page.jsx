"use client";

import { useState, useEffect } from "react";
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
  const [quantityStr, setQuantityStr] = useState("1");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [favorites, setFavorites] = useState([]);
  const [recents, setRecents] = useState([]);
  const [saveAsFavorite, setSaveAsFavorite] = useState(false);

  const quantity = parseFloat(quantityStr) || 0;

  // Fetch favorites & recents
  useEffect(() => {
    fetch("/api/food/favorites")
      .then((res) => res.json())
      .then((data) => {
        if (data.favorites) setFavorites(data.favorites);
      })
      .catch(console.error);

    fetch("/api/food/recents")
      .then((res) => res.json())
      .then((data) => {
        if (data.recents) setRecents(data.recents);
      })
      .catch(console.error);
  }, []);

  // When user selects from autocomplete
  function handleSelect(item) {
    setFoodName(item.name);
    const macros = item.macros || {};
    setCalories(Math.round(macros.calories ?? 0));
    setProtein(Math.round(macros.protein ?? 0));
    setCarbs(Math.round(macros.carbs ?? 0));
    setFat(Math.round(macros.fat ?? 0));
    setQuantityStr("1");
    setSaveAsFavorite(false);
    setError("");
  }

  function loadQuickAdd(item) {
    setFoodName(item.name);
    setCalories(item.calories);
    setProtein(item.protein);
    setCarbs(item.carbs);
    setFat(item.fat);
    setQuantityStr(String(item.quantity || 1));
    setSaveAsFavorite(false);
    setError("");
  }

  // Direct submit - no modal
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!foodName) {
      setError("Please select a food first.");
      return;
    }

    if (quantity <= 0) {
      setError("Quantity must be greater than 0.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/food/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: foodName,
          calories: Math.round(Number(calories) * quantity),
          protein: Math.round(Number(protein) * quantity),
          carbs: Math.round(Number(carbs) * quantity),
          fat: Math.round(Number(fat) * quantity),
          quantity,
        }),
      });

      if (res.ok) {
        if (saveAsFavorite) {
          await fetch("/api/food/favorites", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: foodName,
              calories: Number(calories),
              protein: Number(protein),
              carbs: Number(carbs),
              fat: Number(fat),
              quantity: 1,
            }),
          });
        }
        router.push("/dashboard");
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Could not log food. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  }

  const totalCals = Math.round(calories * quantity);
  const totalP = Math.round(protein * quantity);
  const totalC = Math.round(carbs * quantity);
  const totalF = Math.round(fat * quantity);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* NAVBAR */}
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

      {/* PAGE CONTENT */}
      <section className="max-w-xl mx-auto px-6 mt-10 pb-12">
        <h1 className="text-3xl font-semibold text-center">Log Food</h1>
        <p className="text-slate-500 text-center mt-1">
          Search or tap a favorite to log quickly.
        </p>

        {/* QUICK ADD SECTIONS */}
        {(favorites.length > 0 || recents.length > 0) && (
          <div className="mt-6 space-y-4">
            {favorites.length > 0 && (
              <div>
                <h2 className="text-sm font-medium text-slate-600 mb-2">Favorites</h2>
                <div className="flex flex-wrap gap-2">
                  {favorites.map((fav) => (
                    <button
                      key={fav.id}
                      type="button"
                      onClick={() => loadQuickAdd(fav)}
                      className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-700 hover:bg-blue-100 transition"
                    >
                      {fav.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {recents.length > 0 && (
              <div>
                <h2 className="text-sm font-medium text-slate-600 mb-2">Recent</h2>
                <div className="flex flex-wrap gap-2">
                  {recents.map((item, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => loadQuickAdd(item)}
                      className="px-3 py-1.5 bg-slate-100 rounded-full text-sm text-slate-600 hover:bg-slate-200 transition"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white border rounded-xl shadow-xl p-6 mt-6 flex flex-col gap-4"
        >
          {error && (
            <p className="text-red-600 text-sm text-center bg-red-50 py-2 rounded-lg">{error}</p>
          )}

          {/* AUTOCOMPLETE */}
          <FoodAutocomplete onSelect={handleSelect} />

          {/* Selected summary */}
          <div className="p-4 border rounded-lg bg-slate-50">
            <p className="font-semibold text-slate-900">{foodName || "No food selected"}</p>
            <p className="text-sm text-slate-500 mt-1">
              Per serving: {calories} kcal · {protein}g P · {carbs}g C · {fat}g F
            </p>
            {quantity > 0 && foodName && (
              <p className="text-sm font-medium text-slate-700 mt-2 pt-2 border-t border-slate-200">
                Total: {totalCals} kcal · {totalP}g P · {totalC}g C · {totalF}g F
              </p>
            )}
          </div>

          {/* Quantity + Favorite in row */}
          <div className="flex gap-4 items-end">
            <div className="flex-1 flex flex-col gap-1">
              <label className="text-sm text-slate-700">Servings</label>
              <input
                value={quantityStr}
                type="text"
                inputMode="decimal"
                placeholder="1"
                onChange={(e) => setQuantityStr(e.target.value)}
                className="border px-4 py-2 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
            <label className="flex items-center gap-2 pb-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={saveAsFavorite}
                onChange={(e) => setSaveAsFavorite(e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-600">Save favorite</span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || !foodName || quantity <= 0}
            className="py-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging..." : "Log Food"}
          </button>
        </form>
      </section>
    </main>
  );
}
