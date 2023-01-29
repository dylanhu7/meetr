import { useSession } from "next-auth/react";
import FriendList from "../components/FriendList";
import Welcome from "../components/welcome/Welcome";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  //   const friends = api.friends.getFriends.useQuery();
  if (!session) {
    return <Welcome />;
  }
  return <FriendList />;
}
