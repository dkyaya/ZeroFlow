// app/register/page.jsx
// Registration page for ZeroFlow (Final Project Version)
// Allows new users to create an account and POSTs data to /api/auth/register.

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  // Local state for form fields and errors
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    // Basic password check before sending data
    if (password !== confirm) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    // Correct API path (NO `/route`)
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      router.push("/login"); // redirect after success
    } else {
      setErrorMsg("An account with this email may already exist.");
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* Form container */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
          Create an Account
        </h1>

        {/* Error message */}
        {errorMsg && (
          <div className="mb-4 text-red-600 text-sm text-center">
            {errorMsg}
          </div>
        )}

        {/* Registration form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name input */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Name (Optional)</label>
            <input
              type="text"
              placeholder="Your name (optional)"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email input */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password input */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm password input */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Register
          </button>
        </form>

        {/* Link to login */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </main>
  );
}
