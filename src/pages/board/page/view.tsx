import {
  type ChangeEventHandler,
  type DragEvent,
  type FormEventHandler,
  type ReactNode,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";

import { Layout } from "widgets/layout";

import { AddList } from "features/add-list";
import { AddToFavorite } from "features/board/add-to-favorite";

import { Stack } from "entities/stack";

import { useDragAndDrop } from "shared/hooks/dnd";
import { AvatarGroup } from "shared/ui/avatar";
import { Heading } from "shared/ui/heading";

import { _AVATARS_, _BOARDS_ } from "./constants";
import { type TBoard } from "./model";

/**
 * Render the BoardPage component.
 *
 * @return {JSX.Element} The rendered BoardPage component.
 */
export const BoardPage = () => {
  return (
    <Layout>
      <PageHeaderContent />
      <List />
    </Layout>
  );
};

/**
 * Renders the content for the page header.
 *
 * @return {JSX.Element} The rendered JSX element.
 */
const PageHeaderContent = () => {
  return (
    <section className="container mx-auto my-0 flex flex-col gap-5 px-8">
      <header className="flex flex-col items-center border-b border-gray-200 pb-5 sm:flex-row sm:justify-between">
        <div className="flex flex-col justify-start gap-4 sm:flex-row sm:items-center">
          <Heading as="h1">Sprint #3 (03.04.2023 - 10.04.2023)</Heading>
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
 * @return {JSX.Element} The rendered list component.
 */
const List = () => {
  const [editable, setEditable] = useState(false);
  const [stacks, setBoards] = useState<TBoard[]>(_BOARDS_);
  const [value, setValue] = useState("");

  const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    (event) => setValue(event.target.value),
    [],
  );

  const handleReset = useCallback<FormEventHandler<HTMLFormElement>>((event) => {
    event.preventDefault();
    setEditable(false);
  }, []);

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();
      setEditable((prev) => !prev);

      if (value.length > 0) {
        const newState = [...stacks];

        newState.push({
          id: stacks.length + 1,
          title: value,
          cards: [],
        });

        setBoards(newState);
      }
    },
    [stacks, value],
  );

  useEffect(() => {
    if (!editable) {
      setValue("");
    }
  }, [editable]);

  const handleDragLeave = (event: DragEvent) => {
    if (event.target instanceof HTMLElement) {
      const container = event.target.closest(".GRID_COL");

      if (container) {
        container.classList.remove("border-2", "border-black");
      }
    }
  };
  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    const img = new Image();

    img.src = "/Brello.svg";
    event.dataTransfer.setDragImage(img, 0, 0);

    if (event.target instanceof HTMLElement) {
      const container = event.target.closest(".GRID_COL");

      if (container) {
        container.classList.add("border-2", "border-black");
      }
    }
  };
  const handleDragDrop = (event: DragEvent, _: TBoard) => {
    event.preventDefault();

    if (event.target instanceof HTMLElement) {
      const container = event.target.closest(".GRID_COL");

      if (container) {
        container.classList.remove("border-2", "border-black");
      }
    }
  };

  const { handleDragEnd, handleDragStart } = useDragAndDrop<TBoard>();

  return (
    <section className="container mx-auto my-0 flex grow flex-col overflow-hidden">
      <Grid>
        {stacks.map((stack) => (
          <GridColumn key={stack.id}>
            <Stack
              stack={stack}
              onDragDrop={(e) => handleDragDrop(e, stack)}
              onDragEnd={handleDragEnd}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDragStart={(e) => handleDragStart(e, stack)}
            />
          </GridColumn>
        ))}
        <GridColumn>
          <AddList
            value={value}
            editable={editable}
            onReset={handleReset}
            onChange={handleChange}
            onSubmit={handleSubmit}
            buttonCaption="Add List"
          />
        </GridColumn>

        {editable && (
          <GridColumn>
            <AddList
              value={value}
              editable={false}
              onReset={handleReset}
              onChange={handleChange}
              onSubmit={handleSubmit}
              buttonCaption="Add List"
            />
          </GridColumn>
        )}
      </Grid>
    </section>
  );
};

interface IGrid {
  children?: ReactNode;
}

const Grid = memo<IGrid>(({ children }) => {
  return (
    <div className="grid snap-x snap-mandatory  scroll-px-4 auto-cols-[360px] grid-flow-col gap-12 overflow-x-auto overflow-y-hidden px-8 py-4 sm:scroll-px-8 ">
      {children}
    </div>
  );
});

interface IGridColumn {
  children: ReactNode;
}
const GridColumn = memo<IGridColumn>(({ children }) => {
  return (
    <div className="GRID_COL flex  snap-start snap-normal flex-col justify-start overflow-hidden">
      {children}
    </div>
  );
});
