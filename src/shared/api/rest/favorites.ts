import { createEffect } from "effector";

import { checkCrudError, client } from "../client";

export const favoriteBoardGetFx = createEffect<{ profile_id: string; board_id: string }, boolean>(
  async ({ profile_id, board_id }) => {
    const { data, error } = await client
      .from("favorite_boards")
      .select("*")
      .eq("profile_id", profile_id)
      .eq("board_id", board_id);

    checkCrudError(error);

    return data?.length > 0;
  },
);

export const favoriteBoardDeleteFx = createEffect<{ profile_id: string; board_id: string }, null>(
  async ({ profile_id, board_id }) => {
    const { data, error } = await client
      .from("favorite_boards")
      .delete()
      .eq("profile_id", profile_id)
      .eq("board_id", board_id);

    checkCrudError(error);
    return data;
  },
);

export const favoriteBoardCreateFx = createEffect<
  { profile_id: string; board_id: string },
  unknown
>(async ({ profile_id, board_id }) => {
  const { data, error } = await client
    .from("favorite_boards")
    .insert({ profile_id, board_id })
    .select()
    .single();

  checkCrudError(error);
  return data;
});
