import { cx } from "class-variance-authority";
import { useList, useUnit } from "effector-react";
import { memo } from "react";

import { MainLayout } from "~/layouts/main-layout";

import { PageHeader, type PageHeaderAction } from "~/widgets/page-header";

import { BoardsSearch } from "~/features/boards/search";

import type { Board } from "~/shared/api/rest/board";
import { Icon } from "~/shared/ui/icon";
import { ScrollContainer } from "~/shared/ui/scroll-container";

import {
  $boards,
  $boardsEmpty,
  $boardsListPending,
  $isNotFound,
  $search,
  $workspace,
  boardAddButtonClicked,
  boardCardClicked,
  resetSearch,
  settingsButtonClicked,
} from "./model";
import { BaseEmpty } from "./ui/base";
import { BoardAddModal } from "./ui/board-create";

/**
 * Renders a page loader component.
 */
export const PageLoader = () => {
  return (
    <MainLayout>
      <section className="container mx-auto my-0 px-6 sm:px-8">
        <h1>Loading, please wait</h1>
      </section>
    </MainLayout>
  );
};

/**
 * Renders the Boards Page component.
 */
export const BoardsPage = () => {
  const handleOpenSettings = useUnit(settingsButtonClicked);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const workspace = useUnit($workspace)!;

  const actions: PageHeaderAction[] = [
    {
      id: "settings",
      title: "Settings",
      variant: "secondaryGray",
      leftIcon: "common/settings",
      onClick: handleOpenSettings,
    },
    {
      id: "invite",
      variant: "primary",
      title: "Invite members",
      leftIcon: "users/users-plus",
    },
  ];

  return (
    <MainLayout>
      <section className="container mx-auto my-0 px-6 sm:px-8">
        <PageHeader
          divider
          headingAs="h1"
          actions={actions}
          description="Private"
          className="!items-start"
          title={workspace?.name || ""}
          avatar={{ firstName: "Clara", lastName: "Carala", id: 123 }}
        />
      </section>
      <BoardsFilter />

      <Boards />
      <BoardAddModal />
    </MainLayout>
  );
};

/**
 * Renders the BoardsFilter component.
 */
const BoardsFilter = () => {
  return (
    <section className="container mx-auto my-0 flex w-full flex-col items-center gap-8 px-6 sm:px-8">
      <BoardsSearch />
    </section>
  );
};

/**
 * Renders the Boards component.
 */
const Boards = () => {
  const [isEmpty, isNotFound] = useUnit([$boardsEmpty, $isNotFound]);
  const pending = useUnit($boardsListPending);

  return (
    <section className="container mx-auto my-0 flex w-full flex-col items-center gap-8 overflow-hidden px-6 sm:px-8">
      <div className="flex w-full flex-col overflow-hidden">
        {isNotFound ? (
          <NotFoundState />
        ) : isEmpty ? (
          <EmptyState />
        ) : pending ? (
          <div>loading...</div>
        ) : (
          <BoardsList />
        )}
      </div>
    </section>
  );
};

/**
 * Renders the list of boards.
 */
const BoardsList = () => {
  const [handleCardClick, search] = useUnit([boardCardClicked, $search]);

  return (
    <ScrollContainer>
      <div className="grid place-items-stretch content-stretch gap-6 overflow-y-auto md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {search.length === 0 && <AddBoardCard />}
        {useList($boards, {
          fn: (board) => <BoardCard {...board} onClick={() => handleCardClick(board)} />,
        })}
      </div>
    </ScrollContainer>
  );
};

/**
 * Renders an empty state component.
 */
const EmptyState = () => {
  const handleAddBoard = useUnit(boardAddButtonClicked);

  return (
    <BaseEmpty
      icon="common/plus"
      onClick={handleAddBoard}
      title="Start by creating a board"
      actions={[{ caption: "Learn More", className: "hidden sm:flex" }]}
      subTitle="Your boards will live here. Start creating by clicking on «New board»"
    />
  );
};

const NotFoundState = memo(() => {
  const [searchValue, onClear] = useUnit([$search, resetSearch]);
  const handleAddBoard = useUnit(boardAddButtonClicked);

  const message = `Your search ${searchValue} did not match any boards. Please try again.`;

  return (
    <BaseEmpty
      subTitle={message}
      icon="common/search"
      title="No boards found"
      onClick={handleAddBoard}
      actions={[{ caption: "Clear search", onClick: onClear }]}
    />
  );
});

NotFoundState.displayName = "NotFoundState";

const AddBoardCard = memo(() => {
  const handleAddBoard = useUnit(boardAddButtonClicked);

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 px-5 py-5 ">
      <button onClick={handleAddBoard} className="flex items-center gap-2 h-14">
        <Icon name="common/plus-circle" className="h-5 w-5" />
        <span className="line-clamp-1 text-gray-600 text-lg font-medium">Create new board</span>
      </button>
    </div>
  );
});

AddBoardCard.displayName = "AddBoardCard";

interface BoardCardProps extends Board {
  onClick?(): void;
}

const BoardCard = memo<BoardCardProps>(({ title, onClick, background_color }) => {
  return (
    <figure
      onClick={onClick}
      className={cx(
        "flex flex-col justify-start self-stretch rounded-2xl border border-gray-200 px-5 py-6 pt-5 text-lg font-medium text-white",
        background_color,
      )}
    >
      <figcaption>
        <h4 className="line-clamp-2 text-gray-600 h-14 mix-blend-plus-lighter">{title}</h4>
      </figcaption>
    </figure>
  );
});

BoardCard.displayName = "BoardCard";
