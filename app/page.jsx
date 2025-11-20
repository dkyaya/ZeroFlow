// app/page.jsx
// ZeroFlow Homepage
// This is the first page users see before logging in.
// For the CS50 final project version, the homepage is simple:
// a brief description + links to Register or Login.

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      {/* 
        main container:
        - full height screen
        - centered content
        - padding for mobile
      */}

      <h1 className="text-4xl font-bold text-blue-700 mb-4">
        ZeroFlow
      </h1>

      {/* 
        Simple heading. Branding will evolve later, but we keep it 
        minimal for the CS50 version so the focus is function.
      */}

      <p className="text-gray-600 text-center max-w-md mb-8">
        A clean, simple calorie and nutrition tracker built to help 
        everyday users and athletes stay on top of their goals.
      </p>

      {/* 
        Two basic CTA buttons for navigation:
        - Login
        - Register
        Later in the full version, we can add animations, graphics, etc.
      */}

      <div className="flex gap-4">
        <Link
          href="/login"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition"
        >
          Register
        </Link>
      </div>
    </main>
  );
}
