// app/food/search/page.jsx
// Search page for the built-in FPV food list.
// Users can type a query, hit "Search", and get calories for common foods.

"use client";

import { useState } from "react";

export default function SearchFoodPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  async function handleSearch() {
    setError("");

    if (!query.trim()) {
      setError("Please enter a food name.");
      return;
    }

    const res = await fetch(`/api/food/search?q=${encodeURIComponent(query)}`);

    if (!res.ok) {
      setError("Failed to fetch foods.");
      return;
    }

    const data = await res.json();
    setResults(data);
  }

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-semibold text-blue-700 mb-6">
        Search Foods
      </h1>

      {/* Search bar + button */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          className="border rounded-lg px-3 py-2 flex-1"
          placeholder="Search for a food..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-lg"
        >
          Search
        </button>
      </div>

      {/* Error message */}
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      {/* Results */}
      <ul className="flex flex-col gap-3">
        {results.map((item, idx) => (
          <li
            key={idx}
            className="bg-white p-4 shadow-sm border rounded-lg flex justify-between"
          >
            <span>{item.name}</span>
            <span>{item.calories} cal</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
