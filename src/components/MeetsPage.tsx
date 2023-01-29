import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { Button } from "react-daisyui";
import MeetCard from "./MeetCard";

export default function MeetsList() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
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
        <div className="flex flex-col gap-2">
          {[...Array(10).keys()].map((i) => (
            <MeetCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
