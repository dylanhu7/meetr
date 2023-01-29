import { useSession } from "next-auth/react";
import FriendList from "../components/FriendList";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  return <FriendList />;
}
