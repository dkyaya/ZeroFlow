"use client";

import Link from "next/link";
import Logo from "./logo"; // FlowRings animated logo
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/food/log", label: "Log Food" },
    { href: "/food/search", label: "Search" },
    { href: "/settings", label: "Settings" },
  ];

  return (
    <nav className="w-full bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-40">
      {/* Left: Logo + Name */}
      <div className="flex items-center gap-3">
        <Logo size={26} />
        <span className="text-xl font-semibold tracking-tight text-slate-900">
          ZeroFlow
        </span>
      </div>

      {/* Right: Navigation links */}
      <div className="flex items-center gap-6">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`text-sm font-medium transition ${
              pathname === l.href
                ? "text-blue-700"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {l.label}
          </Link>
        ))}

        {/* Log out */}
        <form
          action="/api/auth/logout"
          method="POST"
        >
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-700 text-white text-sm font-medium hover:bg-blue-800 transition shadow-sm"
          >
            Log Out
          </button>
        </form>
      </div>
    </nav>
  );
}
