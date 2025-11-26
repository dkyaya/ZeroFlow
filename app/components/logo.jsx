"use client";

import { motion } from "framer-motion";

export default function Logo({ size = 48, className = "" }) {
  return (
    <motion.img
      src="/flowrings_1.svg"
      alt="ZeroFlow Logo"
      width={size}
      height={size}
      className={`select-none ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 12,
        ease: "linear"
      }}
    />
  );
}
