import { PlusCircleIcon } from "@heroicons/react/24/solid";
import type { Friend } from "@prisma/client";
import { AsYouType } from "libphonenumber-js";
import { useState } from "react";
import { Input } from "react-daisyui";
import { api } from "../../utils/api";
import BioMarker from "../BioMarker";
import EditModal from "../EditModal";

export default function PhoneNumberEditable({ friend }: { friend: Friend }) {
  const [phoneNumber, setPhoneNumber] = useState(friend.phone ?? "");
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
        title="Update phone number"
        buttonMessage="Edit"
        input={
          <Input
            value={phoneNumber}
            onChange={(e) => {
              const formatted = new AsYouType("US").input(e.target.value);
              console.log(formatted);
              setPhoneNumber(formatted);
            }}
          />
        }
        onSave={() => {
          if (phoneNumber) {
            mutation.mutate({ id: friend.id, phone: phoneNumber });
          }
        }}
      >
        <BioMarker
          name="Phone Number"
          value={friend.phone ?? <PlusCircleIcon className="h-5 w-5" />}
        />
      </EditModal>
    </div>
  );
}
