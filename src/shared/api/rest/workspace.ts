import type { PostgrestError } from "@supabase/supabase-js";
import { createEffect } from "effector";

import { type DbResultOk, type Tables, client } from "../client";
import type { TBoard } from "./board";

export interface Workspace {
  id: string;
  name: string;
  userId: UserId;
  slug: string | null;
  boards?: TBoard[] | null;
  avatarUrl: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
  description: string | null;
}

export const __BOARDS__: Partial<TBoard>[] = [
  { id: "1", title: "Sprint #3 (03.04.2023 - 10.04.2023)" },
  { id: "2", title: "Sprint #3 (03.04.2023 - 10.04.2023)" },
  { id: "3", title: "Sprint #3 (03.04.2023 - 10.04.2023)" },
  { id: "4", title: "Sprint #3 (03.04.2023 - 10.04.2023)" },
  { id: "5", title: "Sprint #3 (03.04.2023 - 10.04.2023)" },
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
  const { data, error } = await client
    .from("workspaces")
    .select("* , boards (id, title)")
    .eq("id", id);

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

export const workspaceGetFx = createEffect<{ userId: string }, Workspace | null, InternalError>(
  async ({ userId }) => {
    const { data, error } = await client
      .from("workspaces")
      .select("*, boards (*)")
      .eq("user_id", userId);

    checkError(error);

    if (data === null || data.length === 0) {
      return null;
    }

    // we need convert names to expected type
    const { avatar_url, user_id, ...rest } = data[0];

    return {
      ...rest,
      userId: user_id,
      avatarUrl: avatar_url,
    };
  },
);

export const workspaceUpdateFx = createEffect<{ workspace: Workspace }, Workspace, InternalError>(
  async ({ workspace }) => {
    const { userId, avatarUrl, ...rest } = workspace;
    const { error, data } = await client
      .from("workspaces")
      .update({
        ...rest,
        user_id: userId,
        avatar_url: avatarUrl,
      })
      .eq("id", workspace.id)
      .eq("user_id", userId)
      .select()
      .single();

    checkError(error);

    const { user_id, avatar_url, created_at, ...restResponse } = data as Tables<"workspaces">;

    return {
      ...restResponse,
      userId: user_id,
      avatarUrl: avatar_url,
      createdAt: created_at,
    };
  },
);
