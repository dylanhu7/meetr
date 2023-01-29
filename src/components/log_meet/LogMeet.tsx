import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Input, Select, Textarea } from "react-daisyui";
import Datepicker from "react-tailwindcss-datepicker";
import type { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import { api } from "../../utils/api";
import { dateToDateValue } from "../friend_view/BirthdayEditable";

export interface LogMeetProps {
  friendId?: string;
}

export default function LogMeet(props: LogMeetProps) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [friendId, setFriendId] = useState(props.friendId);
  const [eventName, setEventName] = useState<string>();
  const [eventDate, setEventDate] = useState<DateValueType>(
    dateToDateValue(new Date())
  );
  const [eventLocation, setEventLocation] = useState<string>();
  const [eventNote, setEventNote] = useState<string>();
  const router = useRouter();

  const friends = api.friends.getFriends.useQuery();

  const utils = api.useContext();
  const mutation = api.events.addEvent.useMutation({
    onSuccess: (event) => {
      void utils.friends.getFriends.invalidate();
      void utils.friends.getFriend.invalidate();
    },
  });
  const newEvent =
    session?.user &&
    friendId !== undefined &&
    eventName !== undefined &&
    eventDate !== undefined
      ? {
          name: eventName,
          date: new Date(eventDate?.startDate?.toLocaleString() ?? Date.now()),
          note: eventNote,
          friendId: friendId,
          location: eventLocation,
        }
      : undefined;

  let options = [<Select.Option key="1" value="default"></Select.Option>];
  options = [
    ...options,
    ...(friends.data?.map((friend) => (
      <Select.Option key={friend.id} itemID={friend.id} value={friend.id}>
        {friend.name}
      </Select.Option>
    )) ?? []),
  ];

  return (
    <>
      <Button
        variant="outline"
        color="primary"
        size="sm"
        startIcon={<ChatBubbleLeftRightIcon className="h-4 w-4" />}
        onClick={() => setIsOpen(!isOpen)}
      >
        Log Meet
      </Button>
      <div
        className={
          (isOpen ? "modal-open " : "") + "modal modal-bottom sm:modal-middle"
        }
      >
        <div className="modal-box flex flex-col gap-2 overflow-visible">
          <div className="flex w-full items-center justify-center gap-1 font-sans">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-lg font-bold">
                  {"Choose a friend"}
                </span>
              </label>
              <Select
                value={friendId}
                onChange={(event) => setFriendId(event.target.value)}
              >
                {options}
              </Select>
            </div>
          </div>
          <div className="flex w-full items-center justify-center gap-1 font-sans">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-lg font-bold">
                  {"When did you meet?"}
                </span>
              </label>
              <Datepicker
                containerClassName="input-bordered input flex border pl-0"
                value={eventDate}
                onChange={setEventDate}
                asSingle
                // No future dates
                maxDate={new Date()}
              />
            </div>
          </div>
          <div className="flex w-full items-center justify-center gap-1 font-sans">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-lg font-bold">
                  {"What did you do together?"}
                </span>
              </label>
              <Input onChange={(e) => setEventName(e.target.value)} />
            </div>
          </div>
          <div className="flex w-full items-center justify-center gap-1 font-sans">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-lg font-bold">
                  {"Where did you meet?"}
                </span>
              </label>
              <Input onChange={(e) => setEventLocation(e.target.value)} />
            </div>
          </div>
          <div className="flex w-full items-center justify-center gap-1 font-sans">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-lg font-bold">{"Notes"}</span>
              </label>
              <Textarea
                rows={1}
                onChange={(e) => setEventNote(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-action">
            <Button
              variant="outline"
              color="secondary"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              color="primary"
              size="sm"
              onClick={() => {
                if (!newEvent) return;
                mutation.mutate(newEvent);
                setIsOpen(!isOpen);
              }}
            >
              Log Meet
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
