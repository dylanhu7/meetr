import Head from "next/head";
import FriendsList from "../components/FriendsList";

export default function Home() {
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
