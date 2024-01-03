import { attach, createEvent, sample } from "effector";

import { api } from "~/shared/api";

export const stackDeletedFx = attach({
  effect: api.stack.stackDeletedFx,
  mapParams: ({ id, user_id }) => ({ id, user_id }),
});

export const stackDeleted = createEvent<{ id: string; user_id: string }>();

sample({
  clock: stackDeleted,
  target: stackDeletedFx,
});
