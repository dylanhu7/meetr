import { useSession } from "next-auth/react";
import { SignOut } from "../components/welcome/actions";
import Welcome from "../components/welcome/Welcome";

const ProfilePage = () => {
  const { data: session } = useSession();

  const loggedInContent = (
    <>
      <h2 className="text-2xl font-black">Profile</h2>
      <div className="flex flex-col justify-center gap-4">
        <p className="text-2xl font-medium">
          {session && <span>Logged in as {session.user?.name}</span>}
        </p>
        <div className="flex items-center justify-center gap-4">
          <SignOut />
        </div>
      </div>
    </>
  );

  return session ? loggedInContent : <Welcome />;
};

export default ProfilePage;
