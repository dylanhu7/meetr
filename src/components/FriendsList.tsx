import {
  ArrowsUpDownIcon,
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { Button, Dropdown, Stats } from "react-daisyui";
import { api } from "../utils/api";
import AddFriend from "./add_friend/AddFriend";
import FriendCard from "./FriendCard";

export default function FriendsList() {
  const friends = api.friends.getFriends.useQuery();
  return friends.isLoading ? (
    <></>
  ) : (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-end gap-4">
          <AddFriend />
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
            <Stats.Stat.Item variant="value">
              {friends.data?.length}
            </Stats.Stat.Item>
            <Stats.Stat.Item variant="desc">
              {/* TODO: percentage met with */}
              met with <b>40%</b> last month
            </Stats.Stat.Item>
            <Stats.Stat.Item variant="figure" className="text-primary">
              <UserCircleIcon className="h-8 w-8" />
            </Stats.Stat.Item>
          </Stats.Stat>
          <Stats.Stat>
            <Stats.Stat.Item variant="title">Meets</Stats.Stat.Item>
            {/* TODO: number of meets */}
            <Stats.Stat.Item variant="value">325</Stats.Stat.Item>
            <Stats.Stat.Item variant="desc">
              tracked with <b>meetr</b>
            </Stats.Stat.Item>
            <Stats.Stat.Item variant="figure" className="text-primary">
              <ChatBubbleLeftRightIcon className="h-8 w-8" />
            </Stats.Stat.Item>
          </Stats.Stat>
        </Stats>
        <ul className="menu rounded-box menu-compact w-full border bg-base-100 p-2 lg:menu-normal">
          {friends.data?.map((friend, index) => (
            <>
              <li key={friend.id}>
                <FriendCard friend={friend} />
              </li>
              {index !== friends.data.length - 1 && <hr className="mx-4"></hr>}
            </>
          ))}
        </ul>
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
