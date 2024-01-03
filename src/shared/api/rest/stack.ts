import { createEffect } from "effector";

import { type Tables, checkCrudError, client } from "../client";

export interface Stack extends Tables<"stacks"> {
  id: string;
  tasks?: Tables<"tasks">[];
}

export const stackCreateFx = createEffect<Partial<Stack>, Stack>(async (stack) => {
  const { data, error } = await client.from("stacks").insert(stack).select().single();

  checkCrudError(error);

  return data;
});

export const stackDeletedFx = createEffect<{ id: string; user_id: string }, null>(
  async ({ id, user_id }) => {
    const { data, error } = await client
      .from("stacks")
      .delete()
      .eq("id", id)
      .eq("user_id", user_id);

    checkCrudError(error);
    return data;
  },
);
