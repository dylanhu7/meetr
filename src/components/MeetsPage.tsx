import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import type { Event } from "@prisma/client";
import { Button } from "react-daisyui";
import MeetCard from "./MeetCard";

const exampleMeets: Event[] = [
  {
    id: "1",
    name: "Lunch",
    date: new Date(),
    location: "Starbucks",
    note: "We talked about the weather.",
    friendId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Ice Skating",
    date: new Date(),
    location: "Starbucks",
    note: "We talked about the weather.",
    friendId: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function MeetsList() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            color="primary"
            size="sm"
            startIcon={<ChatBubbleLeftRightIcon className="h-4 w-4" />}
          >
            Log Meet
          </Button>
        </div>
        <ul className="menu rounded-box menu-compact w-full border bg-base-100 p-2 lg:menu-normal">
          {exampleMeets.map((meet, index) => (
            <>
              <li key={meet.id}>
                <MeetCard meet={meet} />
              </li>
              {index !== exampleMeets.length - 1 && <hr className="mx-4"></hr>}
            </>
          ))}
        </ul>
      </div>
    </div>
  );
}
