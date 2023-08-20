import { createEffect } from "effector";

import { Tables, checkError, client } from "../client";

export const userGetFx = createEffect(() => true);
export const userUpdateFx = createEffect<{ email: string; password: string }, object>(
  async ({ email, password }) => {
    const { data, error } = await client.auth.updateUser({
      email,
      password,
    });

    checkError(error);

    return data.user;
  },
);

export const updateProfileFx = createEffect<
  { firstName: string; lastName?: string; id: string },
  unknown
>(async ({ firstName, lastName = "", id }) => {
  const { error, data } = await client
    .from("profiles")
    .update({ first_name: firstName, last_name: lastName })
    .eq("id", id)
    .select();

  if (error) {
    throw error;
  }

  return data;
});

export const profileExistsFx = createEffect<{ id: string }, Tables<"profiles">>(async ({ id }) => {
  const { error, data } = await client.from("profiles").select().eq("userId", id).single();

  if (error) {
    console.log(error, "profile checks");
  }

  return data;
});

export const profileCreateFx = createEffect<
  { id: string; firstName: string; lastName: string },
  Tables<"profiles">
>(async ({ id, firstName, lastName }) => {
  const { error, data } = await client
    .from("profiles")
    .insert({ userId: id, first_name: firstName, last_name: lastName })
    .select()
    .single();

  if (error) {
    console.log(error);
  }

  return data;
});
