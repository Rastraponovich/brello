import { createEvent, sample } from "effector";

import { $search as mainSearch } from "~/pages/workspace/boards/model";

export const $search = mainSearch.map((searchValue) => searchValue);

export const searchChanged = createEvent<string>();

sample({
  clock: searchChanged,
  target: mainSearch,
});
