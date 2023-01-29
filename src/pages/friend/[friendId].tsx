import { ArrowDownOnSquareIcon } from "@heroicons/react/24/solid";
import type { Event } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Card, Collapse } from "react-daisyui";
import FriendlyRange from "../../components/FriendlyRange";
import BirthdayEditable from "../../components/friend_view/BirthdayEditable";
import EmailEditable from "../../components/friend_view/EmailEditable";
import FriendNameEditable from "../../components/friend_view/FriendNameEditable";
import NoteEditable from "../../components/friend_view/NoteEditable";
import PhoneNumberEditable from "../../components/friend_view/PhoneNumberEditable";
import LogMeet from "../../components/log_meet/LogMeet";
import MeetConcise from "../../components/meets/MeetConcise";
import { api } from "../../utils/api";
import computeScore, { scoreToWordFrequency } from "../../utils/score";

// export default function building() {
const FriendPage: NextPage = () => {
  const router = useRouter();
  const friendId = router.query.friendId as string;
  const friend = api.friends.getFriend.useQuery({ id: friendId });
  const realScore = computeScore(friend.data?.events ?? []);
  const [score, setScore] = useState<number>(
    friend.data?.targetScore ?? realScore
  );
  const [loadedTargetScore, setLoadedTargetScore] = useState<number>(
    friend.data?.targetScore ?? score
  );
  computeScore(friend.data?.events ?? []);

  const deleteFriend = api.friends.deleteFriend.useMutation({
    onSuccess: () => {
      // Invalidate
      void router.push("/");
    },
  });

  const mutation = api.friends.updateFriend.useMutation({
    onSuccess: () => {
      // Invalidate
      void friend.refetch();
    },
  });

  return (
    <>
      <Head>
        <title>meetr</title>
        <meta name="description" content="friends, managed." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {friend.data ? (
        <div className="flex flex-col gap-6">
          <FriendNameEditable friend={friend.data} />
          <Card compact="sm">
            <Card.Body>
              <div className="flex flex-row">
                <Card.Title className="grow">Engagement</Card.Title>
                {score !== loadedTargetScore && (
                  <Button
                    startIcon={<ArrowDownOnSquareIcon className="h-4 w-4" />}
                    variant="outline"
                    size="sm"
                    color="primary"
                    onClick={() => {
                      friend.data &&
                        mutation.mutate({
                          id: friend.data.id,
                          targetScore: score,
                        });
                      setLoadedTargetScore(score);
                    }}
                  >
                    Save
                  </Button>
                )}
              </div>
              <div className="flex flex-col items-center gap-1">
                {/* <p className="text-sm font-medium">Actual Engagement:</p> */}
                <p className="text-sm font-light">
                  You <span className="font-bold">currently</span> meet with
                  them about{" "}
                  <span className="font-bold">
                    {scoreToWordFrequency(realScore)}
                  </span>
                  .{" "}
                </p>
                <FriendlyRange score={realScore} size={"xs"} />
                <FriendlyRange
                  score={score}
                  setScore={setScore}
                  size="lg"
                  enabled
                />
                {/* <p className="text-sm">Engagement Target:</p> */}
                <p className="text-sm font-light">
                  You <span className="font-bold">hope to</span> meet with them
                  about{" "}
                  <span className="font-bold">
                    {scoreToWordFrequency(score)}
                  </span>
                  .{" "}
                </p>
                <p>
                  You are{" "}
                  <strong>{score - realScore > 0 ? "below" : "above"}</strong>{" "}
                  target.{" "}
                  {score - realScore > 0
                    ? "Try to meet with them more!"
                    : "Great job!"}
                </p>
              </div>
            </Card.Body>
          </Card>
          <Card compact="sm">
            <Card.Body>
              <Card.Title>Bio</Card.Title>
              <PhoneNumberEditable friend={friend.data} />
              <BirthdayEditable friend={friend.data} />
              <EmailEditable friend={friend.data} />
              <NoteEditable friend={friend.data} />
            </Card.Body>
          </Card>
          <Card compact="sm">
            <Card.Body>
              <div className="flex flex-row">
                <Card.Title className="grow">Meets</Card.Title>
                <LogMeet friendId={friendId} />
              </div>
              <div className="flex flex-col gap-4">
                {friend.data.events
                  .sort(
                    (a: Event, b: Event) => b.date.getTime() - a.date.getTime()
                  )
                  .map((event) => (
                    <MeetConcise event={event} key={event.id} />
                  ))}
              </div>
              {friend.data.events.length === 0 && (
                <p className="text-sm text-gray-500">
                  You haven&apos;t logged any meets with this friend yet.
                </p>
              )}
            </Card.Body>
          </Card>
          {/* Delete friend button */}
          <Card>
            <Collapse icon="arrow">
              <Collapse.Title className="text-xl font-medium">
                Dangerous Settings
              </Collapse.Title>
              <Collapse.Content>
                <div className="flex flex-col">
                  <Button
                    variant="outline"
                    color="error"
                    size="sm"
                    onClick={() => {
                      console.log("deleting a friend");
                      deleteFriend.mutate({ id: friendId });
                    }}
                  >
                    Delete Friend
                  </Button>
                </div>
              </Collapse.Content>
            </Collapse>
          </Card>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default FriendPage;
