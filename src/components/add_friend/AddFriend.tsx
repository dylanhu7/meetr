"use client";

import { UserPlusIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button, Input } from "react-daisyui";
import { api } from "../../utils/api";

export default function AddFriend() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [friendName, setFriendName] = useState<string>();

  const mutation = api.friends.addFriend.useMutation();
  const newFriend =
    session?.user && friendName !== undefined
      ? {
          name: friendName,
          email: undefined,
          phone: undefined,
          birthday: undefined,
          note: undefined,
          user: session.user,
          userId: session.user.id,
          events: [],
          createdAt: undefined,
          updatedAt: undefined,
        }
      : undefined;

  return (
    <>
      <Button
        variant="outline"
        color="primary"
        size="sm"
        startIcon={<UserPlusIcon className="h-4 w-4" />}
        onClick={() => setIsOpen(!isOpen)}
      >
        Add Friend
      </Button>
      <div
        className={
          (isOpen ? "modal-open " : "") + "modal modal-bottom sm:modal-middle"
        }
      >
        <div className="modal-box flex flex-col gap-4">
          <div className="flex w-full items-center justify-center gap-2 font-sans">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text text-lg font-bold">
                  {"What's your friend's name?"}
                </span>
              </label>
              <Input onChange={(e) => setFriendName(e.target.value)} />
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
                if (!newFriend) return;
                mutation.mutate(newFriend);
                setIsOpen(!isOpen);
              }}
            >
              Add Friend
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
