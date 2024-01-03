import { attach, createEvent, createStore, sample } from "effector";
import { reset } from "patronum";

import { api } from "~/shared/api";

export const stackAddedFx = attach({
  effect: api.stack.stackCreateFx,
  mapParams: (params) => params,
});

export const editableToggled = createEvent();
export const stackAdded = createEvent<{ board_id: string; user_id: string }>();
export const stackNameChanged = createEvent<string>();

export const $editable = createStore(false);
export const $stackName = createStore("");

$stackName.on(stackNameChanged, (_, name) => name);

$editable.on(editableToggled, (editable) => !editable);

reset({
  clock: stackAddedFx.doneData,
  target: [$stackName, $editable],
});

sample({
  clock: stackAdded,
  source: $stackName,
  fn: (title, { board_id, user_id }) => ({
    title,
    user_id,
    board_id,
  }),
  target: stackAddedFx,
});
