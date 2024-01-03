import { attach, createStore, sample } from "effector";

import { taskAddedFx } from "~/features/add-entity";
import { stackAddedFx } from "~/features/add-list";

import { stackDeletedFx } from "~/entities/stack";

import { api } from "~/shared/api";
import type { TBoard } from "~/shared/api/rest/board";
import type { Stack } from "~/shared/api/rest/stack";
import { routes } from "~/shared/routing";
import { $viewer, chainAuthenticated } from "~/shared/viewer";

export const currentRoute = routes.board.board;

export const authenticatedRoute = chainAuthenticated(currentRoute, {
  otherwise: routes.auth.signIn.open,
});

const boardGetFx = attach({
  effect: api.board.getBoardByIdFx,
  mapParams: (params) => params,
});

export const $board = createStore<TBoard | null>(null);

export const $stacks = createStore<Stack[]>([]);

$stacks.on($board, (_, board) => {
  if (board) {
    return board.stacks;
  }
  return [];
});

$board.on(boardGetFx.doneData, (_, board) => board);

sample({
  clock: authenticatedRoute.opened,
  source: { viewer: $viewer },
  fn: ({ viewer }, { params }) => ({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
  clock: [stackAddedFx.done, stackDeletedFx.done, taskAddedFx.done],
  source: $board,
  filter: (board) => !!board,
  fn: (board) => ({
    id: board?.id,
    user: board?.user_id,
    workspace: board?.workspace_id,
  }),
  target: boardGetFx,
});
