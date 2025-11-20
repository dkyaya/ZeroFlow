// app/layout.jsx
// Root layout for the entire ZeroFlow application.
// Every route and component is wrapped by this layout 
// because Next.js App Router uses nested layouts by default.

import "./../styles/globals.css"; 
// Import global styles. This affects the entire app.

export const metadata = {
  // Metadata used by Next.js to fill <head> info automatically.
  title: "ZeroFlow",
  description: "A clean, simple calorie tracker built with Next.js 14",
};

// The RootLayout component wraps all pages.
// `children` represents the content of the current route.
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 
        The <html> tag defines the language for accessibility and SEO.
        Next.js requires this to be inside the component.
      */}
      <body>
        {/* 
          Everything rendered in the app will appear here.
          This body tag is shared across all pages, so it's the best place
          to add global UI pieces later if needed (navbar, footer, etc.).
        */}

        <div id="__zeroflow-root">
          {/* 
            A wrapper div allows compatibility with certain UI libraries 
            and gives us a root node to apply global styling/layout patterns.
          */}
          {children}
        </div>

      </body>
    </html>
  );
}
