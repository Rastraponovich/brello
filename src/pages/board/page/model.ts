import { attach, createEvent, createStore, sample } from "effector";
import { debug, reset } from "patronum";

import { stackAddedFx } from "~/features/add-list";
import { taskAddedFx } from "~/features/task/add-task";
import { taskDeleteFx, taskUpdateFx } from "~/features/task/task-edit";

import { type StackFactory2, stackFactory } from "~/entities/stack";

import { api } from "~/shared/api";
import type { Board } from "~/shared/api/rest/board";
import { routes } from "~/shared/routing";
import { $viewer, chainAuthenticated } from "~/shared/viewer";

export const currentRoute = routes.board.board;

export const authenticatedRoute = chainAuthenticated(currentRoute, {
  otherwise: routes.auth.signIn.open,
});

const stackDeletedFx = attach({
  effect: api.stack.stackDeletedFx,
  mapParams: ({ id, user_id }) => ({ id, user_id }),
});

const boardGetFx = attach({
  effect: api.board.getBoardByIdFx,
  mapParams: (params) => params,
});

export const settingsButtonClicked = createEvent();

const stackDeleted = createEvent<{ id: string; user_id: string }>();

export const $board = createStore<Board | null>(null);

export const $stacks = createStore<StackFactory2[]>([]);

export const $pageLoading = boardGetFx.pending;

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

debug($stacks, stackDeleted);

$board.on(boardGetFx.doneData, (_, board) => board);

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
  clock: [stackAddedFx.done, taskAddedFx.done, taskDeleteFx.done, taskUpdateFx.done],
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

reset({
  clock: currentRoute.closed,
  target: [$board, $stacks],
});
