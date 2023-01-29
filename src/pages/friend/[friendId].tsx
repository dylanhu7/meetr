import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Card } from "react-daisyui";
import FriendlyRange from "../../components/FriendlyRange";
import BirthdayEditable from "../../components/friend_view/BirthdayEditable";
import EmailEditable from "../../components/friend_view/EmailEditable";
import FriendNameEditable from "../../components/friend_view/FriendNameEditable";
import NoteEditable from "../../components/friend_view/NoteEditable";
import PhoneNumberEditable from "../../components/friend_view/PhoneNumberEditable";
import { api } from "../../utils/api";
import computeScore from "../../utils/score";

// export default function building() {
const FriendPage: NextPage = () => {
  const router = useRouter();
  const friendId = router.query.friendId as string;

  const friend = api.friends.getFriend.useQuery({ id: friendId });

  const [score, setScore] = useState<number>(30);

  computeScore(friend.data?.events ?? []);

  return (
    <>
      <Head>
        <title>meetr</title>
        <meta name="description" content="friends, managed." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {friend.data ? (
        <div className="flex flex-col gap-4">
          <FriendNameEditable friend={friend.data} />
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
              <PhoneNumberEditable friend={friend.data} />
              <BirthdayEditable friend={friend.data} />
              <EmailEditable friend={friend.data} />
              <NoteEditable friend={friend.data} />
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
