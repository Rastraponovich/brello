import { AuthError } from "@supabase/supabase-js";
import { createEffect } from "effector";

import { SITE_URL } from "~/shared/config/api";

import { client } from "../client";

interface User {
  email: Email;
  id: UserId;
}

/**
 * Checks if the given error is null and throws an exception if it is not.
 *
 * @param {AuthError | null} error - The error to check.
 * @return {void}
 */
export function checkError(error: AuthError | null): asserts error is null {
  if (error !== null) throw error;
}

export const signInWithGoogleFx = createEffect(async () => {
  const { error } = await client.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: SITE_URL + "boards",
    },
  });

  checkError(error);
});

export const signInWithEmailFx = createEffect<{ email: Email }, void, AuthError>(
  async ({ email }) => {
    const { error } = await client.auth.signInWithOtp({
      email,

      options: {
        emailRedirectTo: SITE_URL,
      },
    });

    checkError(error);
  },
);

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
