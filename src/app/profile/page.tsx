import { getServerSession } from "next-auth";
import Head from "next/head";
import { SignIn, SignOut } from "../../components/welcome/actions";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
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
          {session && <span>Logged in as {session.user?.name}</span>}
        </p>
        <SignIn />
        <SignOut />
      </div>
    </>
  );
};

export default ProfilePage;
