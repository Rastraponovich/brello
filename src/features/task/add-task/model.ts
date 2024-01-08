import { attach, createEvent, createStore, sample } from "effector";
import { reset } from "patronum";

import { api } from "~/shared/api";

export const taskAddedFx = attach({
  effect: api.task.taskCreateFx,
});

export const taskSubmitted = createEvent<{
  user_id: string;
  stack_id: string;
  title: string;
}>();

export const $pending = taskAddedFx.pending;

export const $clear = createStore(false);

$clear.on(taskAddedFx.done, () => true);

sample({
  clock: taskSubmitted,
  filter: ({ title }) => !!title,
  fn: ({ title, user_id, stack_id }) => {
    return {
      title,
      order: 9999,
      userId: user_id,
      stackId: stack_id,
    };
  },
  target: taskAddedFx,
});

reset({
  clock: [taskSubmitted],
  target: [$clear],
});
