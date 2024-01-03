import { attach, createEvent, createStore, sample } from "effector";
import { and, reset } from "patronum";

import { api } from "~/shared/api";

export const taskAddedFx = attach({
  effect: api.task.taskCreateFx,
});

export const taskSubmitted = createEvent<{ user_id: string; stack_id: string }>();
export const editableToggled = createEvent();
export const taskNameChanged = createEvent<string>();

export const $editable = createStore(false);
export const $taskName = createStore("");

$editable.on(editableToggled, (editable) => !editable);
$taskName.on(taskNameChanged, (_, taskName) => taskName);

sample({
  clock: taskSubmitted,
  source: { title: $taskName },
  filter: and($editable, $taskName),
  fn: ({ title }, { user_id, stack_id }) => {
    return {
      title,
      user_id,
      stack_id,
    };
  },
  target: taskAddedFx,
});

reset({
  clock: taskAddedFx.done,
  target: [$taskName, $editable],
});
