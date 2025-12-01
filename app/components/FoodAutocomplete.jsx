"use client";

import { useState } from "react";
import { searchFoods } from "@/lib/searchFoods";

export default function FoodAutocomplete({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  function handleChange(e) {
    const q = e.target.value;
    setQuery(q);
    setResults(searchFoods(q));
  }

  return (
    <div className="relative w-full">
      <input
        value={query}
        onChange={handleChange}
        placeholder="Search foods..."
        className="w-full px-4 py-2 border rounded-lg shadow-sm"
      />

      {results.length > 0 && (
        <ul className="absolute z-20 bg-white border mt-2 rounded-xl w-full shadow-xl">
          {results.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                onSelect(item);
                setQuery(item.name);
                setResults([]);
              }}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
            >
              {item.name} •{" "}
              <span className="text-slate-500">{item.calories} cal</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
