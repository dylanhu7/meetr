import type { Session } from "next-auth";
import { headers } from "next/headers";
import Header from "../components/Header";
import "../styles/globals.css";

import AuthContext from "../components/AuthContext";
import { env } from "../env/server.mjs";

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(`${env.NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookie,
    },
  });

  return (await response.json()) as Session;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession(headers().get("cookie") ?? "");
  return (
    <html lang="en" className="overscroll-none">
      <head />
      <AuthContext session={session}>
        <body className="flex flex-col items-center justify-center bg-gray-100">
          <div id="mobile-container" className="w-screen max-w-lg">
            <Header />
            <main className="screen min-h-[calc(100vh-4rem)] w-full overflow-clip bg-white p-4 md:p-6">
              {children}
            </main>
          </div>
        </body>
      </AuthContext>
    </html>
  );
}
