import { useList, useUnit } from "effector-react";
import { useCallback, useReducer } from "react";

import { MainLayout } from "~/layouts/main-layout";

import { AddToFavorite } from "~/features/board/add-to-favorite";
import { TaskModal } from "~/features/task/task-edit";

import { StackColumn, type StackFactory2 } from "~/entities/stack";

import { cx } from "~/shared/lib";
import { AvatarGroup } from "~/shared/ui/avatar";
import { IconButton } from "~/shared/ui/button";
import { Heading } from "~/shared/ui/heading";
import { LoaderCircle } from "~/shared/ui/loader-circle";
import { ScrollContainer } from "~/shared/ui/scroll-area";
import { type ToggleInput2, ToggledInput } from "~/shared/ui/toggled-input";

import { _AVATARS_ } from "./constants";
import {
  $board,
  $pageLoading,
  $stacks,
  $title,
  boardUpdated,
  listModel,
  settingsButtonClicked,
  titileChanged,
} from "./model";

/**
 * Render the BoardPage component.
 */
export function BoardPage() {
  return (
    <MainLayout className="relative gap-0 pb-0 max-sm:!overflow-auto sm:pb-0">
      <Loading />

      <PageHeaderContent />

      <List />

      <TaskModal />
    </MainLayout>
  );
}

export function PageLoader() {
  return (
    <MainLayout className="gap-0 pb-0 sm:pb-0">
      <section className="relative h-dvh">
        <LoaderCircle pending={true} />
      </section>
    </MainLayout>
  );
}

/**
 * Renders the content for the page header.
 *
 */
function PageHeaderContent() {
  const [board] = useUnit([$board]);

  const handleClick = useUnit(settingsButtonClicked);

  return (
    <section className="container mx-auto my-0 flex flex-col gap-5 px-8">
      <header className="flex items-center gap-y-5 border-b border-gray-200 pb-5 max-sm:flex-col sm:justify-between">
        <div className="flex w-full justify-start gap-4 max-sm:flex-col sm:items-center">
          <Title />

          <AddToFavorite board_id={board?.id} />
        </div>

        <div className="flex items-center gap-5">
          <AvatarGroup size="md" counter={5} canAddedUser items={_AVATARS_} />

          <IconButton
            size="sm"
            onClick={handleClick}
            variant="tertiaryGray"
            icon="common/settings-01"
          />
        </div>
      </header>
    </section>
  );
}

/**
 * Renders a list of boards and provides functionality to add new boards.
 *
 */
function List() {
  const board = useUnit($board);

  return (
    <section
      className={cx(
        "flex grow flex-col items-center overflow-visible bg-cover bg-no-repeat sm:overflow-auto md:pb-[92px] md:pt-8",
        board?.background_color,
      )}
      style={{
        backgroundImage: board?.background_image
          ? `url(${board?.background_image?.replace("168x168", "")})`
          : "revert-layer",
      }}
    >
      <section className="grid h-full py-4 xl:container">
        <Grid>
          {useList($stacks, {
            getKey: (stack) => stack.id,
            fn: (stack) => <StackItem stack={stack} />,
          })}

          <GridColumn>
            <AddStack />
          </GridColumn>
        </Grid>
      </section>
    </section>
  );
}

function Title() {
  const title = useUnit($title);
  const [editable, setEditable] = useReducer((state) => !state, false);

  const [onTitleChane, onSubmit] = useUnit([titileChanged, boardUpdated]);

  const onBlur = () => {
    setEditable();
    onSubmit();
  };

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onTitleChane(event.target.value);
    },
    [onTitleChane],
  );

  if (editable) {
    return (
      <input
        value={title}
        onBlur={onBlur}
        autoFocus={true}
        onChange={handleChange}
        className="border-b border-b-gray-200 py-0.5 text-2xl font-semibold text-gray-900 outline-none"
      />
    );
  }

  return (
    <Heading as="h1" onClick={setEditable}>
      {title}
    </Heading>
  );
}

function StackItem({ stack }: { stack: StackFactory2 }) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const data = useUnit<StackFactory2>(stack);

  return (
    <GridColumn key={stack.id}>
      <StackColumn stack={data} />
    </GridColumn>
  );
}

function AddStack() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const model = useUnit<ToggleInput2>(listModel);

  const { opened, reseted, value, valueChanged, submitClicked, pending } = model;

  return (
    <div
      className={cx(
        "w-full justify-start rounded-2xl border border-gray-200 bg-[#FCFCFD]",
        opened && "px-4 py-5 shadow-sm",
      )}
    >
      <ToggledInput
        value={value}
        opened={opened}
        pending={pending}
        onReset={reseted}
        onChange={valueChanged}
        onSubmit={submitClicked}
        buttonCaption="Add List"
      />
    </div>
  );
}

interface GridProps {
  children?: React.ReactNode;
}

function Grid({ children }: GridProps) {
  return (
    <ScrollContainer
      type="auto"
      className="md:pb-6"
      orientation="horizontal"
      viewPortClassName="snap-x snap-mandatory [&>div]:sm:!flex [&>div]:sm:h-full"
    >
      <div className="grid auto-cols-[calc(100vw-2rem)] grid-flow-col gap-8 px-4 sm:auto-cols-[360px] sm:!pr-[calc(100%_-_360px)] md:px-8 xl:gap-12">
        {children}
      </div>
    </ScrollContainer>
  );
}

interface GridColumnProps {
  children: React.ReactNode;
}

function GridColumn({ children }: GridColumnProps) {
  return (
    <div className="GRID_COL flex shrink-0 snap-start snap-normal scroll-ml-4 flex-col justify-start overflow-hidden md:scroll-mx-8">
      {children}
    </div>
  );
}

function Loading() {
  const pending = useUnit($pageLoading);

  return <LoaderCircle pending={pending} />;
}
