/* eslint-disable @typescript-eslint/no-unused-vars */
import { createEvent, createStore, sample } from "effector";
import { BOARDS, TBoard } from "../lib";
import { ChangeEvent } from "react";
import { debounce } from "patronum";
const addBoard = createEvent();

const resetSearch = createEvent();
const searched = createEvent<ChangeEvent<HTMLInputElement>>();
export const $search = createStore("")
  .on(searched, (_, event) => event.target.value)
  .reset([resetSearch, addBoard]);

export const $boards = createStore<TBoard[]>(BOARDS).on(
  addBoard,
  (state, _) => [...state, { id: state.length + 1, title: "newBoard" }]
);

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

export const actions = {
  addBoard,
  resetSearch,
  searched,
};
