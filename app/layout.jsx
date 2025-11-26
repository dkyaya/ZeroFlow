// app/layout.jsx
// Root layout for the entire ZeroFlow app (Final Project Version).
// This file defines the global page structure and wraps all pages/routes.

import "./../styles/globals.css";
// Imports Tailwind + any global styles for the entire project.

export const metadata = {
  // Metadata that will be injected into the <head> of every page.
  title: "ZeroFlow",
  description: "A clean, simple calorie tracker built with Next.js 14",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 
        The <html> wrapper is required by Next.js.
        Setting lang="en" assists screen readers and overall accessibility.
      */}

      <body className="bg-gray-50">
        {/* 
          Global background applied once here.
          All pages inherit it automatically.
        */}

        <div id="__zeroflow-root">
          {/* 
            Wrapper around all pages. This allows future expansion 
            (navigation bars, footers, theming wrappers, etc.).
          */}
          {children}
        </div>
      </body>
    </html>
  );
}
