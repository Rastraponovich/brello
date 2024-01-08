import { Store, attach, createEvent, createStore, sample } from "effector";

import { api } from "~/shared/api";
import { Tables } from "~/shared/api/supabase";

export const stackDeletedFx = attach({
  effect: api.stack.stackDeletedFx,
  mapParams: ({ id, user_id }) => ({ id, user_id }),
});

const stackGetFx = attach({
  effect: api.stack.stackGetFx,
});

export const stackUpdateFx = attach({
  effect: api.stack.stackUpdateFx,
});

export const stackDeleted = createEvent<{ id: string; user_id: string }>();
export const stackUpdated = createEvent<{ id: string; title: string }>();

sample({
  clock: stackDeleted,
  target: stackDeletedFx,
});

sample({
  clock: stackUpdated,
  target: stackUpdateFx,
});

export const stackFactory = (stack: Tables<"stacks">): StackFactory => {
  const stackGet = createEvent();
  const stackUpdated = createEvent();
  const titleChanged = createEvent<string>();

  const $id = createStore(stack.id);
  const $order = createStore(stack.order);
  const $title = createStore(stack.title);
  const $userId = createStore(stack.user_id);
  const $boardId = createStore(stack.board_id);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const $tasks = createStore<Tables<"tasks">[]>(stack.tasks || []);

  $title.on(titleChanged, (_, title) => title);

  sample({
    clock: stackUpdated,
    source: { title: $title, id: $id },
    target: stackUpdateFx,
  });

  sample({
    clock: stackGet,
    source: { id: $id },
    target: stackGetFx,
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
      boardId: $boardId,
    }),
  };
};

export type StackFactory = {
  $tasks: Store<Tables<"tasks">[]>;
  id: string;

  "@@unitShape": () => {
    id: Store<string>;
    title: Store<string>;
    stackGet: () => void;
    order: Store<number>;
    userId: Store<string>;
    boardId: Store<string>;
    stackUpdated: () => void;
    tasks: Store<Tables<"tasks">[]>;
    titleChanged: (title: string) => void;
  };
};

export type StackFactory2 = {
  id: string;
  title: string;
  order: number;
  userId: string;
  boardId: string;
  stackGet: () => void;
  stackUpdated: () => void;
  tasks: Tables<"tasks">[];
  $tasks: Store<Tables<"tasks">[]>;
  titleChanged: (title: string) => void;
};
