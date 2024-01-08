import { attach, createEvent, createStore, sample } from "effector";
import { pending, reset } from "patronum";

import { taskDeleteFx, taskUpdateFx } from "~/features/task/task-edit";

import { type StackFactory2, stackFactory } from "~/entities/stack";

import { api } from "~/shared/api";
import type { Board } from "~/shared/api/rest/board";
import { toggleInputFactory } from "~/shared/lib/factories";
import { routes } from "~/shared/routing";
import { $viewer, chainAuthenticated } from "~/shared/viewer";

export const currentRoute = routes.board.board;

export const authenticatedRoute = chainAuthenticated(currentRoute, {
  otherwise: routes.auth.signIn.open,
});

const taskAddedFx = attach({
  effect: api.task.taskCreateFx,
});

const stackDeletedFx = attach({
  effect: api.stack.stackDeletedFx,
  mapParams: ({ id, user_id }) => ({ id, user_id }),
});

export const stackCreateFx = attach({
  effect: api.stack.stackCreateFx,
  mapParams: (params) => params,
});

const boardGetFx = attach({
  effect: api.board.getBoardByIdFx,
  mapParams: (params) => params,
});

export const settingsButtonClicked = createEvent();

const submitStack = createEvent<{ value: string }>();
const stackDeleted = createEvent<{ id: string; user_id: string }>();

export const $board = createStore<Board | null>(null);

export const $stacks = createStore<StackFactory2[]>([]);

export const $pageLoading = boardGetFx.pending;

const $pending = pending({
  effects: [stackCreateFx, boardGetFx, stackDeletedFx],
});

export const listModel = toggleInputFactory(submitStack, $pending);

$board.on(boardGetFx.doneData, (_, board) => board);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
$stacks.on($board, (_, board) => {
  if (board) {
    return board.stacks?.map((stack) => ({
      ...stackFactory(stack, stackDeleted),
    }));
  }
  return [];
});

$stacks.on(stackDeleted, (prev, { id }) => {
  return prev.filter((stack) => stack.id !== id);
});

$stacks.on(stackCreateFx.doneData, (prev, stack) => {
  const newStack = stackFactory(stack, stackDeleted) as unknown as StackFactory2;

  return [...prev, newStack];
});

sample({
  clock: authenticatedRoute.opened,
  source: { viewer: $viewer },
  fn: ({ viewer }, { params }) => ({
    // eslint-disable-next-line
    user: viewer!.id,

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    workspace: params.workspace,

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    id: params.id,
  }),
  target: boardGetFx,
});

sample({
  clock: [taskAddedFx.done, taskDeleteFx.done, taskUpdateFx.done],
  source: $board,
  filter: (board) => !!board,
  fn: (board) => ({
    id: board?.id,
    user: board?.user_id,
    workspace: board?.workspace_id,
  }),
  target: boardGetFx,
});

sample({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  clock: settingsButtonClicked,
  source: $board,
  filter: $board,
  fn: (board: Board): { id: string } => ({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    id: board!.id,
  }),
  target: routes.board.settings.open,
});

sample({
  clock: stackDeleted,
  target: stackDeletedFx,
});

sample({
  clock: submitStack,
  source: $board,
  fn: (board, { value }) => {
    return {
      boardId: board?.id,
      title: value,
      userId: board?.user_id,
    };
  },
  target: stackCreateFx,
});

sample({
  clock: [currentRoute.closed, stackCreateFx.done],
  target: listModel.reseted,
});

reset({
  clock: currentRoute.closed,
  target: [$board, $stacks],
});
