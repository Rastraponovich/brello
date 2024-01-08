import { attach, createEvent, createStore, sample } from "effector";
import { reset } from "patronum";

import { api } from "~/shared/api";

export const stackCreateFx = attach({
  effect: api.stack.stackCreateFx,
  mapParams: (params) => params,
});

export const editableToggled = createEvent();
export const stackAdded = createEvent<{ boardId: string; userId: string }>();
export const stackNameChanged = createEvent<string>();

export const $editable = createStore(false);
export const $stackName = createStore("");

$stackName.on(stackNameChanged, (_, name) => name);

$editable.on(editableToggled, (editable) => !editable);

reset({
  clock: stackCreateFx.doneData,
  target: [$stackName, $editable],
});

sample({
  clock: stackAdded,
  source: $stackName,
  fn: (title, { boardId, userId }) => ({
    title,
    userId,
    boardId,
  }),
  target: stackCreateFx,
});
