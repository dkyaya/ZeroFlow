"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./components/logo";

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  // Splash timeout
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">

      {/* ------------------------------------------------ */}
      {/* FULLSCREEN SPLASH SEQUENCE */}
      {/* ------------------------------------------------ */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center bg-slate-50 z-[9999]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1.6, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Logo size={120} />
            </motion.div>

            {/* Splash name text */}
            <motion.h1
              className="mt-6 text-4xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              ZeroFlow
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------------------------------------ */}
      {/* NAVBAR (animated in after splash) */}
      {/* ------------------------------------------------ */}
      <motion.nav
        className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-sm relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={loaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
      >
        {/* Left group: Logo + ZeroFlow text */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          {/* Logo shrinking from splash position */}
          <motion.div
            initial={{ scale: 2.1, x: 0 }}
            animate={loaded ? { scale: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Logo size={32} />
          </motion.div>

          {/* Text sliding right from logo */}
          <motion.span
            className="text-2xl font-bold tracking-tight"
            initial={{ opacity: 0, x: -40 }}
            animate={loaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          >
            ZeroFlow
          </motion.span>
        </motion.div>

        {/* Right side buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 rounded-lg border border-blue-700 text-blue-700 font-medium hover:bg-blue-50 transition"
          >
            Log In
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 rounded-lg bg-blue-700 text-white font-medium hover:bg-blue-800 transition shadow-sm"
          >
            Register
          </Link>
        </div>
      </motion.nav>

      {/* ------------------------------------------------ */}
      {/* HERO */}
      {/* ------------------------------------------------ */}
      <motion.section
        className="flex flex-col items-center mt-24 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={loaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="bg-white shadow-xl rounded-2xl p-10 max-w-2xl text-center border border-slate-100 mx-4">

          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Track Smarter.
          </h2>

          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            ZeroFlow gives you the cleanest, simplest way to monitor calories,
            log meals, and understand your nutrition with zero friction.
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/login"
              className="px-6 py-3 rounded-lg bg-blue-800 text-white font-medium hover:bg-blue-900 transition shadow-md"
            >
              Get Started
            </Link>

            <Link
              href="/register"
              className="px-6 py-3 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-100 transition"
            >
              Create Account
            </Link>
          </div>
        </div>
      </motion.section>

      {/* ------------------------------------------------ */}
      {/* FOOTER */}
      {/* ------------------------------------------------ */}
      <motion.footer
        className="flex justify-center mt-24 pb-8 text-slate-500 text-sm"
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.55 }}
      >
        © ZeroFlow LLC 2025
      </motion.footer>
    </main>
  );
}
