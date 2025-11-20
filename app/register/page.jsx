// app/register/page.jsx
// Registration page for ZeroFlow (Final Project Version)
// Allows new users to create an account.
// This sends user data to the /api/auth/register route.

"use client";
// The component uses client-side state, so it must be marked as a Client Component.

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  // Local state for form fields and errors.
  const [name, setName] = useState(""); // Optional but nice for user profiles
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();

  // Handles form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation before sending to backend
    if (password !== confirm) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    // Send registration request to the API route.
    const res = await fetch("/api/auth/register/route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    if (res.ok) {
      // Redirect user to login after successful registration.
      router.push("/login");
    } else {
      setErrorMsg("An account with this email may already exist.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* Main container for spacing and positioning */}

      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        {/* Card container for the registration form */}

        <h1 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
          Create an Account
        </h1>

        {/* Error message display */}
        {errorMsg && (
          <div className="mb-4 text-red-600 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name Input */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Name (Optional)</label>
            <input
              type="text"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Email</label>
            <input
              type="email"
              required
              className="border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Password</label>
            <input
              type="password"
              required
              className="border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password Input */}
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              required
              className="border border-gray-300 rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Register
          </button>
        </form>

        {/* Link back to login */}
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
