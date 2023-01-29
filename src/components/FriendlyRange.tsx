import { Range } from "react-daisyui";

export interface FriendlyRangeProps {
  score?: number;
  setScore?: (score: number) => void;
  size?: "sm" | "md" | "lg" | "xs";
  enabled?: boolean;
}

export default function FriendlyRange(props: FriendlyRangeProps) {
  type color =
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "error";
  const COLORS: color[] = [
    "primary",
    "secondary",
    "accent",
    "success",
    "warning",
    "error",
  ];

  return (
    <Range
      value={props.score ?? 0}
      min={0}
      max={100}
      color={COLORS[Math.floor(((props.score ?? 0) / 101) * COLORS.length)]}
      size={props.size}
      onChange={(e) => {
        if (props.setScore) {
          props.setScore(e.target.valueAsNumber);
        }
      }}
      disabled={!props.enabled}
    />
  );
}
