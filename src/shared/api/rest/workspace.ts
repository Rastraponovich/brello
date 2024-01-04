import { createEffect } from "effector";

import {
  type DbResultOk,
  type InternalError,
  type Tables,
  checkCrudError,
  client,
} from "../client";
import type { Board } from "./board";

export interface Workspace {
  id: string;
  name: string;
  userId: UserId;
  slug: string | null;
  boards?: Board[] | null;
  avatarUrl: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
  description: string | null;
}

export const workspacesGetFx = createEffect<{ name: string }, Workspace[]>(async ({ name }) => {
  const { data, error } = await client.from("workspaces").select("*").ilike("name", name);

  checkCrudError(error);

  return data;
});

export const workspacesGetByIdFx = createEffect<{ id: number }, object>(async ({ id }) => {
  const { data, error } = await client
    .from("workspaces")
    .select("* , boards (id, title)")
    .eq("id", id);

  checkCrudError(error);

  return data;
});

export const workspacesUpdateFx = createEffect<
  Partial<Tables<"workspaces">>,
  Tables<"workspaces">[]
>(async ({ name, id }) => {
  const { data, error } = await client.from("workspaces").update({ name }).eq("id", id).select();

  checkCrudError(error);

  return data;
});

export const workspacesDeleteFx = createEffect<{ id: number }, object[]>(async ({ id }) => {
  const { data, error } = await client.from("workspaces").delete().eq("id", id).select();

  checkCrudError(error);

  return data;
});

export const workspacesCreateFx = createEffect<
  Tables<"workspaces">,
  DbResultOk<Tables<"workspaces">> | unknown
>(async (workspace) => {
  const { data, error } = await client.from("workspaces").insert(workspace).select().single();

  checkCrudError(error);

  return data;
});

// supabase not MOCK

export const workspaceExistsFx = createEffect<{ userId: UserId }, boolean, InternalError>(
  async ({ userId }) => {
    const { count, error } = await client
      .from("workspaces")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    checkCrudError(error);
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

  checkCrudError(error);

  return data[0] ?? null;
});

export const workspaceGetFx = createEffect<{ userId: string }, Workspace | null, InternalError>(
  async ({ userId }) => {
    const { data, error } = await client
      .from("workspaces")
      .select("*, boards (*)")
      .eq("user_id", userId);

    checkCrudError(error);

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

    checkCrudError(error);

    const { user_id, avatar_url, created_at, ...restResponse } = data as Tables<"workspaces">;

    return {
      ...restResponse,
      userId: user_id,
      avatarUrl: avatar_url,
      createdAt: created_at,
    };
  },
);
