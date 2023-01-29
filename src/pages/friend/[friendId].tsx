import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Card } from "react-daisyui";
import BioMarker from "../../components/BioMarker";
import FriendlyRange from "../../components/FriendlyRange";
import { api } from "../../utils/api";

// export default function building() {
const FriendPage: NextPage = () => {
  const router = useRouter();
  const friendId = router.query.friendId as string;

  const friend = api.friends.getFriend.useQuery({ id: friendId });

  const [score, setScore] = useState<number>(30);

  return (
    <>
      <Head>
        <title>meetr</title>
        <meta name="description" content="friends, managed." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {friend.data ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h3 className="text-md">friend</h3>
            <h2 className="text-3xl font-bold">{friend.data?.name}</h2>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-sm">Actual Engagement</p>
            <FriendlyRange score={score} size={"xs"} />
            <FriendlyRange
              score={score}
              setScore={setScore}
              size="lg"
              enabled
            />
            <p className="text-sm">
              Engagement Target: You are <strong>over</strong> target.
            </p>
          </div>
          <Card compact="sm">
            <Card.Body>
              <Card.Title>Bio</Card.Title>
              <BioMarker name="Phone Number" value="(323) 488-1111" />
              <BioMarker name="Birthday" value="Apr 24" />
              <BioMarker name="Email" value="linus_sun@brown.edu" />
              <BioMarker
                name="Note"
                value="Likes to eat pie. Wants a vanilla bean pie for birthday."
              />
            </Card.Body>
          </Card>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default FriendPage;
