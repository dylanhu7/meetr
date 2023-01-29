import { useSession } from "next-auth/react";
import Head from "next/head";
import { SignOut } from "../components/welcome/actions";
import Welcome from "../components/welcome/Welcome";

const ProfilePage = () => {
  const { data: session } = useSession();

  if (!session) {
    return <Welcome />;
  }

  return (
    <>
      <Head>
        <title>meetr: profile</title>
        <meta name="description" content="friends, managed." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2 className="text-2xl font-black">Profile</h2>
      <div className="flex flex-col justify-center gap-4">
        <p className="text-2xl font-medium">
          {session && <span>Logged in as {session.user?.name}</span>}
        </p>
        <div className="flex items-center justify-center gap-4">
          <SignOut />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
