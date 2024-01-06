import { useList, useStoreMap, useUnit } from "effector-react";
import { memo, useCallback } from "react";

import { MainLayout } from "~/layouts/main-layout";

import { PageHeader, type PageHeaderAction } from "~/widgets/page-header";

import { BoardsSearch } from "~/features/boards/search";

import { cx } from "~/shared/lib";
import { Icon } from "~/shared/ui/icon";
import { LoaderCircle } from "~/shared/ui/loader-circle";
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
        <div className="flex w-full items-start justify-between">
          <div className="flex items-start gap-5">
            <div className="h-16 w-16 shrink-0 rounded-full bg-gray-200"></div>

            <div className="flex w-full max-w-xs shrink-0 grow flex-col gap-1">
              <div className="h-9 max-w-xs shrink-0 rounded-lg bg-gray-200"></div>

              <div className="h-6 w-full max-w-xs shrink-0 rounded-lg bg-gray-200"></div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-[42px] w-[120px] rounded-lg bg-gray-200"></div>

            <div className="h-[42px] w-[120px] rounded-lg bg-gray-200"></div>
          </div>
        </div>

        {/* <LoaderCircle pending={true} /> */}
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
          avatarImage={workspace?.avatarUrl ?? undefined}
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
  const [pending, isEmpty, isNotFound] = useUnit([$boardsListPending, $boardsEmpty, $isNotFound]);

  return (
    <section className="container relative mx-auto flex w-full flex-col items-center gap-8 overflow-hidden px-6 sm:px-8">
      <div className="flex w-full flex-col overflow-hidden">
        {isNotFound ? <NotFoundState /> : isEmpty ? <EmptyState /> : <BoardsList />}
      </div>
      <LoaderCircle pending={pending} />
    </section>
  );
};

/**
 * Renders the list of boards.
 */
const BoardsList = () => {
  const search = useUnit($search);

  return (
    <ScrollContainer>
      <div className="grid place-items-stretch content-stretch gap-6 overflow-y-auto md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {search.length === 0 && <AddBoardCard />}

        {useList($boards, {
          fn: (board) => <BoardCard id={board.id} />,
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
      <button onClick={handleAddBoard} className="flex h-14 items-center gap-2">
        <Icon name="common/plus-circle" className="h-5 w-5" />
        <span className="line-clamp-1 text-lg font-medium text-gray-600">Create new board</span>
      </button>
    </div>
  );
});

AddBoardCard.displayName = "AddBoardCard";

interface BoardCardProps {
  id: string;
}

const BoardCard = memo<BoardCardProps>(({ id }) => {
  const board = useStoreMap({
    keys: [id],
    store: $boards,
    fn(boards) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return boards.find((board) => board.id === id)!;
    },
  });

  const onCardClicked = useUnit(boardCardClicked);

  const { background_color, background_image, title } = board;

  const handleClick = useCallback(() => onCardClicked(board), [board, onCardClicked]);

  const background = background_image
    ? `url(${background_image?.replace("168x168", "280x120")}), lightgray 50%`
    : "revert-layer";

  return (
    <figure
      onClick={handleClick}
      style={{ background }}
      className={cx(
        background_color,
        "flex cursor-pointer flex-col justify-start self-stretch rounded-2xl border border-gray-200 bg-cover bg-no-repeat px-5 py-6 pt-5 text-lg font-medium text-white",
      )}
    >
      <figcaption>
        <h4 className="line-clamp-2 h-14 text-gray-600 mix-blend-plus-lighter">{title}</h4>
      </figcaption>
    </figure>
  );
});

BoardCard.displayName = "BoardCard";
