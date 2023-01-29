import { useSession } from "next-auth/react";
import Head from "next/head";
import LinkPhone from "../components/sms/LinkPhone";
import { SignOut } from "../components/welcome/actions";

const ProfilePage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>meetr: profile</title>
        <meta name="description" content="friends, managed." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2 className="text-2xl font-black">Profile</h2>
      <div className="flex flex-col justify-center gap-4">
        <div className="flex flex-row items-center gap-4">
          <p className="text-2xl font-medium">
            {session && <span>Logged in as {session.user?.name}</span>}
          </p>
          <SignOut />
        </div>
        <LinkPhone />
      </div>
    </>
  );
};

export default ProfilePage;
