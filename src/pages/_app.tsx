import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "../utils/api";

import Header from "../components/Header";
import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <div className="flex flex-col items-center justify-center bg-gray-100">
        <div
          id="mobile-container"
          className="w-screen max-w-lg overflow-hidden"
        >
          <Header />
          <main className="screen min-h-[calc(100vh-4rem)] w-full overflow-clip bg-white p-4 md:p-6">
            <Component {...pageProps} />
          </main>
        </div>
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
