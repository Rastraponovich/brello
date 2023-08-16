import { createEffect } from "effector";

import { checkError, client } from "../client";

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
