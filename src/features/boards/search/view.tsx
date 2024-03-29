/**
 * @todo Refactoring
 */
import { useUnit } from "effector-react";

import { PageHeader } from "~/widgets/page-header";

import { $search, searchChanged } from "./model";

export const BoardsSearch = () => {
  const [search, handleSearch] = useUnit([$search, searchChanged]);

  return (
    <PageHeader
      title="Boards"
      headingAs="h4"
      placeholder="Search"
      searchValue={search}
      onSearch={handleSearch}
    />
  );
};
