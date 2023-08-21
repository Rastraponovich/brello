import { useList, useUnit } from "effector-react";
import { type ReactNode, memo } from "react";

import { MainLayout } from "~/layouts/main-layout";

import { PageHeader, type PageHeaderAction } from "~/widgets/page-header";

import { BoardsSearch } from "~/features/boards/search";

import { Button, type ButtonBaseProps, type ButtonBaseVariant } from "~/shared/ui/button";
import { FeaturedIcon } from "~/shared/ui/featured-icon";
import { Heading } from "~/shared/ui/heading";
import { type IconName } from "~/shared/ui/icon";
import { ScrollContainer } from "~/shared/ui/scroll-container";

import {
  $boards,
  $boardsEmpty,
  $isNotFound,
  $search,
  $workspace,
  type TBoard,
  addBoard,
  boardCardClicked,
  resetSearch,
  settingsButtonClicked,
} from "./model";

export const PageLoader = () => {
  return (
    <MainLayout>
      <section className="container mx-auto my-0 px-6 sm:px-8">
        <h1>Loading, please wait</h1>
      </section>
    </MainLayout>
  );
};

export const BoardsPage = () => {
  const handleOpenSettings = useUnit(settingsButtonClicked);

  const workspace = useUnit($workspace);

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
          actions={actions}
          headingAs="h1"
          description="Private"
          title={workspace?.name ?? "Coding in action"}
          className="!items-start"
          avatar={{ firstName: "Clara", lastName: "Carala", id: 123 }}
        />
      </section>
      <BoardsFilter />

      <Boards />
    </MainLayout>
  );
};

const BoardsFilter = () => {
  return (
    <section className="container mx-auto my-0 flex w-full flex-col items-center gap-8 px-6 sm:px-8">
      <BoardsSearch />
    </section>
  );
};

const Boards = () => {
  const [isEmpty, isNotFound] = useUnit([$boardsEmpty, $isNotFound]);

  return (
    <section className="container mx-auto my-0 flex w-full flex-col items-center gap-8 overflow-hidden px-6 sm:px-8">
      <div className="flex w-full flex-col overflow-hidden">
        {isNotFound ? <NotFoundState /> : isEmpty ? <EmptyState /> : <BoardsList />}
      </div>
    </section>
  );
};

const BoardsList = () => {
  const handleCardClick = useUnit(boardCardClicked);

  return (
    <ScrollContainer>
      <div
        draggable
        className=" grid place-items-stretch content-stretch gap-6 overflow-auto md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
      >
        <AddBoardCard />
        {useList($boards, {
          fn: (board) => <BoardCard {...board} onClick={() => handleCardClick(board)} />,
        })}
      </div>
    </ScrollContainer>
  );
};

interface IAction extends ButtonBaseProps, ButtonBaseVariant {
  caption: string;
}

interface BaseEmptyProps {
  title: string;
  icon?: IconName;
  onClick?(): void;
  subTitle?: string;
  actions?: IAction[];
  children?: ReactNode;
}
const BaseEmpty = memo<BaseEmptyProps>(({ icon, title, subTitle, actions, onClick }) => {
  return (
    <div className="flex flex-col items-center">
      {icon && (
        <FeaturedIcon size="lg" icon={icon} type="circle" color="primary" variant="outline" />
      )}
      <Heading as="h3" className="font-semibold text-gray-900">
        {title}
      </Heading>
      {subTitle && <p className="text-center text-sm text-gray-600">{subTitle}</p>}
      <div className="mt-6 flex gap-3">
        {actions?.map(({ caption, ...action }, idx) => (
          <Button key={idx} size="md" variant="secondaryGray" {...action}>
            {caption}
          </Button>
        ))}
        <Button size="md" variant="primary" onClick={onClick} leftIcon="common/plus">
          New board
        </Button>
      </div>
    </div>
  );
});

BaseEmpty.displayName = "BaseEmpty";

const EmptyState = () => {
  const handleAddBoard = useUnit(addBoard);

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
  const handleAddBoard = useUnit(addBoard);

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
  const handleAddBoard = useUnit(addBoard);

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 px-5 py-6 pt-5 text-gray-600">
      <Button
        size="md"
        variant="tertiaryGray"
        onClick={handleAddBoard}
        leftIcon="common/plus-circle"
      >
        Create new board
      </Button>
    </div>
  );
});

AddBoardCard.displayName = "AddBoardCard";

interface BoardCardProps extends TBoard {
  onClick?(): void;
}

const BoardCard = memo<BoardCardProps>(({ title, onClick }) => {
  return (
    <figure
      onClick={onClick}
      className="flex flex-col justify-start self-stretch rounded-2xl border border-gray-200 bg-gray-900 px-5 py-6 pt-5 text-lg font-medium text-white"
    >
      <figcaption>
        <Heading as="h4">{title}</Heading>
      </figcaption>
    </figure>
  );
});

BoardCard.displayName = "BoardCard";
