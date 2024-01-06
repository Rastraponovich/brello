import { attach, createEvent, sample } from "effector";

import { api } from "~/shared/api";
import { Stack } from "~/shared/api/rest/stack";

export const stackDeletedFx = attach({
  effect: api.stack.stackDeletedFx,
  mapParams: ({ id, user_id }) => ({ id, user_id }),
});

export const stackUpdateFx = attach({
  effect: api.stack.stackUpdateFx,
});

export const stackDeleted = createEvent<{ id: string; user_id: string }>();
export const stackUpdated = createEvent<Partial<Stack>>();

sample({
  clock: stackDeleted,
  target: stackDeletedFx,
});

sample({
  clock: stackUpdated,
  target: stackUpdateFx,
});
