"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function SignInButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <button
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    );
  }

  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      onClick={() => signIn("google")}
    >
      Sign In with Google
    </button>
  );
}
