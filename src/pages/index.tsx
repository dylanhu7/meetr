import { useSession } from "next-auth/react";
import Head from "next/head";
import FriendsList from "../components/FriendsList";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  // const friends = api.friends.getFriends.useQuery();
  return (
    <>
      <Head>
        <title>meetr</title>
        <meta name="description" content="friends, managed." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FriendsList />
    </>
  );
}
