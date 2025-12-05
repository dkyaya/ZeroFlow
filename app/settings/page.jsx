"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "../components/logo";

const goalOptions = [
  { value: "lose", label: "Lose Weight", desc: "Calorie deficit for fat loss" },
  { value: "maintain", label: "Maintain", desc: "Keep current weight" },
  { value: "gain", label: "Build Muscle", desc: "Calorie surplus for growth" },
  { value: "performance", label: "Performance", desc: "Optimize for athletics" },
];

const activityOptions = [
  { value: "sedentary", label: "Sedentary", desc: "Little to no exercise" },
  { value: "light", label: "Light", desc: "1-3 days/week" },
  { value: "moderate", label: "Moderate", desc: "3-5 days/week" },
  { value: "high", label: "Very Active", desc: "6-7 days/week" },
];

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    preferredName: "",
    height: "",
    weight: "",
    age: "",
    sex: "male",
    goal: "maintain",
    activityLevel: "moderate",
    unitSystem: "imperial",
  });

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setMessage({ type: "error", text: data.error });
        } else {
          setForm({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            preferredName: data.preferredName || "",
            height: String(data.height || ""),
            weight: String(data.weight || ""),
            age: String(data.age || ""),
            sex: data.sex || "male",
            goal: data.goal || "maintain",
            activityLevel: data.activityLevel || "moderate",
            unitSystem: data.unitSystem || "imperial",
          });
        }
      })
      .catch(() => setMessage({ type: "error", text: "Failed to load settings" }))
      .finally(() => setLoading(false));
  }, []);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setMessage({ type: "", text: "" });
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Settings saved successfully!" });
        setTimeout(() => router.push("/dashboard"), 1000);
      } else {
        setMessage({ type: "error", text: data.error || "Failed to save" });
      }
    } catch {
      setMessage({ type: "error", text: "An error occurred" });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-500">Loading settings...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pb-12">
      {/* NAVBAR */}
      <nav className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-sm">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/dashboard" className="hover:text-blue-700">Dashboard</Link>
          <Link href="/settings" className="font-medium text-blue-700">Settings</Link>
        </div>
      </nav>

      <section className="max-w-2xl mx-auto px-6 mt-10">
        <h1 className="text-3xl font-semibold text-center">Settings</h1>
        <p className="text-slate-500 text-center mt-1">
          Update your profile and goals
        </p>

        <form onSubmit={handleSave} className="mt-8 space-y-8">
          {/* MESSAGE */}
          {message.text && (
            <div
              className={`p-4 rounded-lg text-center ${
                message.type === "success"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* PROFILE SECTION */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6">
            <h2 className="text-lg font-semibold mb-4">Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700">First Name</label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className="mt-1 w-full border px-4 py-2 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Last Name</label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  className="mt-1 w-full border px-4 py-2 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-slate-700">
                  Preferred Name <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={form.preferredName}
                  onChange={(e) => handleChange("preferredName", e.target.value)}
                  placeholder="What should we call you?"
                  className="mt-1 w-full border px-4 py-2 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>
            </div>
          </div>

          {/* BODY METRICS */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6">
            <h2 className="text-lg font-semibold mb-4">Body Metrics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Height {form.unitSystem === "imperial" ? "(in)" : "(cm)"}
                </label>
                <input
                  type="number"
                  value={form.height}
                  onChange={(e) => handleChange("height", e.target.value)}
                  className="mt-1 w-full border px-4 py-2 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Weight {form.unitSystem === "imperial" ? "(lbs)" : "(kg)"}
                </label>
                <input
                  type="number"
                  value={form.weight}
                  onChange={(e) => handleChange("weight", e.target.value)}
                  className="mt-1 w-full border px-4 py-2 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Age</label>
                <input
                  type="number"
                  value={form.age}
                  onChange={(e) => handleChange("age", e.target.value)}
                  className="mt-1 w-full border px-4 py-2 rounded-lg focus:outline-none focus:border-blue-600"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Sex</label>
                <select
                  value={form.sex}
                  onChange={(e) => handleChange("sex", e.target.value)}
                  className="mt-1 w-full border px-4 py-2 rounded-lg focus:outline-none focus:border-blue-600 bg-white"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-slate-700">Unit System</label>
              <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="unitSystem"
                    value="imperial"
                    checked={form.unitSystem === "imperial"}
                    onChange={(e) => handleChange("unitSystem", e.target.value)}
                    className="text-blue-600"
                  />
                  <span className="text-sm">Imperial (lbs, in)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="unitSystem"
                    value="metric"
                    checked={form.unitSystem === "metric"}
                    onChange={(e) => handleChange("unitSystem", e.target.value)}
                    className="text-blue-600"
                  />
                  <span className="text-sm">Metric (kg, cm)</span>
                </label>
              </div>
            </div>
          </div>

          {/* GOAL */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6">
            <h2 className="text-lg font-semibold mb-4">Your Goal</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {goalOptions.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex flex-col p-4 rounded-lg border-2 cursor-pointer transition ${
                    form.goal === opt.value
                      ? "border-blue-600 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="goal"
                      value={opt.value}
                      checked={form.goal === opt.value}
                      onChange={(e) => handleChange("goal", e.target.value)}
                      className="text-blue-600"
                    />
                    <span className="font-medium">{opt.label}</span>
                  </div>
                  <span className="text-xs text-slate-500 mt-1 ml-6">{opt.desc}</span>
                </label>
              ))}
            </div>
          </div>

          {/* ACTIVITY LEVEL */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6">
            <h2 className="text-lg font-semibold mb-4">Activity Level</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activityOptions.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex flex-col p-4 rounded-lg border-2 cursor-pointer transition ${
                    form.activityLevel === opt.value
                      ? "border-blue-600 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="activityLevel"
                      value={opt.value}
                      checked={form.activityLevel === opt.value}
                      onChange={(e) => handleChange("activityLevel", e.target.value)}
                      className="text-blue-600"
                    />
                    <span className="font-medium">{opt.label}</span>
                  </div>
                  <span className="text-xs text-slate-500 mt-1 ml-6">{opt.desc}</span>
                </label>
              ))}
            </div>
          </div>

          {/* SAVE BUTTON */}
          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition shadow-md disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </section>
    </main>
  );
}

