import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { signIn, signOut } from "next-auth/react";
import { Button } from "react-daisyui";

export function SignOut() {
  return (
    <Button
      size="sm"
      onClick={() => void signOut()}
      color="error"
      variant="outline"
      startIcon={<ArrowRightOnRectangleIcon className="h-6 w-6" />}
    >
      Sign out
    </Button>
  );
}

export function SignIn() {
  return (
    <Button
      onClick={() => void signIn("google")}
      color="primary"
      variant="outline"
      size="lg"
      startIcon={<ArrowLeftOnRectangleIcon className="h-6 w-6" />}
    >
      Sign in
    </Button>
  );
}
