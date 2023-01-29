import { ChevronRightIcon } from "@heroicons/react/24/solid";
import type { Friend } from "@prisma/client";
import Link from "next/link";
import { Card } from "react-daisyui";
import FriendlyRange from "./FriendlyRange";

interface FriendCardProps {
  friend: Friend;
}

export default function FriendCard(props: FriendCardProps) {
  return (
    <Link
      href={`/friend/${props.friend.id}`}
      className="flex items-center justify-between gap-8"
    >
      <div className="flex grow flex-col gap-2">
        <Card.Title>{props.friend.name}</Card.Title>
        <FriendlyRange />
      </div>
      <ChevronRightIcon className="h-6 w-6" />
    </Link>
  );
}
