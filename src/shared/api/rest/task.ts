import { createEffect } from "effector";

import { type Tables, checkCrudError, client } from "../client";
import { TablesInsert, TablesUpdate } from "../supabase";

export type RTask = Tables<"tasks">;

export type Task = {
  id: string;
  title: string;
  order: number;
  userId: string;
  stackId: string;
  createdAt: string;
  completedAt?: string;
  updatedAt: string | null;
  description: string | null;
  attachments: number | null;
};

export const taskGetFx = createEffect<{ id: string }, Task>(async ({ id }) => {
  const { data, error } = await client.from("tasks").select("*").eq("id", id).single();

  checkCrudError(error);

  return {
    id: data?.id,
    title: data.title,
    order: data.order,
    userId: data.user_id,
    stackId: data.stack_id,
    updatedAt: data.updated_at,
    createdAt: data.created_at,
    description: data.description,
    attachments: data.attachments,
  };
});

export const taskCreateFx = createEffect<
  { order: number; stackId: string; title: string; userId: string },
  Task
>(async ({ order, stackId, title, userId }) => {
  const task: TablesInsert<"tasks"> = {
    order,
    title,
    user_id: userId,
    stack_id: stackId,
  };

  const { data, error } = await client.from("tasks").insert(task).select().single();

  checkCrudError(error);
  return {
    id: data.id,
    title: data.title,
    order: data.order,
    userId: data.user_id,
    stackId: data.stack_id,
    updatedAt: data.updated_at,
    createdAt: data.created_at,
    description: data.description,
    attachments: data.attachments,
  };
});

export const taskUpdateFx = createEffect<Task, Task>(
  async ({ title, description, id, order, userId, stackId }) => {
    const task: TablesUpdate<"tasks"> = {
      id,
      title,
      order,
      description,
      users: null,
      bages: null,
      user_id: userId,
      stack_id: stackId,
    };

    const { data, error } = await client
      .from("tasks")
      .update(task)
      .eq("id", task.id)
      .select()
      .single();

    checkCrudError(error);

    return {
      id: data.id,
      title: data.title,
      order: data.order,
      userId: data.user_id,
      stackId: data.stack_id,
      updatedAt: data.updated_at,
      createdAt: data.created_at,
      description: data.description,
      attachments: data.attachments,
    };
  },
);

export const taskDeleteFx = createEffect<{ id: string; userId: string }, null>(
  async ({ id, userId }) => {
    const { data, error } = await client.from("tasks").delete().eq("id", id).eq("user_id", userId);

    checkCrudError(error);

    return data;
  },
);
