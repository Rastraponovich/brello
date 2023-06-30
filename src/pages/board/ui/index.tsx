import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { BoardList } from "src/entities/board";
import { AddList } from "src/features/add-list";
import { AvatarGroup } from "src/shared/ui/avatar";
import { IconButton } from "src/shared/ui/button";
import { Heading } from "src/shared/ui/heading";
import { Layout } from "src/widgets/layout";

const PageHeaderContent = () => {
  return (
    <section className="flex flex-col gap-5 px-8 ">
      <div className="flex flex-col items-center border-b border-gray-200 pb-5 sm:flex-row sm:justify-between">
        <div className="flex flex-col justify-start gap-4 text-3xl font-semibold text-gray-900 sm:flex-row sm:items-center">
          <Heading as="h2">Sprint #3 (03.04.2023 - 10.04.2023)</Heading>
          <IconButton
            icon={{ source: "shapes", icon: "star" }}
            size="sm"
            variant="tertiaryGray"
            className="self-start sm:self-auto"
          />
        </div>
        <AvatarGroup
          items={[{ id: 1 }, { id: 3 }, { id: 2 }, { id: 5 }, { id: 4 }]}
          size="md"
          counter={5}
          canAddedUser
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
  const boards = useMemo<unknown[]>(() => [], []);
  const [value, setValue] = useState("");

  const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    (event) => setValue(event.target.value),
    []
  );

  const handleReset = useCallback<FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();
      setEditable(false);
    },
    []
  );

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();
      setEditable((prev) => !prev);

      if (value.length > 0) {
        boards.unshift({
          id: boards.length + 1,
          title: value,
          subTitle: "",
          items: [],
        });
      }
    },
    [boards, value]
  );

  useEffect(() => {
    if (!editable) {
      setValue("");
    }
  }, [editable]);

  return (
    <div className="flex snap-x snap-mandatory scroll-px-4 items-start gap-12 overflow-x-auto overflow-y-hidden px-4 sm:scroll-px-8 sm:px-8">
      <BoardList />
      <BoardList />
      <BoardList />
      <BoardList />

      <AddList
        editable={editable}
        onChange={handleChange}
        onReset={handleReset}
        onSubmit={handleSubmit}
        value={value}
        buttonCaption="Add List"
      />
      {editable && (
        <AddList
          editable={false}
          onChange={handleChange}
          onReset={handleReset}
          onSubmit={handleSubmit}
          value={value}
          buttonCaption="Add List"
        />
      )}
    </div>
  );
};
