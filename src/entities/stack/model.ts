import { attach, createEvent, sample } from "effector";
import { debug } from "patronum";

import { api } from "~/shared/api";
import { Tables } from "~/shared/api/client";

export interface TTask extends Tables<"tasks"> {
  timeStamp?: Date;

  // users: TUser[];
  // bages?: TBage[];

  // attachments?: number;
}

export type TStack = {
  id: number;
  cards: TTask[];
  title?: string;
};

export const taskAddedFx = attach({
  effect: api.task.taskCreateFx,
  mapParams: ({ user_id, stack_id, title }) => ({ user_id, stack_id, title }),
});

export const stackDeletedFx = attach({
  effect: api.stack.stackDeletedFx,
  mapParams: ({ id, user_id }) => ({ id, user_id }),
});

export const taskAdded = createEvent<{ user_id: string; stack_id: string; title: string }>();

export const stackDeleted = createEvent<{ id: string; user_id: string }>();

sample({
  clock: taskAdded,
  target: taskAddedFx,
});

sample({
  clock: stackDeleted,
  target: stackDeletedFx,
});

debug(taskAddedFx);
