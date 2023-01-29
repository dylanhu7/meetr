"use client";

import Header from "../components/Header";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overscroll-none">
      <head />
      <body className="flex flex-col items-center justify-center bg-gray-100">
        <div
          id="mobile-container"
          className="w-screen max-w-lg overflow-hidden"
        >
          <Header />
          <main className="screen min-h-[calc(100vh-4rem)] w-full overflow-clip bg-white p-4 md:p-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
