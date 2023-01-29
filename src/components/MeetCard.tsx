import type { Event, Friend } from "@prisma/client";
import { Collapse } from "react-daisyui";
import { timeSinceDateToVerbose } from "../utils/score";

interface MeetCardProps {
  meet: Event & {
    friend: Friend;
  };
}

export default function MeetCard(props: MeetCardProps) {
  return (
    <Collapse className="collapse-arrow collapse flex w-full flex-col items-start">
      <Collapse.Title className="flex min-h-fit w-full flex-col p-0 text-lg">
        <div>
          <strong>{props.meet.name}</strong> with{" "}
          <strong>{props.meet.friend.name}</strong>
        </div>
        <div className="text-sm text-gray-500">
          {timeSinceDateToVerbose(props.meet.date)} at {props.meet.location}
        </div>
      </Collapse.Title>
      <Collapse.Content className="px-0">
        <strong>Notes: </strong>
        {props.meet.note}
      </Collapse.Content>
    </Collapse>
  );
}
