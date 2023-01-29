import { useSession } from "next-auth/react";
import { api } from "../../utils/api";
import SMSVerif from "./SMSVerif";

export default function LinkPhone() {
  const { data: session } = useSession();
  const updateNumberMutation = api.user.removeNumber.useMutation({
    onSuccess: (data) => {
      console.log(data);
    },
  });

  function handleClick() {
    session &&
      session.user &&
      updateNumberMutation.mutate({ id: session.user.id });
  }

  if (session?.user) {
    const user = api.user.getUser.useQuery({ id: session.user.id });
    const component =
      user.data?.phoneVerified == false ? (
        <>
          <p className="text-xl font-medium">
            Connect your phone number to receive reminders about when to catch
            up with your friends!
          </p>
          <SMSVerif />
        </>
      ) : (
        <div className="flex flex-row items-center gap-4">
          <p className="text-2xl font-medium">
            Phone number connected:<br></br>
            {user.data?.phone}
          </p>
          {/* <button onClick={handleNumberSubmit}>
            <ArrowSmallRightIcon className="h-6 w-6" />
          </button> */}
          <button className="btn-outline btn-error btn" onClick={handleClick}>
            REMOVE
          </button>
        </div>
      );
    return component;
  } else {
    return <></>;
  }
}
