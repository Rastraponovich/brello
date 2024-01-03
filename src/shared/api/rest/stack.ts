import { PostgrestError } from "@supabase/supabase-js";
import { createEffect } from "effector";

import { type Tables, client } from "../client";

export interface TStack extends Tables<"stacks"> {
  id: string;
  tasks?: Tables<"tasks">[];
}

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

export const stackCreateFx = createEffect<Partial<TStack>, unknown>(async (stack) => {
  const { data, error } = await client.from("stacks").insert(stack).select();

  console.log(data);

  checkError(error);

  return data;
});

export const stackDeletedFx = createEffect<{ id: string; user_id: string }, unknown>(
  async ({ id, user_id }) => {
    const { data, error } = await client
      .from("stacks")
      .delete()
      .eq("id", id)
      .eq("user_id", user_id);

    console.log(data);

    checkError(error);
    return data;
  },
);
