import { attach, createEvent, createStore, sample } from "effector";
import { debounce, debug, pending } from "patronum";

import { api } from "~/shared/api";
import type { TBoard } from "~/shared/api/rest/board";
import { Workspace } from "~/shared/api/rest/workspace";
import { routes } from "~/shared/routing";
import { $viewer, chainAuthenticated } from "~/shared/viewer/model";

export const currentRoute = routes.workspace.boards;

export const authenticatedRoute = chainAuthenticated(currentRoute, {
  otherwise: routes.auth.signIn.open,
});

export const addBoard = createEvent();
export const resetSearch = createEvent();
export const boardCardClicked = createEvent<TBoard>();
export const settingsButtonClicked = createEvent();

export const searched = createEvent<string>();

export const $workspace = createStore<Workspace | null>(null);

const workspaceGetFx = attach({
  effect: api.workspace.workspaceGetFx,
  source: $viewer,

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  mapParams: (_, viewer) => ({ userId: viewer!.id }),
});

sample({
  clock: authenticatedRoute.opened,
  target: workspaceGetFx,
});

sample({
  clock: workspaceGetFx.doneData,
  target: $workspace,
});

sample({
  clock: resetSearch,
  target: workspaceGetFx,
});

export const $search = createStore("");
export const $isNotFound = createStore(false);
export const $boards = createStore<TBoard[]>([]);

const debouncedSearch = debounce({ source: $search, timeout: 300 });

export const $boardsLength = $boards.map((state) => state.length);
export const $boardsEmpty = $boards.map((state) => state.length === 0);

// $boards.on(addBoard, (state) => [...state, { id: state.length + 1, title: "newBoard" }]);
$search.on(searched, (_, search) => search);
$search.reset([resetSearch, addBoard]);

sample({
  clock: debouncedSearch,
  source: $boards,
  fn: (items, search) => items.filter((item) => item.title.startsWith(search)),
  target: $boards,
});

sample({
  clock: $boards,
  source: $search,
  fn: (search, items) => search.length > 0 && items.length === 0,
  target: $isNotFound,
});

sample({
  clock: settingsButtonClicked,
  target: routes.workspace.settings.open,
});

sample({
  clock: boardCardClicked,
  fn: (card) => ({ id: card.id }),
  target: routes.board.board.open,
});

const boardCreateFx = attach({
  effect: api.board.createBoardFx,
  source: { workspace: $workspace, viewer: $viewer },
  mapParams: (_, { workspace, viewer }) => {
    return {
      title: "test",
      user_id: viewer?.id,
      workspace_id: workspace?.id,
    };
  },
});

sample({
  clock: addBoard,
  target: boardCreateFx,
});

const boardsGetFx = attach({
  effect: api.board.getBoardsFx,
  source: { workspace: $workspace, viewer: $viewer },
  mapParams: (_, { workspace, viewer }) => {
    return {
      workspace_id: workspace?.id ?? null,
      user_id: viewer?.id ?? null,
    };
  },
});

export const $boardsListPending = pending({
  effects: [workspaceGetFx, boardCreateFx, boardsGetFx],
});

sample({
  clock: [workspaceGetFx.doneData, boardCreateFx.doneData],
  target: boardsGetFx,
});

$boards.on(boardsGetFx.doneData, (_, response) => response);

debug({ trace: true }, boardCreateFx, boardsGetFx);
