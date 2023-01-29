import { UserGroupIcon } from "@heroicons/react/24/solid";
import { Stats } from "react-daisyui";
import FriendCard from "./FriendCard";

export default function FriendList() {
  return (
    <>
      <Stats className="font-sans shadow">
        <Stats.Stat>
          <Stats.Stat.Item variant="figure" className="text-primary">
            <UserGroupIcon className="h-6 w-6" />
          </Stats.Stat.Item>
          <Stats.Stat.Item variant="title">Total Friends</Stats.Stat.Item>
          <Stats.Stat.Item variant="value" className="text-primary">
            84
          </Stats.Stat.Item>
          <Stats.Stat.Item variant="desc">Let's go!</Stats.Stat.Item>
        </Stats.Stat>

        <Stats.Stat>
          <Stats.Stat.Item variant="figure" className="text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-8 w-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </Stats.Stat.Item>
          <Stats.Stat.Item variant="title">Page Views</Stats.Stat.Item>
          <Stats.Stat.Item variant="value" className="text-secondary">
            2.6M
          </Stats.Stat.Item>
          <Stats.Stat.Item variant="desc">
            21% more than last month
          </Stats.Stat.Item>
        </Stats.Stat>
      </Stats>
      <FriendCard />
      <FriendCard />
      <FriendCard />
    </>
  );
}
