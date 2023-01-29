import { PlusCircleIcon } from "@heroicons/react/24/solid";
import type { Friend } from "@prisma/client";
import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { type DateValueType } from "react-tailwindcss-datepicker/dist/types";
import { api } from "../../utils/api";
import BioMarker from "../BioMarker";
import EditModal from "../EditModal";

export function dateToDateValue(date: Date): DateValueType {
  return {
    startDate: date,
    endDate: date,
  };
}

export function dateToDateString(date: Date): string {
  // Convert to Month Day Year
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function BirthdayEditable({ friend }: { friend: Friend }) {
  const [birthday, setBirthday] = useState(
    dateToDateValue(friend.birthday ?? new Date())
  );
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
        title="Update birthday"
        buttonMessage="Edit"
        input={
          <Datepicker
            value={birthday}
            onChange={(date) => {
              setBirthday(date);
            }}
            asSingle
          />
        }
        onSave={() => {
          if (birthday) {
            mutation.mutate({
              id: friend.id,
              birthday: new Date(birthday.startDate as Date),
            });
          }
        }}
      >
        <BioMarker
          name="Birthday"
          value={
            friend.birthday ? (
              dateToDateString(friend.birthday)
            ) : (
              <PlusCircleIcon className="h-5 w-5" />
            )
          }
        />
      </EditModal>
    </div>
  );
}
