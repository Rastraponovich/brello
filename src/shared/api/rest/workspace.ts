import { PostgrestError } from "@supabase/supabase-js";
import { createEffect } from "effector";

import type { TBoard } from "~/pages/board/page/model";

import type { WorkSpace } from "~/entities/workspace/model";

import { client } from "../client";
import { DbResultOk, Tables } from "../supabase";

export const __BOARDS__: Partial<TBoard>[] = [
  { id: 1, title: "Sprint #3 (03.04.2023 - 10.04.2023)" },
  { id: 2, title: "Sprint #3 (03.04.2023 - 10.04.2023)" },
  { id: 3, title: "Sprint #3 (03.04.2023 - 10.04.2023)" },
  { id: 4, title: "Sprint #3 (03.04.2023 - 10.04.2023)" },
  { id: 5, title: "Sprint #3 (03.04.2023 - 10.04.2023)" },
];

const __WORKSPACE__: WorkSpace = {
  boards: __BOARDS__ as TBoard[],
  name: "Coding in Action",
  description:
    "Coding in action is the ultimate intensive to kickstart any project, startup, or freelance.",
  domain: "brello.io/workspaces/",
  url: "coding-in-action",
};

export function checkError(error: PostgrestError | null): asserts error is null {
  if (error !== null) throw error;
}

export const getWorkspaceFx = createEffect<void, WorkSpace>(() => {
  return __WORKSPACE__;
});

// export const inviteUserByEmailFx = createEffect<{ email: string }, void>(async ({ email }) => {
//   const { data, error } = await client.auth.api.inviteUserByEmail(email);

//   checkError(error);

//   return data;
// });

export const workspacesGetFx = createEffect<{ name: string }, object[]>(async ({ name }) => {
  const { data, error } = await client.from("workspaces").select("*").ilike("name", name);

  checkError(error);

  return data;
});

export const workspacesGetByIdFx = createEffect<{ id: number }, object>(async ({ id }) => {
  const { data, error } = await client.from("workspaces").select("*").eq("id", id);

  checkError(error);

  return data;
});

export const workspacesUpdateFx = createEffect<Partial<Tables<"workspaces">>, unknown>(
  async ({ name, id }) => {
    const { data, error } = await client.from("workspaces").update({ name }).eq("id", id).select();

    checkError(error);

    return data;
  },
);

export const workspacesDeleteFx = createEffect<{ id: number }, object[]>(async ({ id }) => {
  const { data, error } = await client.from("workspaces").delete().eq("id", id).select();

  checkError(error);

  return data;
});

export const workspacesCreateFx = createEffect<
  Tables<"workspaces">,
  DbResultOk<Tables<"workspaces">> | unknown
>(async (workspace) => {
  const { data, error } = await client.from("workspaces").insert(workspace).select();

  checkError(error);

  return data;
});
