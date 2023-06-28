import { useUnit } from "effector-react";
import { $boardsEmpty, $boardsLength, $isNotFound, $search, actions } from ".";

export const useSearch = () =>
  useUnit([$search, actions.searched, actions.resetSearch]);

export const useBoardLength = () => useUnit([$boardsLength, $boardsEmpty]);

export const useEmptySearchResult = () => useUnit($isNotFound);
