import { createEffect } from "effector";

import { type Tables, checkCrudError, client } from "../client";

export interface TTask extends Tables<"tasks"> {
  id: string;
}

export const taskGetFx = createEffect<{ id: string }, TTask>(async ({ id }) => {
  const { data, error } = await client.from("tasks").select("*").eq("id", id).single();

  checkCrudError(error);

  return data;
});

export const taskCreateFx = createEffect<Partial<TTask>, TTask>(async (task) => {
  const { data, error } = await client.from("tasks").insert(task).select().single();

  checkCrudError(error);
  return data;
});

export const taskUpdateFx = createEffect<Partial<TTask>, TTask>(async (task) => {
  const { data, error } = await client
    .from("tasks")
    .update(task)
    .eq("id", task.id)
    .select()
    .single();

  checkCrudError(error);

  return data;
});

export const taskDeleteFx = createEffect<{ id: string; user_id: string }, unknown>(
  async ({ id, user_id }) => {
    const { data, error } = await client.from("tasks").delete().eq("id", id).eq("user_id", user_id);

    checkCrudError(error);

    return data;
  },
);
