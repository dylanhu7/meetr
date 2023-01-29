import { type Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "../utils/api";

import Header from "../components/Header";
import Welcome from "../components/welcome/Welcome";
import "../styles/globals.css";

// import { Inter } from "@next/font/google";

// const inter = Inter({
//   subsets: ["latin"],
// });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <LoginBoundary>
        <div
          className={
            // inter.className +
            // " " +
            "flex flex-col items-center justify-center bg-gray-100"
          }
        >
          <div id="mobile-container" className="w-screen max-w-lg">
            <Header />
            <main className="screen min-h-[calc(100vh-4rem)] w-full bg-white p-4 md:p-6">
              <Component {...pageProps} />
            </main>
          </div>
        </div>
      </LoginBoundary>
    </SessionProvider>
  );
};

const LoginBoundary = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  if (session.status === "loading") {
    return null;
  }
  if (session.status === "unauthenticated") {
    return <Welcome />;
  }
  return <>{children}</>;
};

export default api.withTRPC(MyApp);
