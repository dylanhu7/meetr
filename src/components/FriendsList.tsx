import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { Button, Dropdown, Stats } from "react-daisyui";
import { api } from "../utils/api";
import computeScore from "../utils/score";
import AddFriend from "./add_friend/AddFriend";
import FriendCard from "./FriendCard";

enum Sorts {
  Alph = "A - Z",
  Score = "Score",
}

enum SortDirections {
  Asc = "Ascending",
  Desc = "Descending",
}

export default function FriendsList() {
  const friends = api.friends.getFriends.useQuery();
  const [sort, setSort] = useState<Sorts>(Sorts.Alph);
  const [sortDirection, setSortDirection] = useState<SortDirections>(
    SortDirections.Asc
  );
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
              startIcon={
                sortDirection === SortDirections.Asc ? (
                  <ArrowUpIcon className="h-4 w-4" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4" />
                )
              }
            >
              {sort}
            </Button>
            <Dropdown.Menu className="w-52">
              {[Sorts.Alph, Sorts.Score].map((s) => (
                <Dropdown.Item
                  key={s}
                  onClick={() => {
                    if (s !== sort) {
                      setSortDirection(SortDirections.Desc);
                      setSort(s);
                    } else {
                      setSortDirection(
                        sortDirection === SortDirections.Asc
                          ? SortDirections.Desc
                          : SortDirections.Asc
                      );
                      console.log(sortDirection);
                    }
                  }}
                >
                  {s}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Stats className="shadow max-[500px]:stats-vertical">
          <Stats.Stat>
            <Stats.Stat.Item variant="title">Friends</Stats.Stat.Item>
            <Stats.Stat.Item variant="value">
              {friends.data?.length}
            </Stats.Stat.Item>
            <Stats.Stat.Item variant="desc">
              met with{" "}
              <b>
                {friends.data
                  ? // Computes the percentage of friends who have an event in the last month
                    // rounded to the nearest integer out of 100
                    Math.floor(
                      (friends.data?.filter((friend) =>
                        friend.events.some(
                          (event) =>
                            new Date(event.date).getTime() >
                            new Date().getTime() - 30 * 24 * 60 * 60 * 1000
                        )
                      ).length /
                        friends.data?.length) *
                        100
                    ).toString()
                  : "0"}
                %
              </b>{" "}
              last month
            </Stats.Stat.Item>
            <Stats.Stat.Item variant="figure" className="text-primary">
              <UserCircleIcon className="h-8 w-8" />
            </Stats.Stat.Item>
          </Stats.Stat>
          <Stats.Stat>
            <Stats.Stat.Item variant="title">Meets</Stats.Stat.Item>
            <Stats.Stat.Item variant="value">
              {friends.data?.reduce(
                (acc, friend) => acc + friend.events.length,
                0
              )}
            </Stats.Stat.Item>
            <Stats.Stat.Item variant="desc">
              tracked with <b>meetr</b>
            </Stats.Stat.Item>
            <Stats.Stat.Item variant="figure" className="text-primary">
              <ChatBubbleLeftRightIcon className="h-8 w-8" />
            </Stats.Stat.Item>
          </Stats.Stat>
        </Stats>
        <ul className="menu rounded-box menu-compact w-full border bg-base-100 p-2 lg:menu-normal">
          {friends.data
            ?.sort((a, b) => {
              if (sort === Sorts.Alph) {
                return (
                  a.name.localeCompare(b.name) *
                  (sortDirection === SortDirections.Asc ? 1 : -1)
                );
              } else {
                return (
                  (computeScore(b.events) - computeScore(a.events)) *
                  (sortDirection === SortDirections.Asc ? -1 : 1)
                );
              }
            })
            .map((friend, index) => (
              <div key={friend.id}>
                <li>
                  <FriendCard
                    friend={friend}
                    score={computeScore(friend.events)}
                  />
                </li>
                {index !== friends.data.length - 1 && (
                  <hr className="mx-4"></hr>
                )}
              </div>
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
