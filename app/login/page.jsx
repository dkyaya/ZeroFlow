// app/login/page.jsx
// Login page for ZeroFlow (Final Project Version)
// This page renders a login form that POSTs credentials to the server.
// Clean and simple UI with helpful structure for CS50 TFs to understand.

"use client";
// This page uses client-side interactivity (form handling, navigation)
// so we must explicitly mark it as a Client Component.

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  // Local state for form fields and error handling.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter(); // Allows redirecting after login.

  // Handles form submission.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page refresh.

    // Send login request to the API route.
    const res = await fetch("/api/auth/login/route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      // If login succeeded, redirect user to the dashboard.
      router.push("/dashboard");
    } else {
      // If login fails, show an error message.
      setErrorMsg("Invalid email or password.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* 
        Main container:
        - Full page height
        - Centered content
        - Light gray background for clean appearance
      */}

      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        {/* 
          A form card container:
          - max width for readability
          - white background
          - subtle shadow for separation
          - rounded corners
          - padding for spacing
        */}

        <h1 className="text-2xl font-semibold text-blue-700 mb-6 text-center">
          Login
        </h1>

        {/* Error message box (only shows if there's an error) */}
        {errorMsg && (
          <div className="mb-4 text-red-600 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Log In
          </button>
        </form>

        {/* Link to registration page */}
        <p className="text-center text-gray-600 mt-6 text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </main>
  );
}
