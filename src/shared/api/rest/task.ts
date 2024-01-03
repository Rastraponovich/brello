import { PostgrestError } from "@supabase/supabase-js";
import { createEffect } from "effector";

import { client } from "../client";

type Task = {
  id: string;
  title: string;
  user_id: string;
  stack_id: string;
  description: string;
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

export const taskCreateFx = createEffect<Partial<Task>, unknown>(async (task) => {
  const { data } = await client.from("tasks").insert(task).select();

  console.log(data);

  return data;
});
