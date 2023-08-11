import { createEvent, sample } from "effector";
import type { ChangeEvent } from "react";

import { $search as mainSearch } from "pages/workspace/boards/model";

const setSearch = createEvent<string>();

export const $search = mainSearch.map((searchValue) => searchValue);

export const searchChanged = createEvent<ChangeEvent<HTMLInputElement>>();

sample({
  clock: searchChanged,
  fn: (event) => event.target.value,
  target: setSearch,
});

sample({
  clock: setSearch,
  target: mainSearch,
});
