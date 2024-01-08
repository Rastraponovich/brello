import { type EventCallable, type Store, attach, createEvent, createStore, sample } from "effector";
import { pending } from "patronum";

import { api } from "~/shared/api";
import type { Tables } from "~/shared/api/supabase";
import { toggleInputFactory } from "~/shared/lib/factories";

export const stackFactory = (
  stack: Tables<"stacks">,
  stackDeleted: EventCallable<{ id: string; user_id: string }>,
): StackFactory => {
  const taskCreateFx = attach({
    effect: api.task.taskCreateFx,
  });

  const stackGet = createEvent();
  const stackUpdated = createEvent();
  const deleteButtonClicked = createEvent();
  const titleChanged = createEvent<string>();
  const submitTask = createEvent<{ value: string }>();

  const $id = createStore(stack.id);
  const $order = createStore(stack.order);
  const $title = createStore(stack.title);
  const $userId = createStore(stack.user_id);
  const $boardId = createStore(stack.board_id);

  const stackGetFx = attach({
    source: { id: $id },
    effect: api.stack.stackGetFx,
  });

  const stackUpdateFx = attach({
    effect: api.stack.stackUpdateFx,
    source: { id: $id, title: $title },
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const $tasks = createStore<Tables<"tasks">[]>(stack.tasks || []);

  $tasks.on(taskCreateFx.doneData, (prev, task) => {
    const { userId, updatedAt, stackId, createdAt, ...restTask } = task;

    return [
      ...prev,
      {
        ...restTask,
        users: [],
        bages: [],
        user_id: userId,
        stack_id: stackId,
        updated_at: updatedAt,
        created_at: createdAt,
      },
    ];
  });

  const $pending = pending({ effects: [stackGetFx, stackUpdateFx, taskCreateFx] });

  $title.on(titleChanged, (_, title) => title);

  $title.on(stackGetFx.doneData, (_, stack) => stack.title);
  $tasks.on(stackGetFx.doneData, (_, stack) => stack.tasks || []);

  const taskModel = toggleInputFactory(submitTask, $pending);

  sample({
    clock: stackUpdated,
    target: stackUpdateFx,
  });

  sample({
    clock: stackGet,
    target: stackGetFx,
  });

  sample({
    clock: submitTask,
    source: {
      stackId: $id,
      order: $tasks,
      userId: $userId,
      boardId: $boardId,
    },

    fn: ({ order, ...rest }, { value }) => {
      return {
        ...rest,
        title: value,
        order: order.length + 1,
      };
    },
    target: taskCreateFx,
  });

  sample({
    clock: stackUpdateFx.done,
    target: stackGet,
  });

  sample({
    clock: taskCreateFx.done,
    target: taskModel.reseted,
  });

  sample({
    clock: deleteButtonClicked,
    source: { id: $id, user_id: $userId },
    target: stackDeleted,
  });

  return {
    $tasks,
    id: stack.id,

    "@@unitShape": () => ({
      id: $id,
      stackGet,
      titleChanged,
      stackUpdated,
      tasks: $tasks,
      title: $title,
      order: $order,
      userId: $userId,
      pending: $pending,
      boardId: $boardId,
      deleteButtonClicked,
      taskTitle: taskModel.$value,
      editorOpened: taskModel.$opened,
      submitTask: taskModel.submitClicked,
      taskCreateReseted: taskModel.reseted,
      taskTitleChanged: taskModel.valueChanged,
    }),
  };
};

export type StackFactory = {
  id: string;
  $tasks: Store<Tables<"tasks">[]>;

  "@@unitShape": () => {
    id: Store<string>;
    title: Store<string>;
    order: Store<number>;
    userId: Store<string>;
    boardId: Store<string>;
    pending: Store<boolean>;
    taskTitle: Store<string>;
    editorOpened: Store<boolean>;
    tasks: Store<Tables<"tasks">[]>;

    stackGet: () => void;
    submitTask: () => void;
    stackUpdated: () => void;
    taskCreateReseted: () => void;
    deleteButtonClicked: () => void;
    titleChanged: (title: string) => void;
    taskTitleChanged: (title: string) => void;
  };
};

export type StackFactory2 = {
  id: string;
  title: string;
  order: number;
  userId: string;
  boardId: string;
  pending: boolean;
  taskTitle: string;
  editorOpened: boolean;
  tasks: Tables<"tasks">[];
  $tasks: Store<Tables<"tasks">[]>;

  stackGet: () => void;
  submitTask: () => void;
  stackUpdated: () => void;
  taskCreateReseted: () => void;
  deleteButtonClicked: () => void;
  titleChanged: (title: string) => void;
  taskTitleChanged: (title: string) => void;
};
