// app/food/manage/page.jsx
// Basic UI to edit today's logged foods.
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ManageFoodLogsPage() {
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadLogs() {
    setLoading(true);
    const res = await fetch("/api/food/logs");
    if (res.ok) {
      const data = await res.json();
      setLogs(data.logs || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadLogs();
  }, []);

  async function handleSave(log) {
    setStatus("");
    const res = await fetch(`/api/food/log/${log.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(log),
    });
    if (res.ok) {
      setStatus("Saved changes.");
      loadLogs();
    } else {
      const data = await res.json().catch(() => ({}));
      setStatus(data.error || "Failed to save.");
    }
  }

  async function handleDelete(id) {
    setStatus("");
    const res = await fetch(`/api/food/log/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setStatus("Entry deleted.");
      setLogs((prev) => prev.filter((l) => l.id !== id));
    } else {
      const data = await res.json().catch(() => ({}));
      setStatus(data.error || "Failed to delete.");
    }
  }

  function updateField(id, field, value) {
    setLogs((prev) =>
      prev.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">Manage Logged Foods</h1>
          <Link href="/dashboard" className="text-blue-700 hover:underline text-sm">
            ← Back to dashboard
          </Link>
        </div>

        {status && <p className="text-sm text-slate-600 mb-3">{status}</p>}

        {loading ? (
          <p className="text-slate-600">Loading...</p>
        ) : logs.length === 0 ? (
          <p className="text-slate-600 text-sm">No foods logged today.</p>
        ) : (
          <div className="space-y-4">
            {logs.map((log) => (
              <div
                key={log.id}
                className="border rounded-lg p-4 flex flex-col gap-2 bg-slate-50"
              >
                <div className="flex gap-3 items-center">
                  <label className="text-sm text-slate-700 w-20">Name</label>
                  <input
                    className="border rounded px-3 py-2 flex-1"
                    value={log.name}
                    onChange={(e) => updateField(log.id, "name", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <div>
                    <label className="text-sm text-slate-700">Calories</label>
                    <input
                      className="border rounded px-3 py-2 w-full"
                      type="number"
                      value={log.calories}
                      onChange={(e) =>
                        updateField(log.id, "calories", Number(e.target.value))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-700">Protein</label>
                    <input
                      className="border rounded px-3 py-2 w-full"
                      type="number"
                      value={log.protein}
                      onChange={(e) =>
                        updateField(log.id, "protein", Number(e.target.value))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-700">Carbs</label>
                    <input
                      className="border rounded px-3 py-2 w-full"
                      type="number"
                      value={log.carbs}
                      onChange={(e) =>
                        updateField(log.id, "carbs", Number(e.target.value))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-700">Fat</label>
                    <input
                      className="border rounded px-3 py-2 w-full"
                      type="number"
                      value={log.fat}
                      onChange={(e) =>
                        updateField(log.id, "fat", Number(e.target.value))
                      }
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-700">Quantity</label>
                    <input
                      className="border rounded px-3 py-2 w-full"
                      type="number"
                      min={1}
                      step={1}
                      value={log.quantity}
                      onChange={(e) =>
                        updateField(log.id, "quantity", parseInt(e.target.value, 10) || 1)
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => handleSave(log)}
                    className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => handleDelete(log.id)}
                    className="ml-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
