import { attach, createEvent, sample } from "effector";

import { api } from "~/shared/api";

const stackDeletedFx = attach({
  effect: api.stack.stackDeletedFx,
  mapParams: (params) => params,
});

export const stackDeleted = createEvent<{ id: string; user_id: string }>();

sample({
  clock: stackDeleted,
  target: stackDeletedFx,
});
