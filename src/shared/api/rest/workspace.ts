import { PostgrestError } from "@supabase/supabase-js";
import { createEffect } from "effector";

import type { TBoard } from "~/pages/board/page/model";

import { DbResultOk, Tables, client } from "../client";

export interface Workspace {
  id: string;
  userId: UserId;
  name: string;
  slug: string | null;
  description: string | null;
  avatarUrl: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
  boards?: TBoard[];
}

export const __BOARDS__: Partial<TBoard>[] = [
  { id: 1, title: "Sprint #3 (03.04.2023 - 10.04.2023)" },
  { id: 2, title: "Sprint #3 (03.04.2023 - 10.04.2023)" },
  { id: 3, title: "Sprint #3 (03.04.2023 - 10.04.2023)" },
  { id: 4, title: "Sprint #3 (03.04.2023 - 10.04.2023)" },
  { id: 5, title: "Sprint #3 (03.04.2023 - 10.04.2023)" },
];

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

export const workspacesGetFx = createEffect<{ name: string }, Workspace[]>(async ({ name }) => {
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

// supabase not MOCK

export const workspaceExistsFx = createEffect<{ userId: UserId }, boolean, InternalError>(
  async ({ userId }) => {
    const { count, error } = await client
      .from("workspaces")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    checkError(error);
    return Boolean(count);
  },
);

export const workspaceCreateFx = createEffect<
  { workspace: Omit<Workspace, "id"> },
  Workspace | null,
  InternalError
>(async ({ workspace }) => {
  const { userId, avatarUrl, ...rest } = workspace;
  const { error, data } = await client
    .from("workspaces")
    .insert({ ...rest, user_id: userId, avatar_url: avatarUrl })
    .select();

  checkError(error);

  return data[0] ?? null;
});

export const workspaceGetFx = createEffect<{ userId: number }, Workspace | null, InternalError>(
  async ({ userId }) => {
    const { data, error } = await client.from("workspaces").select().eq("user_id", userId);

    checkError(error);

    if (data === null || data.length === 0) {
      return null;
    }

    // we need convert names to expected type
    const { name, slug, description, avatar_url, id, user_id } = data[0];

    return {
      id,
      name,
      slug,
      description,
      userId: user_id,
      avatarUrl: avatar_url,
    };
  },
);

export const workspaceUpdateFx = createEffect<{ workspace: Workspace }, void, InternalError>(
  async ({ workspace }) => {
    const { userId, avatarUrl, ...rest } = workspace;
    const { error } = await client
      .from("workspaces")
      .update({
        ...rest,
        user_id: userId,
        avatar_url: avatarUrl,
      })
      .eq("id", workspace.id)
      .eq("uer_id", userId);

    checkError(error);

    return;
  },
);
