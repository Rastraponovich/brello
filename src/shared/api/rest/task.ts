import { createEffect } from "effector";

import { type Tables, checkCrudError, client } from "../client";

export interface TTask extends Tables<"tasks"> {
  id: string;
}

export const taskCreateFx = createEffect<Partial<TTask>, TTask>(async (task) => {
  const { data, error } = await client.from("tasks").insert(task).select().single();

  checkCrudError(error);
  return data;
});
