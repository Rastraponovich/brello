import { AuthError, User } from "@supabase/supabase-js";
import { createEffect } from "effector";

import { client } from "../client";

interface BaseUser extends User {
  email: Email;
  id: UserId;
}

export function checkError(error: AuthError | null): asserts error is null {
  if (error !== null) throw error;
}

export const signInWithGoogleFx = createEffect(async () => {
  const baseUrl = document.location.toString();
  const redirectTo = new URL("/boards", baseUrl).toString();
  const { error } = await client.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo },
  });

  checkError(error);
});

export const signInWithEmailFx = createEffect<{ email: Email }, void, AuthError>(
  async ({ email }) => {
    const baseUrl = document.location.toString();
    const emailRedirectTo = new URL("/auth/finish", baseUrl).toString();
    const { error } = await client.auth.signInWithOtp({
      email,
      options: { emailRedirectTo },
    });

    checkError(error);
  },
);

export const getMeFx = createEffect<void, BaseUser | null, AuthError>(async () => {
  const {
    error,
    data: { user },
  } = await client.auth.getUser();

  checkError(error);

  if (user) {
    return {
      ...user,
      id: user.id as string,
      email: user.email as string,
    } as BaseUser;
  }

  return null;
});

export const signOutFx = createEffect<void, void, AuthError>(async () => {
  const { error } = await client.auth.signOut();

  checkError(error);
});
