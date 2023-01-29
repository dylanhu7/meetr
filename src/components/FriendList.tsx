"use client";

import {
  ArrowsUpDownIcon,
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { Button, Dropdown, Stats } from "react-daisyui";
import FriendCard from "./FriendCard";

export default function FriendList() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            color="primary"
            size="sm"
            startIcon={<UserPlusIcon className="h-4 w-4" />}
          >
            Add Friend
          </Button>
          <Dropdown hover horizontal="center" vertical="end">
            <Button
              variant="outline"
              size="sm"
              startIcon={<ArrowsUpDownIcon className="h-4 w-4" />}
            >
              A-Z
            </Button>
            <Dropdown.Menu className="w-52">
              <Dropdown.Item>A-Z</Dropdown.Item>
              <Dropdown.Item>Score</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Stats className="shadow">
          <Stats.Stat>
            <Stats.Stat.Item variant="title">Friends</Stats.Stat.Item>
            <Stats.Stat.Item variant="value">42</Stats.Stat.Item>
            <Stats.Stat.Item variant="desc">
              met with <b>40%</b> last month
            </Stats.Stat.Item>
            <Stats.Stat.Item variant="figure" className="text-primary">
              <UserCircleIcon className="h-8 w-8" />
            </Stats.Stat.Item>
          </Stats.Stat>
          <Stats.Stat>
            <Stats.Stat.Item variant="title">Meets</Stats.Stat.Item>
            <Stats.Stat.Item variant="value">325</Stats.Stat.Item>
            <Stats.Stat.Item variant="desc">
              tracked with <b>meetr</b>
            </Stats.Stat.Item>
            <Stats.Stat.Item variant="figure" className="text-primary">
              <ChatBubbleLeftRightIcon className="h-8 w-8" />
            </Stats.Stat.Item>
          </Stats.Stat>
        </Stats>
        <div className="flex flex-col gap-4">
          {[...Array(10).keys()].map((i) => (
            <FriendCard key={i} />
          ))}
        </div>
        <div className="flex justify-center opacity-40">
          <h1 className="select-none text-4xl font-black">
            <span className="text-[#1459C1]">m</span>
            <span className="text-[#7AB8F1]">e</span>
            <span className="text-[#E9DD74]">e</span>
            <span className="text-[#E1814A]">t</span>
            <span className="text-[#CF2222]">r</span>
          </h1>
        </div>
      </div>
    </>
  );
}
