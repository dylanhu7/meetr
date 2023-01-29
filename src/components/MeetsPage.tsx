import type { Event } from "@prisma/client";
import { api } from "../utils/api";
import LogMeet from "./log_meet/LogMeet";
import MeetCard from "./MeetCard";

export default function MeetsList() {
  const events = api.events.getEvents.useQuery();
  const friends = api.friends.getFriends.useQuery();
  if (events.isLoading) {
    return null;
  }

  const friendsIds = friends.data?.map((friend) => friend.id);
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        <div className="flex justify-end gap-4">
          <LogMeet />
        </div>
        <ul className="menu rounded-box menu-compact w-full border bg-base-100 p-2 lg:menu-normal">
          {events &&
            events.data &&
            events.data
              ?.filter((meet: Event) => friendsIds?.includes(meet.friendId))
              .sort(
                (a: Event, b: Event) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .map((meet, index) => (
                <div key={meet.id}>
                  <li>
                    <MeetCard meet={meet} />
                  </li>
                  {index !== events.data?.length - 1 && (
                    <hr className="mx-4"></hr>
                  )}
                </div>
              ))}
        </ul>
      </div>
    </div>
  );
}
