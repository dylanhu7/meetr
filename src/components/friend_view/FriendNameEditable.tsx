import { PencilSquareIcon } from "@heroicons/react/24/solid";
import type { Friend } from "@prisma/client";
import { useState } from "react";
import { Input } from "react-daisyui";
import { api } from "../../utils/api";
import EditModal from "../EditModal";

export default function FriendNameEditable({ friend }: { friend: Friend }) {
  const [name, setName] = useState<string>(friend.name);
  const utils = api.useContext();
  const mutation = api.friends.updateFriend.useMutation({
    onSuccess: () => {
      // Invalidate
      void utils.friends.getFriend.invalidate();
    },
  });

  return (
    <div className="flex flex-col">
      <EditModal
        title="Update name"
        buttonMessage="Edit"
        input={<Input value={name} onChange={(e) => setName(e.target.value)} />}
        onSave={() => {
          mutation.mutate({ id: friend.id, name });
        }}
      >
        <div className="flex flex-row items-center gap-1">
          <h3 className="text-md">friend</h3>
          <PencilSquareIcon className="h-3 w-3 text-gray-500" />
        </div>
        <h2 className="text-3xl font-bold">{friend.name}</h2>
      </EditModal>
    </div>
  );
}
