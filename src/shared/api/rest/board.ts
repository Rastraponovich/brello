import { createEffect } from "effector";

import { type Tables, checkCrudError, client } from "../client";

export interface Board extends Tables<"boards"> {
  image?: string;
  stacks?: Tables<"stacks">[];
}

export const getBoardsFx = createEffect<
  { workspace_id: string; user_id: string; params?: { search?: string } },
  Board[]
>(async ({ workspace_id, user_id, params }) => {
  const { data, error } = await client
    .from("boards")
    .select("*")
    .eq("workspace_id", workspace_id)
    .eq("user_id", user_id)
    .ilike("title", `%${params?.search ?? ""}%`)
    .select();

  checkCrudError(error);

  return data ?? [];
});

export const getBoardByIdFx = createEffect<
  { id: string; workspace: string; user: string },
  Board | null
>(async ({ id, workspace, user }) => {
  const { data, error } = await client
    .from("boards")
    .select("*, stacks(*, tasks(*))")
    .eq("id", id)
    .eq("user_id", user)
    .eq("workspace_id", workspace)
    .single();

  checkCrudError(error);

  return data ?? null;
});

export const updateBoardFx = createEffect(() => {
  return true;
});

export const deleteBoardFx = createEffect(() => {
  return true;
});

export const createBoardFx = createEffect<Partial<Board>, Board | null>(async (board) => {
  const { data, error } = await client.from("boards").insert(board).select().single();

  checkCrudError(error);

  return data ?? null;
});
