import { attach, createEvent, createStore, sample } from "effector";
import { and, not, reset } from "patronum";

import { api } from "~/shared/api";
import type { TTask } from "~/shared/api/rest/task";

const taskGetFx = attach({
  effect: api.task.taskGetFx,
});

export const taskUpdateFx = attach({
  effect: api.task.taskUpdateFx,
});

export const taskDeleteFx = attach({
  effect: api.task.taskDeleteFx,
});

export const taskNameChanged = createEvent<string>();
export const taskOpened = createEvent<{ id: string }>();
export const taskClosed = createEvent();
export const taskSubmitted = createEvent();
export const taskDeleted = createEvent();

export const $task = createStore<TTask | null>(null);
export const $taskName = createStore("");
export const $opened = createStore(false);

$task.on(taskGetFx.doneData, (_, task) => task);
$opened.on(taskClosed, () => false);

$taskName.on($task, (prev, task) => {
  if (task) {
    return task.title || "new task";
  }
  return prev;
});

$taskName.on(taskNameChanged, (_, taskName) => taskName);

sample({
  clock: taskOpened,
  filter: not($opened),
  target: taskGetFx,
});

sample({
  clock: taskGetFx.doneData,
  fn: () => true,
  target: $opened,
});

sample({
  clock: taskSubmitted,
  source: { title: $taskName, task: $task },
  filter: and($taskName, $task),
  fn: ({ task, title }) => ({ title, user_id: task?.user_id, id: task?.id }),
  target: taskUpdateFx,
});

sample({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  clock: taskDeleted,
  source: $task,
  filter: $task,
  fn: ({ id, user_id }: { id: string; user_id: string }) => ({ id, user_id }),
  target: taskDeleteFx,
});

reset({
  clock: [taskClosed, taskUpdateFx.doneData, taskDeleteFx.done],
  target: [$opened],
});

reset({
  clock: [taskGetFx, taskDeleteFx.done],
  target: [$taskName, $task],
});
