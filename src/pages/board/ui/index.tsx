import {
  type ChangeEventHandler,
  type FormEventHandler,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
  memo,
} from "react";

import { helpers, models } from "../lib";

import { Board } from "src/entities/board";
import { Layout } from "src/widgets/layout";
import { AddList } from "src/features/add-list";
import { Heading } from "src/shared/ui/heading";
import { IconButton } from "src/shared/ui/button";
import { AvatarGroup } from "src/shared/ui/avatar";

const PageHeaderContent = () => {
  return (
    <section className="flex flex-col gap-5 px-8 ">
      <div className="flex flex-col items-center border-b border-gray-200 pb-5 sm:flex-row sm:justify-between">
        <div className="flex flex-col justify-start gap-4 text-3xl font-semibold text-gray-900 sm:flex-row sm:items-center">
          <Heading as="h2">Sprint #3 (03.04.2023 - 10.04.2023)</Heading>
          <IconButton
            size="sm"
            icon="shapes/star-01"
            variant="tertiaryGray"
            className="self-start sm:self-auto"
          />
        </div>
        <AvatarGroup
          size="md"
          counter={5}
          canAddedUser
          items={[
            {
              id: 1,
              photo: "images/Image.png",
              firstName: "Habal",
              lastName: "Habalych",
            },
            {
              id: 3,
              photo: "images/Image.png",
              firstName: "John",
              lastName: "Travolta",
            },
            {
              id: 2,
              photo: "images/Image.png",
              firstName: "Edvard",
              lastName: "Calin",
            },
            {
              id: 5,
              photo: "images/Image.png",
              firstName: "Timber",
              lastName: "Saw",
            },
            {
              id: 4,
              photo: "images/Image.png",
              firstName: "Keth",
              lastName: "Flint",
            },
          ]}
        />
      </div>
    </section>
  );
};

export const BoardPage = () => {
  return (
    <Layout>
      <PageHeaderContent />
      <List />
    </Layout>
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

  return (
    <Grid>
      {boards.map((board) => (
        <GridColumn key={board.id}>
          <Board board={board} />
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
    <div className="flex  snap-center snap-normal flex-col justify-start overflow-hidden">
      {children}
    </div>
  );
});
