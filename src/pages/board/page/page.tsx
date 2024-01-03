import { useList, useUnit } from "effector-react";
import { type ReactNode, memo, useCallback } from "react";

import { MainLayout } from "~/layouts/main-layout";

import { AddList } from "~/features/add-list";
import { AddToFavorite } from "~/features/board/add-to-favorite";
import { TaskModal, taskOpened } from "~/features/task/task-edit";

import { StackColumn } from "~/entities/stack";

import { AvatarGroup } from "~/shared/ui/avatar";
import { Heading } from "~/shared/ui/heading";

import { _AVATARS_ } from "./constants";
import { $board, $stacks } from "./model";

/**
 * Render the BoardPage component.
 */
export const BoardPage = () => {
  return (
    <MainLayout>
      <PageHeaderContent />
      <List />
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

  return (
    <section className="container mx-auto my-0 flex flex-col gap-5 px-8">
      <header className="flex flex-col items-center border-b border-gray-200 pb-5 sm:flex-row sm:justify-between">
        <div className="flex flex-col justify-start gap-4 sm:flex-row sm:items-center">
          <Heading as="h1">{board?.title}</Heading>
          <AddToFavorite />
        </div>
        <AvatarGroup size="md" counter={5} canAddedUser items={_AVATARS_} />
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
    <section className="container mx-auto my-0 flex grow flex-col overflow-hidden h-full">
      <Grid>
        {useList($stacks, {
          getKey: (stack) => stack.id,

          fn: (stack) => (
            <GridColumn key={stack.id}>
              <StackColumn stack={stack} onTaskClicked={onTaskClicked} />
            </GridColumn>
          ),
        })}

        {board?.id && board?.user_id && (
          <GridColumn>
            <AddList board_id={board.id} user_id={board.user_id} buttonCaption="Add List" />
          </GridColumn>
        )}
      </Grid>
    </section>
  );
};

interface GridProps {
  children?: ReactNode;
}

const Grid = memo<GridProps>(({ children }) => {
  return (
    <div className="h-full grid snap-x snap-mandatory scroll-px-4 auto-cols-[360px] grid-flow-col gap-12 overflow-x-auto overflow-y-hidden px-8 py-4 sm:scroll-px-8 scroll-bar">
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
