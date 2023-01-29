import { api } from "../utils/api";
import LogMeet from "./log_meet/LogMeet";
import MeetCard from "./MeetCard";

export default function MeetsList() {
  const events = api.events.getEvents.useQuery();
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        <div className="flex justify-end gap-4">
          <LogMeet />
        </div>
        <ul className="menu rounded-box menu-compact w-full border bg-base-100 p-2 lg:menu-normal">
          {events.data?.map((meet, index) => (
            <div key={meet.id}>
              <li>
                <MeetCard meet={meet} />
              </li>
              {index !== events.data?.length - 1 && <hr className="mx-4"></hr>}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
