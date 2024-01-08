import { useList, useUnit } from "effector-react";
import { type ReactNode, memo, useCallback } from "react";

import { MainLayout } from "~/layouts/main-layout";

import { AddList } from "~/features/add-list";
import { AddToFavorite } from "~/features/board/add-to-favorite";
import { TaskModal, taskOpened } from "~/features/task/task-edit";

import { StackColumn } from "~/entities/stack";

import { cx } from "~/shared/lib";
import { AvatarGroup } from "~/shared/ui/avatar";
import { IconButton } from "~/shared/ui/button";
import { Heading } from "~/shared/ui/heading";
import { LoaderCircle } from "~/shared/ui/loader-circle";

import { _AVATARS_ } from "./constants";
import { $board, $pageLoading, $stacks, settingsButtonClicked } from "./model";

/**
 * Render the BoardPage component.
 */
export const BoardPage = () => {
  return (
    <MainLayout className="relative gap-0 pb-0 sm:pb-0">
      <Loading />

      <PageHeaderContent />
      <List />
      <TaskModal />
    </MainLayout>
  );
};

export const PageLoader = () => {
  return (
    <MainLayout className="gap-0 pb-0 sm:pb-0">
      <section className="relative h-screen">
        <LoaderCircle pending={true} />
      </section>
      <TaskModal />
    </MainLayout>
  );
};

/**
 * Renders the content for the page header.
 *
 */
const PageHeaderContent = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const board = useUnit($board)!;

  const handleClick = useUnit(settingsButtonClicked);

  return (
    <section className="container mx-auto my-0 flex flex-col gap-5 px-8">
      <header className="flex flex-col items-center border-b border-gray-200 pb-5 sm:flex-row sm:justify-between">
        <div className="flex flex-col justify-start gap-4 sm:flex-row sm:items-center">
          <Heading as="h1">{board?.title}</Heading>
          <AddToFavorite board_id={board?.id} />
        </div>
        <div className="flex items-center gap-5">
          <AvatarGroup size="md" counter={5} canAddedUser items={_AVATARS_} />
          <IconButton
            size="sm"
            onClick={handleClick}
            icon="common/settings-01"
            variant="tertiaryGray"
          />
        </div>
      </header>
    </section>
  );
};

/**
 * Renders a list of boards and provides functionality to add new boards.
 *
 */
const List = () => {
  const board = useUnit($board);

  const taskCardClicked = useUnit(taskOpened);

  const onTaskClicked = useCallback(taskCardClicked, [taskCardClicked]);

  return (
    <section
      className={cx(
        "flex grow flex-col items-center overflow-auto bg-cover bg-no-repeat pb-24 pt-8",
        board?.background_color,
      )}
      style={{
        backgroundImage: board?.background_image
          ? `url(${board?.background_image?.replace("168x168", "")})`
          : "revert-layer",
      }}
    >
      <section className="container flex h-full grow flex-col">
        <Grid>
          {useList($stacks, {
            getKey: (stack) => stack.id,

            fn: (stack) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const data = useUnit(stack);

              return (
                <GridColumn key={stack.id}>
                  {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                  {/* @ts-ignore */}
                  <StackColumn stack={data} onTaskClicked={onTaskClicked} />
                </GridColumn>
              );
            },
          })}

          {board?.id && board?.user_id && (
            <GridColumn>
              <AddList board_id={board.id} user_id={board.user_id} buttonCaption="Add List" />
            </GridColumn>
          )}
        </Grid>
      </section>
    </section>
  );
};

interface GridProps {
  children?: ReactNode;
}

const Grid = memo<GridProps>(({ children }) => {
  return (
    <div className="scroll-bar grid h-full snap-x snap-mandatory scroll-px-4 auto-cols-[calc(100vw-32px)] grid-flow-col gap-12 overflow-x-auto  px-8 py-4 sm:scroll-px-8 sm:auto-cols-[360px]">
      {children}
    </div>
  );
});

Grid.displayName = "Grid";

interface GridColumnProps {
  children: ReactNode;
}

const GridColumn = memo<GridColumnProps>(({ children }) => {
  return (
    <div className="GRID_COL flex snap-start snap-normal flex-col justify-start overflow-hidden">
      {children}
    </div>
  );
});

const Loading = () => {
  const pending = useUnit($pageLoading);

  return <LoaderCircle pending={pending} />;
};
