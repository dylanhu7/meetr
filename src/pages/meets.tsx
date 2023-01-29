import Head from "next/head";
import MeetsList from "../components/MeetsPage";

const MeetsPage = () => {
  return (
    <>
      <Head>
        <title>meetr: meets</title>
        <meta name="description" content="friends, managed." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MeetsList />
    </>
  );
};

export default MeetsPage;
