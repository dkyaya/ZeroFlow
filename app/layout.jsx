// app/layout.jsx
// Root layout for the entire ZeroFlow application.

import "./../styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata = {
  title: "ZeroFlow",
  description: "A clean, simple calorie tracker built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} bg-slate-50 font-sans`}>
        <div id="__zeroflow-root">{children}</div>
      </body>
    </html>
  );
}
