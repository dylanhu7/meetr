"use client";

import { Badge, Collapse } from "react-daisyui";

export default function MeetCard() {
  return (
    <Collapse icon="plus">
      <Collapse.Title className="text-xl font-light">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-0">
            <div className="flex items-center gap-2">
              <p>
                met with <span className="font-bold">Nishka P.</span> for{" "}
                <span className="font-bold">lunch</span>
              </p>
            </div>
            <p className="text-xs">yesterday</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" color="primary">
              food
            </Badge>
            <Badge variant="outline" color="secondary">
              catch up
            </Badge>
            <Badge variant="outline" color="accent">
              pizza
            </Badge>
          </div>
        </div>
      </Collapse.Title>
      <Collapse.Content>
        <strong>Notes: </strong>Had a great lunch, ate ramen!
      </Collapse.Content>
    </Collapse>
  );
}
