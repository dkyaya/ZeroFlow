"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "../components/logo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();

  // ---------------------------
  // Cursor glow effect
  // ---------------------------
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) router.push("/dashboard");
    else setErrorMsg("Invalid email or password.");
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Cursor-reactive glow */}
      <div
        className="pointer-events-none absolute w-[600px] h-[600px] rounded-full 
                   bg-blue-400/20 blur-3xl transition-transform duration-300"
        style={{
          transform: `translate(${pos.x - 300}px, ${pos.y - 300}px)`
        }}
      />

      {/* Foreground content */}
      <div className="z-10 flex flex-col items-center">
        
        {/* Logo + welcome text */}
        <div className="mb-6 flex flex-col items-center">
          <Logo className="h-16 w-16" />
          <h1 className="text-2xl font-semibold text-slate-900 mt-3">
            Welcome back.
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Your day starts here.
          </p>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-10 border border-slate-200">

          {errorMsg && (
            <div className="mb-4 text-red-600 text-sm text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <div className="flex flex-col">
              <label className="text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                className="border border-slate-300 rounded-lg px-3 py-2 
                focus:outline-none focus:border-blue-600"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                className="border border-slate-300 rounded-lg px-3 py-2 
                focus:outline-none focus:border-blue-600"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white py-2 rounded-lg 
              font-medium transition shadow-sm"
            >
              Log In
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6 text-sm">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-700 hover:underline">
              Register
            </a>
          </p>

        </div>
      </div>
    </main>
  );
}
