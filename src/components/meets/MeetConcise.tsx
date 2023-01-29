import type { Event } from "@prisma/client";
import { timeSinceDateToVerbose } from "../../utils/score";

export default function MeetConcise(props: { event: Event }) {
  return (
    <div className="flex flex-col">
      <p>
        met <strong>{timeSinceDateToVerbose(props.event.date)}</strong> for{" "}
        <strong>{props.event.name}</strong> at{" "}
        <strong>{props.event.location}</strong>
      </p>
      {props.event.note && (
        <p className="font-light">
          <span className="font-bold">Notes:</span> {props.event.note}
        </p>
      )}
    </div>
  );
}
