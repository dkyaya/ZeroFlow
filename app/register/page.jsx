"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [preferred, setPreferred] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirm) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: first,
        lastName: last,
        preferredName: preferred,
        email,
        password,
      }),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      setErrorMsg("Unable to register user.");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full">

        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>

        {errorMsg && (
          <p className="text-red-600 text-center mb-4">{errorMsg}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div>
            <label className="text-gray-700 mb-1 block">First Name</label>
            <input
              required
              className="border rounded-lg px-3 py-2 w-full"
              value={first}
              onChange={(e) => setFirst(e.target.value)}
            />
          </div>

          <div>
            <label className="text-gray-700 mb-1 block">Last Name</label>
            <input
              required
              className="border rounded-lg px-3 py-2 w-full"
              value={last}
              onChange={(e) => setLast(e.target.value)}
            />
          </div>

          <div>
            <label className="text-gray-700 mb-1 block">Preferred Name (Optional)</label>
            <input
              className="border rounded-lg px-3 py-2 w-full"
              value={preferred}
              onChange={(e) => setPreferred(e.target.value)}
            />
          </div>

          <div>
            <label className="text-gray-700 mb-1 block">Email</label>
            <input
              type="email"
              required
              className="border rounded-lg px-3 py-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-gray-700 mb-1 block">Password</label>
            <input
              type="password"
              required
              className="border rounded-lg px-3 py-2 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="text-gray-700 mb-1 block">Confirm Password</label>
            <input
              type="password"
              required
              className="border rounded-lg px-3 py-2 w-full"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="mt-2 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"
          >
            Register
          </button>
        </form>

      </div>
    </main>
  );
}
