import { createEffect } from "effector";

import { type Tables, checkCrudError, client } from "../client";
import { TablesInsert, TablesUpdate } from "../supabase";

export interface RStack extends Tables<"stacks"> {
  tasks?: Tables<"tasks">[];
}

export type Stack = {
  id: string;
  title: string;
  order: number;
  userId: string;
  boardId: string;
  createdAt: string;
  tasks?: Tables<"tasks">[];
};

export const stackGetFx = createEffect<{ id: string }, Stack>(async ({ id }) => {
  const { data, error } = await client.from("stacks").select("*, tasks(*)").eq("id", id).single();

  checkCrudError(error);

  const { user_id, board_id, created_at, ...rest } = data;

  return {
    ...rest,
    userId: user_id,
    boardId: board_id,
    createdAt: created_at,
  };
});

export const stackCreateFx = createEffect<
  { title: string; userId: string; boardId: string },
  Stack
>(async ({ userId, boardId, title }) => {
  const stack: TablesInsert<"stacks"> = {
    title,
    order: 0,
    user_id: userId,
    board_id: boardId,
  };

  const { data, error } = await client.from("stacks").insert(stack).select().single();

  checkCrudError(error);

  const { user_id, board_id, created_at, ...rest } = data;

  return {
    ...rest,
    userId: user_id,
    boardId: board_id,
    createdAt: created_at,
  };
});

export const stackUpdateFx = createEffect<
  { id: string; title: string; order?: number; userId?: string; boardId?: string },
  Stack
>(async ({ id, boardId, userId, title, order }) => {
  const stack: TablesUpdate<"stacks"> = {
    title,
    order,
    board_id: boardId,
    user_id: userId,
  };

  const { data, error } = await client.from("stacks").update(stack).eq("id", id).select().single();

  checkCrudError(error);

  const { user_id, board_id, created_at, ...rest } = data;

  return {
    ...rest,
    userId: user_id,
    boardId: board_id,
    createdAt: created_at,
  };
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
