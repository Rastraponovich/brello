import {
  type ChangeEventHandler,
  type FormEventHandler,
  type DragEventHandler,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
  memo,
} from "react";

import { helpers, type models } from "./lib";

import { Board } from "entities/board";
import { Layout } from "widgets/layout";
import { AddList } from "features/add-list";
import { Heading } from "shared/ui/heading";
import { AvatarGroup } from "shared/ui/avatar";
import { AddToFavorite } from "features/board/add-to-favorite";

type TDragEventHandler = (event: DragEvent, item: models.TBoard) => void;

/**
 * @description Page
 */
export const BoardPage = () => {
  return (
    <Layout>
      <PageHeaderContent />
      <List />
    </Layout>
  );
};

const PageHeaderContent = () => {
  return (
    <section className="container mx-auto my-0 flex flex-col gap-5 px-8">
      <header className="flex flex-col items-center border-b border-gray-200 pb-5 sm:flex-row sm:justify-between">
        <div className="flex flex-col justify-start gap-4 sm:flex-row sm:items-center">
          <Heading as="h1">Sprint #3 (03.04.2023 - 10.04.2023)</Heading>
          <AddToFavorite />
        </div>
        <AvatarGroup
          size="md"
          counter={5}
          canAddedUser
          items={helpers._AVATARS_}
        />
      </header>
    </section>
  );
};

const List = () => {
  const [editable, setEditable] = useState(false);
  const [boards, setBoards] = useState<models.TBoard[]>(helpers.BOARDS);
  const [value, setValue] = useState("");

  const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    (event) => setValue(event.target.value),
    [],
  );

  const handleReset = useCallback<FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();
      setEditable(false);
    },
    [],
  );

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();
      setEditable((prev) => !prev);

      if (value.length > 0) {
        const newState = [...boards];

        newState.push({
          id: boards.length + 1,
          title: value,
          cards: [],
        });

        setBoards(newState);
      }
    },
    [boards, value],
  );

  useEffect(() => {
    if (!editable) {
      setValue("");
    }
  }, [editable]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCurrentItem] = useState<models.TBoard | null>(null);
  const handleDragStart: TDragEventHandler = (_event, item) => {
    setCurrentItem(item);
    // console.log(event.type, item);
  };
  const handleDragEnd: DragEventHandler<HTMLDivElement> = (event) => {
    // console.log(event.type);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const container = event.target.closest(".GRID_COL");

    if (container) {
      container.classList.remove("border-2");
      container.classList.remove("border-black");
    }
  };
  const handleDragLeave: DragEventHandler = (event) => {
    // console.log(event.type, event);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const container = event.target.closest(".GRID_COL");

    if (container) {
      container.classList.remove("border-2");
      container.classList.remove("border-black");
    }
  };
  const handleDragOver: DragEventHandler = (event) => {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const container = event.target.closest(".GRID_COL");

    if (container) {
      container.classList.add("border-2");
      container.classList.add("border-black");
    }

    // console.log(event.type);
  };
  const handleDragDrop: (event: DragEvent, item: unknown) => void = (event) => {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const container = event.target.closest(".GRID_COL");

    if (container) {
      container.classList.remove("border-2");
      container.classList.remove("border-black");
    }
  };

  return (
    <section className="container mx-auto my-0 flex grow flex-col overflow-hidden">
      <Grid>
        {boards.map((board) => (
          <GridColumn key={board.id}>
            <Board
              board={board}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              onDragDrop={(e) => handleDragDrop(e, board)}
              onDragEnd={handleDragEnd}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-ignore
              onDragStart={(e) => handleDragStart(e, board)}
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
    <div className="grid snap-x snap-mandatory  scroll-px-4 auto-cols-[360px] grid-flow-col gap-12 overflow-x-auto overflow-y-hidden p-4 sm:scroll-px-8 sm:p-8 ">
      {children}
    </div>
  );
});

interface IGridColumn {
  children: ReactNode;
}
const GridColumn = memo<IGridColumn>(({ children }) => {
  return (
    <div className="GRID_COL flex  snap-center snap-normal flex-col justify-start overflow-hidden">
      {children}
    </div>
  );
});
