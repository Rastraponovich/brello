import { attach, combine, createEvent, createStore, sample } from "effector";
import { and, not, pending, reset } from "patronum";

import { api } from "~/shared/api";
import type { Task } from "~/shared/api/rest/task";

const taskGetFx = attach({
  effect: api.task.taskGetFx,
});

export const taskUpdateFx = attach({
  effect: api.task.taskUpdateFx,
});

export const taskDeleteFx = attach({
  effect: api.task.taskDeleteFx,
});

export const taskClosed = createEvent();
export const taskDeleted = createEvent();
export const taskSubmitted = createEvent();
export const taskNameChanged = createEvent<string>();
export const taskOpened = createEvent<{ id: string }>();
export const taskDescriptionChanged = createEvent<string>();

export const $taskName = createStore("");
export const $opened = createStore(false);
export const $taskDescription = createStore("");
export const $task = createStore<Task | null>(null);

const $editableTask = combine(
  {
    task: $task,
    title: $taskName,
    description: $taskDescription,
  },
  ({ title, description, task }) => ({
    ...task,
    title,
    description,
  }),
);

export const $pending = pending({
  effects: [taskGetFx, taskUpdateFx, taskDeleteFx],
});

$task.on(taskGetFx.doneData, (_, task) => task);
$opened.on(taskClosed, () => false);

$taskName.on($task, (prev, task) => {
  if (task) {
    return task.title || "new task";
  }
  return prev;
});

$taskDescription.on($task, (prev, task) => {
  if (task) {
    return task.description || "";
  }
  return prev;
});

$taskName.on(taskNameChanged, (_, taskName) => taskName);
$taskDescription.on(taskDescriptionChanged, (_, taskDescription) => taskDescription);

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
  source: $editableTask,
  filter: and($taskName, $task),
  fn: (task) => task as Task,
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
