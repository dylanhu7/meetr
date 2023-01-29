"use client";

import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Card } from "react-daisyui";
import FriendlyRange from "./FriendlyRange";

export default function FriendCard() {
  return (
    <Card compact className="w-full">
      <Card.Body>
        <div className="flex items-center gap-8">
          <div className="flex grow flex-col gap-1">
            <Card.Title>Nishka P.</Card.Title>
            <FriendlyRange />
          </div>
          <ChevronRightIcon className="h-6 w-6" />
        </div>
      </Card.Body>
    </Card>
  );
}
