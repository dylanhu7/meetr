import { ChevronRightIcon } from "@heroicons/react/24/solid";
import type { Friend } from "@prisma/client";
import { Card } from "react-daisyui";
import FriendlyRange from "./FriendlyRange";

interface FriendCardProps {
  friend: Friend;
}

export default function FriendCard(props: FriendCardProps) {
  return (
    <Card compact className="w-full">
      <Card.Body>
        <div className="flex items-center gap-8">
          <div className="flex grow flex-col gap-1">
            <Card.Title>{props.friend.name}</Card.Title>
            <FriendlyRange />
          </div>
          <ChevronRightIcon className="h-6 w-6" />
        </div>
      </Card.Body>
    </Card>
  );
}
