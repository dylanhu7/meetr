import type { Event } from "@prisma/client";
import { Collapse } from "react-daisyui";

interface MeetCardProps {
  meet: Event;
}

export default function MeetCard(props: MeetCardProps) {
  return (
    <Collapse className="collapse-arrow collapse flex w-full flex-col items-start">
      <Collapse.Title className="flex min-h-fit w-full p-0 text-lg">
        <div>
          <strong>{props.meet.name}</strong> with{" "}
          <strong>{props.meet.friendId}</strong>
        </div>
      </Collapse.Title>
      <Collapse.Content className="px-0">
        <strong>Notes: </strong>Had a great lunch, ate ramen!
      </Collapse.Content>
    </Collapse>
  );
}
