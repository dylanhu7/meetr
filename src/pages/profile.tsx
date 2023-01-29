import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";

const ProfilePage: NextPage = () => {
  const { data: sessionData } = useSession();
  return (
    <>
      <Head>
        <title>meetr</title>
        <meta name="description" content="friendship, managed." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>Profile</h2>
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center text-2xl">
          {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        </p>
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
          onClick={
            sessionData ? () => void signOut() : () => void signIn("google")
          }
        >
          {sessionData ? "Sign out" : "Sign in with Google"}
        </button>
      </div>
    </>
  );
};

export default ProfilePage;
