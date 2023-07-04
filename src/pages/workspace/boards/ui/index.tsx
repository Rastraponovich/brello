import { type ReactNode, memo } from "react";
import { useList, useUnit } from "effector-react";
import { $boards, actions, selectors } from "../model";

import type { IBoardCard } from "../lib";
import { type IconName } from "src/shared/ui/icon";

import { buttonLib } from "src/shared/ui/button";

import { Layout } from "src/widgets/layout";
import { Button } from "src/shared/ui/button";
import { Heading } from "src/shared/ui/heading";
import { InputSearch } from "src/shared/ui/input";
import { ScrollContainer } from "src/shared/ui/scroll-container";
import { FeaturedIcon } from "src/shared/ui/icons/featured-icon";

const BoardsHeaderActionPanel = () => {
  return (
    <div className="flex shrink-0 items-start space-x-3">
      <Button size="sm" variant="secondaryGray" leftIcon="common/settings">
        Settings
      </Button>
      <Button size="sm" variant="primary" leftIcon="common/users-plus">
        Invite members
      </Button>
    </div>
  );
};

const BoardsHeader = () => {
  return (
    <div className="flex w-full flex-col px-6 sm:px-8">
      <div className="flex w-full flex-col  gap-5 border-b border-gray-200 pb-5 sm:flex-row sm:justify-between">
        <div className="flex w-full grow space-x-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-600">
            CI
          </div>
          <div className="flex flex-col">
            <Heading as="h2" className="text-2xl font-semibold text-gray-900">
              Coding in action
            </Heading>
            <span className="text-gray-600">Private</span>
          </div>
        </div>
        <BoardsHeaderActionPanel />
      </div>
    </div>
  );
};

export const BoardsPage = () => {
  return (
    <Layout>
      <section className=" flex w-full  flex-col space-y-4 py-8 sm:items-center sm:gap-6 sm:px-0 sm:py-0 ">
        <BoardsHeader />
      </section>

      <Boards />
    </Layout>
  );
};

const Boards = () => {
  const [search, searched] = selectors.useSearch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, isEmpty] = selectors.useBoardLength();

  const isNotFound = selectors.useEmptySearchResult();
  return (
    <section className="flex w-full flex-col items-center overflow-hidden px-6 py-8 sm:px-8">
      <div className="flex w-full flex-col gap-8 overflow-hidden">
        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Heading as="h2" className="text-lg font-semibold">
            Boards
          </Heading>
          <InputSearch
            value={search}
            onChange={searched}
            placeholder="Search"
          />
        </div>
        {isNotFound ? (
          <NotFoundState />
        ) : isEmpty ? (
          <EmptyState />
        ) : (
          <BoardsList />
        )}
      </div>
    </section>
  );
};

const BoardsList = () => {
  return (
    <ScrollContainer>
      <div className="grid place-items-stretch content-stretch gap-6 overflow-auto md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        <AddBoardCard />
        {useList($boards, {
          fn: (board) => <BoardCard {...board} />,
        })}
      </div>
    </ScrollContainer>
  );
};

interface IAction
  extends buttonLib.models.IButtonBaseProps,
    buttonLib.models.IButtonBaseVariant {
  caption: string;
}

interface IBaseEmptyProps {
  title: string;
  icon?: IconName;
  onClick?(): void;
  subTitle?: string;
  actions?: IAction[];
  children?: ReactNode;
}
const BaseEmpty = memo<IBaseEmptyProps>(
  ({ icon, title, subTitle, actions, onClick }) => {
    return (
      <div className="flex flex-col items-center">
        {icon && (
          <FeaturedIcon
            size="lg"
            icon={icon}
            type="circle"
            color="primary"
            variant="outline"
          />
        )}
        <Heading as="h3" className="font-semibold text-gray-900">
          {title}
        </Heading>
        {subTitle && (
          <p className="text-center text-sm text-gray-600">{subTitle}</p>
        )}
        <div className="mt-6 flex gap-3">
          {actions?.map(({ caption, ...action }, idx) => (
            <Button key={idx} size="md" variant="secondaryGray" {...action}>
              {caption}
            </Button>
          ))}
          <Button
            size="md"
            variant="primary"
            onClick={onClick}
            leftIcon="common/plus"
          >
            New board
          </Button>
        </div>
      </div>
    );
  }
);

BaseEmpty.displayName = "BaseEmpty";

const EmptyState = () => {
  const onCreated = useUnit(actions.addBoard);

  return (
    <BaseEmpty
      icon="common/plus"
      onClick={onCreated}
      title="Start by creating a board"
      actions={[{ caption: "Learn More", className: "hidden sm:flex" }]}
      subTitle="Your boards will live here. Start creating by clicking on «New board»"
    />
  );
};

const NotFoundState = memo(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchValue, _, onClear] = selectors.useSearch();
  const onCreated = useUnit(actions.addBoard);

  const message = `Your search ${searchValue} did not match any boards. Please try again.`;
  return (
    <BaseEmpty
      subTitle={message}
      onClick={onCreated}
      icon="common/search"
      title="No boards found"
      actions={[{ caption: "Clear search", onClick: onClear }]}
    />
  );
});
NotFoundState.displayName = "NotFoundState";

const AddBoardCard = memo(() => {
  const onCreated = useUnit(actions.addBoard);

  return (
    <div className="flex flex-col justify-start rounded-2xl border border-gray-200 px-5 py-6 pt-5 text-gray-600">
      <Button
        size="sm"
        onClick={onCreated}
        variant="tertiaryGray"
        leftIcon="common/plus-circle"
      >
        Create new board
      </Button>
    </div>
  );
});
AddBoardCard.displayName = "AddBoardCard";

const BoardCard = memo<IBoardCard>(({ title }) => {
  return (
    <figure className="flex flex-col justify-start self-stretch rounded-2xl border border-gray-200 bg-gray-900 px-5 py-6 pt-5 text-lg font-medium text-white">
      <figcaption>
        <Heading as="h4">{title}</Heading>
      </figcaption>
    </figure>
  );
});
BoardCard.displayName = "BoardCard";
