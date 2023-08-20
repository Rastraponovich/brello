import { attach, createEvent, createStore, sample } from "effector";
import { debounce } from "patronum";
import { type ChangeEvent } from "react";

import { api } from "~/shared/api";
import { routes } from "~/shared/routing";

export type TBoard = {
  title: string;
  id: number;
  image?: string;
};

export const currentRoute = routes.workspace.boards;

export const addBoard = createEvent();
export const resetSearch = createEvent();
export const boardCardClicked = createEvent<TBoard>();
export const settingsButtonClicked = createEvent();

export const searched = createEvent<ChangeEvent<HTMLInputElement>>();

const getWorkspaceFx = attach({
  effect: api.workspace.workspaceGetFx,

  mapParams: () => ({ userId: 123123 }),
});

sample({
  clock: resetSearch,
  target: getWorkspaceFx,
});

export const $search = createStore("");
export const $isNotFound = createStore(false);
export const $boards = createStore<TBoard[]>([]);

const debouncedSearch = debounce({ source: $search, timeout: 300 });

export const $boardsLength = $boards.map((state) => state.length);
export const $boardsEmpty = $boards.map((state) => state.length === 0);

$boards.on(addBoard, (state) => [...state, { id: state.length + 1, title: "newBoard" }]);
$search.on(searched, (_, event) => event.target.value);
$search.reset([resetSearch, addBoard]);

sample({
  clock: debouncedSearch,
  source: $boards,
  fn: (items, search) => items.filter((item) => item.title.startsWith(search)),
  target: $boards,
});

sample({
  clock: routes.workspace.boards.opened,
  target: getWorkspaceFx,
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
