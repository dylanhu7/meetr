import { type NextPage } from "next";
import Head from "next/head";
import { api } from "../../utils/api";

const MeetsPage: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>meetr</title>
        <meta name="description" content="friendship, managed." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>hello</p>
    </>
  );
};

export default MeetsPage;
