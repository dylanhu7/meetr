import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
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
      <div className="flex flex-col gap-8">
        <div className="flex flex-row items-start justify-between">
          <div className="flex flex-col gap-4">
            {session?.user?.image && (
              <Image
                src={session?.user?.image.replace("=s96-c", "=s1024-c")}
                width={200}
                height={200}
                alt={session.user.name ?? "profile pic"}
                className="rounded-3xl"
              />
            )}

            <div className="flex flex-col gap-4">
              <div>
                <p className="text-4xl font-medium">
                  {session && <strong>{session.user?.name}</strong>}
                </p>
                <p className="ml-0.5 text-base font-light text-gray-500">
                  {session && <strong>{session.user?.email}</strong>}
                </p>
              </div>
            </div>
          </div>
          <SignOut />
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
