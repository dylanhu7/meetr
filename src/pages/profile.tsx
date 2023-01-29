import { useSession } from "next-auth/react";
import Head from "next/head";
import { Card } from "react-daisyui";
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
      <div className="flex flex-col gap-4">
        <div className="flex flex-row">
          <h2 className="grow text-2xl font-black">Profile</h2>
          <SignOut />
        </div>
        <div className="flex flex-row items-center gap-4">
          <p className="text-2xl font-medium">
            {session && (
              <span>
                Logged in as <strong>{session.user?.name}</strong>.
              </span>
            )}
          </p>
        </div>
        <Card compact="sm">
          <Card.Body>
            <div className="flex flex-col justify-center gap-4">
              <LinkPhone />
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default ProfilePage;
