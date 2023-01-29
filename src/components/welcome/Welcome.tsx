import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { SignIn } from "./actions";

export default async function Welcome() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        {session && <span>Logged in as {session.user?.name}</span>}
      </p>
      <SignIn />
    </div>
  );
}
