import type { User } from "@supabase/supabase-js";
import { createEffect } from "effector";

import { type Tables, checkAuthError, checkCrudError, client } from "../client";

export interface Profile extends Tables<"profiles"> {
  id: string;
}

export const profileGetFx = createEffect<{ user_id: string }, Profile>(async ({ user_id }) => {
  const { data, error } = await client
    .from("profiles")
    .select("*, favorite_boards(*)")
    .eq("user_id", user_id)
    .single();

  checkCrudError(error);

  return data;
});

export const userUpdateFx = createEffect<{ email: string; password: string }, User>(
  async ({ email, password }) => {
    const { data, error } = await client.auth.updateUser({
      email,
      password,
    });

    checkAuthError(error);

    return data.user;
  },
);

export const profileUpdateFx = createEffect<
  { firstName: string; lastName?: string; id: string } & Partial<Profile>,
  Profile
>(async ({ firstName, lastName = "", id, ...profile }) => {
  const { error, data } = await client
    .from("profiles")
    .update({ first_name: firstName, last_name: lastName, ...profile })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
});

export const profileExistsFx = createEffect<{ userId: string }, Tables<"profiles"> | null>(
  async ({ userId }) => {
    const { error, data } = await client.from("profiles").select().eq("user_id", userId).single();

    if (error) {
      console.log(error, "profile checks");
    }

    return data;
  },
);

export const profileCreateFx = createEffect<
  { id: string; firstName: string; lastName: string },
  Tables<"profiles"> | null
>(async ({ id, firstName, lastName }) => {
  const { error, data } = await client
    .from("profiles")
    .insert({ user_id: id, first_name: firstName, last_name: lastName })
    .select()
    .single();

  if (error) {
    console.log(error);
  }

  return data;
});
