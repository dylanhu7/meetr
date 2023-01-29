import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Welcome from "../components/Welcome";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const friends = api.friends.getFriends.useQuery();
  if (!sessionData?.user) {
    return <Welcome />;
  }
  return (
    <>
      <Head>
        <title>meetr</title>
        <meta name="description" content="friendship, managed." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center gap-2">
        <p className="text-2xl">
          {friends.data ? (
            <span>
              {friends.data.length} friends:{" "}
              {friends.data.map((friend) => friend.name).join(", ")}
            </span>
          ) : (
            "Loading..."
          )}
        </p>
      </div>
    </>
  );
};

export default Home;
