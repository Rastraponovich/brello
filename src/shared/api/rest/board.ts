import { PostgrestError } from "@supabase/supabase-js";
import { createEffect } from "effector";

import { Board } from "~/pages/board/page/model";

import type { TTask } from "~/entities/stack";

import { client } from "../client";

export type TBoard = {
  id: string;
  title: string;
  image?: string;
  user_id: string;
  stacks?: TTask[];
  workspace_id: string;
};

type ErrorCode = keyof typeof ErrorDict;
type ErrorMessage = (typeof ErrorDict)[ErrorCode];
export type InternalError = {
  error: PostgrestError;
  code: ErrorMessage;
};

const ErrorDict = {
  "23505": "unique constraint",
};

export function checkError(error: PostgrestError | null): asserts error is null {
  if (error !== null) {
    const code = ErrorDict[error.code as ErrorCode] ?? "unknown";

    throw { error, code };
  }
}

export const getBoardsFx = createEffect<
  { workspace_id: string | null; user_id: string | null },
  TBoard[]
>(async ({ workspace_id, user_id }) => {
  const { data, error } = await client
    .from("boards")
    .select("*")
    .eq("workspace_id", workspace_id)
    .eq("user_id", user_id)
    .select();

  checkError(error);
  return data;
});

export const getBoardByIdFx = createEffect<{ id: string; workspace: string; user: string }, Board>(
  async ({ id, workspace, user }) => {
    const { data, error } = await client
      .from("boards")
      .select("*, stacks(*, tasks(*))")
      .eq("id", id)
      .eq("user_id", user)
      .eq("workspace_id", workspace)
      .single();

    checkError(error);

    return data ?? null;
  },
);

export const updateBoardFx = createEffect(() => {
  return true;
});

export const deleteBoardFx = createEffect(() => {
  return true;
});

export const createBoardFx = createEffect<Partial<TBoard>, unknown>(async (board) => {
  const { data } = await client.from("boards").insert(board).select();

  return data;
});
