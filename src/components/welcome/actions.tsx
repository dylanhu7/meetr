"use client";
import { signIn, signOut } from "next-auth/react";

export function SignOut() {
  return <button onClick={() => void signOut()}>Sign out</button>;
}

export function SignIn() {
  return <button onClick={() => void signIn("google")}>Sign in</button>;
}
