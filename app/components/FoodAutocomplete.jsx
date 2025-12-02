"use client";

import { useState, useEffect } from "react";

export default function FoodAutocomplete({ onSelect }) {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    if (!debounced.trim()) {
      setResults([]);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetch(`/api/food/search?q=${encodeURIComponent(debounced)}`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setResults(data.results || []);
      })
      .catch(() => {
        if (!cancelled) setResults([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [debounced]);

  function handleSelect(item) {
    onSelect?.(item);
    setQuery(item.name);
    setResults([]);
  }

  return (
    <div className="relative w-full">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search foods..."
        className="w-full px-4 py-2 border rounded-lg shadow-sm"
      />

      {loading && (
        <p className="text-xs text-slate-500 mt-1">Searching...</p>
      )}

      {results.length > 0 && (
        <ul className="absolute z-20 bg-white border mt-2 rounded-xl w-full shadow-xl max-h-64 overflow-y-auto">
          {results.map((item) => (
            <li
              key={item.fdcId ?? item.name}
              onClick={() => handleSelect(item)}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
            >
              <p className="font-medium text-slate-800">{item.name}</p>
              {item.brandName && (
                <p className="text-xs text-slate-500 -mt-1 mb-1">
                  {item.brandName}
                </p>
              )}
              <div className="flex gap-3 text-xs text-slate-600">
                <span>{Math.round(item.macros?.calories ?? 0)} kcal</span>
                <span>{Math.round(item.macros?.protein ?? 0)}g P</span>
                <span>{Math.round(item.macros?.carbs ?? 0)}g C</span>
                <span>{Math.round(item.macros?.fat ?? 0)}g F</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
