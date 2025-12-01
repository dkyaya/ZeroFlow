// app/register/page.jsx
// ZeroFlow Registration Page (Production-styled, Sectioned Layout)

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [preferredName, setPreferredName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("male");

  const [goal, setGoal] = useState("maintain");
  const [activity, setActivity] = useState("light");
  const [unitSystem, setUnitSystem] = useState("imperial");

  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    // Password check
    if (password !== confirm) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    // Send to API
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        preferredName,
        email,
        password,
        height,
        weight,
        age,
        sex,
        goal,
        activityLevel: activity,
        unitSystem,
      }),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      setErrorMsg("Registration failed. Email may already be in use.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="bg-white w-full max-w-2xl shadow-lg rounded-2xl p-10 border border-slate-200">
        
        <h1 className="text-3xl font-bold text-slate-900 mb-6 text-center">
          Create Your ZeroFlow Account
        </h1>

        {errorMsg && (
          <p className="text-red-600 mb-4 text-center font-medium">
            {errorMsg}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-10">

          {/* ------------------------------------------------------------ */}
          {/* PERSONAL INFORMATION SECTION */}
          {/* ------------------------------------------------------------ */}
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-700 mb-1 block">First Name</label>
                <input
                  type="text"
                  required
                  className="border rounded-lg px-3 py-2 w-full"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-slate-700 mb-1 block">Last Name</label>
                <input
                  type="text"
                  required
                  className="border rounded-lg px-3 py-2 w-full"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="text-slate-700 mb-1 block">Preferred Name (Optional)</label>
              <input
                type="text"
                className="border rounded-lg px-3 py-2 w-full"
                value={preferredName}
                onChange={(e) => setPreferredName(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label className="text-slate-700 mb-1 block">Email</label>
              <input
                type="email"
                required
                className="border rounded-lg px-3 py-2 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>


          {/* ------------------------------------------------------------ */}
          {/* BODY METRICS SECTION */}
          {/* ------------------------------------------------------------ */}
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              Body Metrics
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-slate-700 mb-1 block">Height</label>
                <input
                  type="number"
                  required
                  className="border rounded-lg px-3 py-2 w-full"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder={unitSystem === "imperial" ? "inches" : "cm"}
                />
              </div>

              <div>
                <label className="text-slate-700 mb-1 block">Weight</label>
                <input
                  type="number"
                  required
                  className="border rounded-lg px-3 py-2 w-full"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder={unitSystem === "imperial" ? "lbs" : "kg"}
                />
              </div>

              <div>
                <label className="text-slate-700 mb-1 block">Age</label>
                <input
                  type="number"
                  required
                  className="border rounded-lg px-3 py-2 w-full"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-700 mb-1 block">Sex</label>
                <select
                  className="border rounded-lg px-3 py-2 w-full"
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 mb-1 block">Units</label>
                <select
                  className="border rounded-lg px-3 py-2 w-full"
                  value={unitSystem}
                  onChange={(e) => setUnitSystem(e.target.value)}
                >
                  <option value="imperial">Imperial (lbs/in)</option>
                  <option value="metric">Metric (kg/cm)</option>
                </select>
              </div>
            </div>
          </div>


          {/* ------------------------------------------------------------ */}
          {/* GOALS & LIFESTYLE SECTION */}
          {/* ------------------------------------------------------------ */}
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              Goals & Lifestyle
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="text-slate-700 mb-1 block">Goal</label>
                <select
                  className="border rounded-lg px-3 py-2 w-full"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                >
                  <option value="lose">Lose Weight</option>
                  <option value="maintain">Maintain</option>
                  <option value="gain">Gain Muscle</option>
                  <option value="performance">Performance</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 mb-1 block">Activity Level</label>
                <select
                  className="border rounded-lg px-3 py-2 w-full"
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                >
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Light</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                </select>
              </div>

            </div>
          </div>


          {/* ------------------------------------------------------------ */}
          {/* PASSWORD SECTION */}
          {/* ------------------------------------------------------------ */}
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              Secure Your Account
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-700 mb-1 block">Password</label>
                <input
                  type="password"
                  required
                  className="border rounded-lg px-3 py-2 w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="text-slate-700 mb-1 block">Confirm Password</label>
                <input
                  type="password"
                  required
                  className="border rounded-lg px-3 py-2 w-full"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-medium transition shadow-sm"
          >
            Create Account
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-slate-600 mt-6 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-700 hover:underline">
            Log in
          </a>
        </p>

      </div>
    </main>
  );
}
