import { PlusCircleIcon } from "@heroicons/react/24/solid";
import type { Friend } from "@prisma/client";
import { useState } from "react";
import { Textarea } from "react-daisyui";
import { api } from "../../utils/api";
import BioMarker from "../BioMarker";
import EditModal from "../EditModal";

export default function NoteEditable({ friend }: { friend: Friend }) {
  const [note, setNote] = useState<string>(friend.note ?? "");
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
        title="Update note"
        buttonMessage="Edit"
        input={
          <Textarea value={note} onChange={(e) => setNote(e.target.value)} />
        }
        onSave={() => {
          mutation.mutate({ id: friend.id, note });
        }}
      >
        <BioMarker
          name="Note"
          value={friend.note ?? <PlusCircleIcon className="h-5 w-5" />}
        />
      </EditModal>
    </div>
  );
}
