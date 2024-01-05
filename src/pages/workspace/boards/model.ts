import { attach, createEvent, createStore, sample } from "effector";
import { debounce, pending, reset } from "patronum";

import { api } from "~/shared/api";
import type { Board } from "~/shared/api/rest/board";
import type { Workspace } from "~/shared/api/rest/workspace";
import { routes } from "~/shared/routing";
import { $viewer, chainAuthenticated } from "~/shared/viewer/model";

export const currentRoute = routes.workspace.boards;

export const authenticatedRoute = chainAuthenticated(currentRoute, {
  otherwise: routes.auth.signIn.open,
});

export const resetSearch = createEvent();
export const boardModalOpened = createEvent();
export const boardModalClosed = createEvent();
export const searched = createEvent<string>();
export const boardAddSubmitted = createEvent();
export const boardAddButtonClicked = createEvent();
export const settingsButtonClicked = createEvent();
export const boardCardClicked = createEvent<Board>();
export const boardNameChanged = createEvent<string>();
export const $workspace = createStore<Workspace | null>(null);
export const boardBackgroundColorChanged = createEvent<string>();

const workspaceGetFx = attach({
  effect: api.workspace.workspaceGetFx,
  source: $viewer,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  mapParams: (_, viewer) => ({ userId: viewer!.id }),
});

const boardsGetFx = attach({
  effect: api.board.getBoardsFx,
  source: $workspace,
  mapParams: (params: { search?: string }, workspace) => {
    return {
      params,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      user_id: workspace!.userId,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      workspace_id: workspace!.id,
    };
  },
});

const boardCreateFx = attach({
  effect: api.board.createBoardFx,
  source: $workspace,
  mapParams: ({ title, background_color }, workspace) => {
    return {
      title,
      background_color,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      user_id: workspace!.userId,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      workspace_id: workspace!.id,
    };
  },
});

export const $search = createStore("");
export const $boardName = createStore("");
export const $isNotFound = createStore(false);
export const $modalOpened = createStore(false);
export const $boards = createStore<Board[]>([]);
export const $boardBackgroundColor = createStore("bg-white");

const debouncedSearch = debounce({ source: $search, timeout: 500 });

export const $boardsLength = $boards.map((boards) => boards.length);
export const $boardsEmpty = $boards.map((boards) => boards.length === 0);

export const $boardsListPending = pending({
  effects: [workspaceGetFx, boardCreateFx, boardsGetFx],
});

$search.on(searched, (_, search) => search);
$modalOpened.on(boardModalOpened, () => true);
$modalOpened.on(boardModalClosed, () => false);
$boardName.on(boardNameChanged, (_, name) => name);
$boards.on(boardsGetFx.doneData, (_, boards) => boards);
$boardBackgroundColor.on(boardBackgroundColorChanged, (_, color) => color);

$boards.on(workspaceGetFx.doneData, (_, response) => {
  if (response?.boards) {
    return response.boards;
  }
  return [];
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

sample({
  clock: resetSearch,
  source: $workspace,
  fn: (workspace) => workspace?.boards || [],
  target: $boards,
});

sample({
  clock: debouncedSearch,
  source: $search,
  fn: (search) => ({ search }),
  target: boardsGetFx,
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
  fn: (card) => ({ id: card.id, workspace: card.workspace_id }),
  target: routes.board.board.open,
});

sample({
  clock: boardAddSubmitted,
  source: { title: $boardName, background_color: $boardBackgroundColor },
  target: boardCreateFx,
});

sample({
  clock: boardAddButtonClicked,
  target: boardModalOpened,
});

sample({
  clock: [boardCreateFx.doneData],
  fn: () => ({}),
  target: boardsGetFx,
});

reset({
  clock: [resetSearch],
  target: $search,
});

reset({
  clock: boardCreateFx.done,
  target: [$boardName, $modalOpened, $search, $boardBackgroundColor],
});
