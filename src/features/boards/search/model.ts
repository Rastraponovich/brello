import { createEvent, sample } from "effector";
import { $search as mainSearch } from "pages/workspace/boards/model";

import type { ChangeEvent } from "react";

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
