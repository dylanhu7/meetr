import { getServerSession } from "next-auth";
import FriendList from "../components/FriendList";
import Welcome from "../components/welcome/Welcome";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  //   const friends = api.friends.getFriends.useQuery();
  if (!session) {
    return <Welcome />;
  }
  return <FriendList />;
}
