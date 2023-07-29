import { createEffect } from "effector";
import { client } from "../client";
import { AuthError } from "@supabase/supabase-js";
import { SITE_URL } from "shared/config/api";

interface User {
  email: Email;
  id: UserId;
}

const checkError = (error: AuthError | null): void => {
  if (error) {
    throw error;
  }
};

export const signInWithEmailFx = createEffect<
  { email: Email },
  void,
  AuthError
>(async ({ email }) => {
  const { error } = await client.auth.signInWithOtp({
    email,

    options: {
      emailRedirectTo: SITE_URL,
    },
  });

  checkError(error);
});

export const getMeFx = createEffect<void, User | null, AuthError>(async () => {
  const {
    error,
    data: { user },
  } = await client.auth.getUser();

  checkError(error);

  if (user) {
    return {
      id: user.id as string,
      email: user.email as string,
    };
  }

  return null;
});

export const signOutFx = createEffect<void, void, AuthError>(async () => {
  const { error } = await client.auth.signOut();

  checkError(error);
});
