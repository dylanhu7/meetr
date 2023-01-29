import { PencilSquareIcon } from "@heroicons/react/24/solid";

export interface BioMarkerProps {
  name: string;
  value: string;
}

export default function BioMarker({ name, value }: BioMarkerProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-1">
        <span className="text-sm font-semibold text-gray-500">{name}</span>
        <PencilSquareIcon className="h-3 w-3 text-gray-500" />
      </div>
      <div>
        <span className="whitespace-pre-line text-lg font-semibold text-gray-800">
          {value}
        </span>{" "}
      </div>
    </div>
  );
}
