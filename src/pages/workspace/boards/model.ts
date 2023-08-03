import { debounce } from "patronum";
import { attach, createEvent, createStore, sample } from "effector";

import { routes } from "shared/routing";

import { type ChangeEvent } from "react";
import { api } from "shared/api";
import { TBoard } from "./lib";

const getWorkspaceFx = attach({
  effect: api.workspace.getWorkspaceFx,
});

sample({
  clock: routes.workspace.boards.opened,
  target: getWorkspaceFx,
});

export const addBoard = createEvent();

export const resetSearch = createEvent();

sample({
  clock: resetSearch,
  target: getWorkspaceFx,
});

export const searched = createEvent<ChangeEvent<HTMLInputElement>>();
export const $search = createStore("")
  .on(searched, (_, event) => event.target.value)
  .reset([resetSearch, addBoard]);

export const $boards = createStore<TBoard[]>([])
  .on(getWorkspaceFx.doneData, (_, { boards }) => boards)
  .on(addBoard, (state, _) => [...state, { id: state.length + 1, title: "newBoard" }]);

export const $boardsLength = $boards.map((state) => state.length);
export const $boardsEmpty = $boards.map((state) => state.length === 0);

export const $isNotFound = createStore(false);

const debouncedSearch = debounce({ source: $search, timeout: 300 });

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

export const settingsButtonClicked = createEvent();

sample({
  clock: settingsButtonClicked,
  target: routes.workspace.settings.open,
});

/**
 * click event on board card
 * @param {TBoard}
 */
export const boardCardClicked = createEvent<TBoard>();
sample({
  clock: boardCardClicked,
  fn: (card) => ({ id: card.id }),
  target: routes.board.board.open,
});
