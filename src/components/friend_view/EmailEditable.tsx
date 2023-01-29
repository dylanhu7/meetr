import { PlusCircleIcon } from "@heroicons/react/24/solid";
import type { Friend } from "@prisma/client";
import { useState } from "react";
import { Input } from "react-daisyui";
import { api } from "../../utils/api";
import BioMarker from "../BioMarker";
import EditModal from "../EditModal";

export default function EmailEditable({ friend }: { friend: Friend }) {
  const [email, setEmail] = useState<string>(friend.email ?? "");
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
        title="Update email"
        buttonMessage="Edit"
        input={
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        }
        onSave={() => {
          mutation.mutate({ id: friend.id, email });
        }}
      >
        <BioMarker
          name="Email"
          value={friend.email ?? <PlusCircleIcon className="h-5 w-5" />}
        />
      </EditModal>
    </div>
  );
}
