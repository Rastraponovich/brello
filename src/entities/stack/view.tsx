import clsx from "clsx";
import { useUnit } from "effector-react";
import {
  type ChangeEventHandler,
  type DragEvent,
  type FormEventHandler,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type { Board } from "~/pages/board/page/model";

import { AddEntity } from "~/features/add-entity";

// import { AvatarGroup } from "~/shared/ui/avatar";
// import { Bage } from "~/shared/ui/bage";
import type { TStack } from "~/shared/api/rest/stack";
import { Dropdown, type TMenuItem } from "~/shared/ui/dropdown";
import { Heading } from "~/shared/ui/heading";
import { Icon } from "~/shared/ui/icon";
import { ScrollContainer } from "~/shared/ui/scroll-container";

import { type TTask, stackDeleted, taskAdded } from "./model";

const StackActions = memo(({ actions }: { actions?: TMenuItem[] }) => {
  return (
    <div className="flex gap-3 text-gray-400">
      <Dropdown
        items={actions}
        groupProperty="group"
        buttonContent={<Icon name="common/dots-vertical" size="large" />}
      />
      <Icon name="common/plus-circle" size="large" />
    </div>
  );
});

interface StackProps {
  board: Board | null;
  stack: TStack;
  onDragEnd?(event: DragEvent): void;
  onDragDrop?(event: DragEvent): void;
  onDragOver?(event: DragEvent): void;
  onDragStart?(event: DragEvent): void;
  onDragLeave?(event: DragEvent): void;
}

export const Stack = memo<StackProps>(
  ({ stack, onDragDrop, board, onDragEnd, onDragLeave, onDragOver, onDragStart }) => {
    console.log(board, "board");

    const taskAdd = useUnit(taskAdded);
    const stackDeletedAction = useUnit(stackDeleted);

    const [isEditable, setIsEditable] = useState(false);
    const [value, setValue] = useState("");

    const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
      (event) => setValue(event.target.value),
      [],
    );

    const handleReset = useCallback<FormEventHandler<HTMLFormElement>>((event) => {
      event.preventDefault();
      setIsEditable(false);
    }, []);

    const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
      (event) => {
        event.preventDefault();
        setIsEditable((prev) => !prev);

        if (value.length > 0 && board) {
          taskAdd({ user_id: board.user_id, title: value, stack_id: stack.id });
        }
      },
      [board, stack.id, taskAdd, value],
    );

    useEffect(() => {
      if (!isEditable) {
        setValue("");
      }
    }, [isEditable]);

    const dragRef = useRef<HTMLDivElement>(null);

    if (!board) return null;

    return (
      <div
        draggable
        ref={dragRef}
        onDragStart={onDragStart}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDragDrop}
        onDragEnd={onDragEnd}
        className={clsx(
          "flex w-full flex-col gap-4 py-4",
          "rounded-2xl border border-gray-200 bg-[#FCFCFD] shadow-sm",
          "overflow-hidden",
        )}
      >
        <div className="flex items-center gap-2 py-1 pl-4 pr-4 text-lg font-bold text-gray-900">
          <Heading as="h3" className="grow px-4">
            {stack.title || "To Do"}
          </Heading>
          <StackActions
            actions={[
              {
                id: 1,
                group: 1,
                hotkey: "⌘K->P",
                text: "delete stack",
                icon: "common/trash-01",
                onClick: () => stackDeletedAction({ id: stack.id, user_id: board.user_id }),
              },
            ]}
          />
        </div>
        <ScrollContainer>
          <CardList cards={stack.tasks ?? []} />
        </ScrollContainer>
        <AddEntity
          value={value}
          editable={isEditable}
          onReset={handleReset}
          onSubmit={handleSubmit}
          onChange={handleChange}
          buttonCaption="Add Card"
        />
      </div>
    );
  },
);
Stack.displayName = "Stack";

interface TaskCardProps extends TTask {
  onClick?(): void;
}
const TaskCard = memo<TaskCardProps>(({ bages, description, title, attachments, timeStamp }) => {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex flex-col gap-1">
        <Heading as="h3">{title}</Heading>

        {bages && (
          <div className="flex justify-start gap-2">
            {/* {bages.map((bage) => (
              <Bage key={bage.id} {...bage} />
            ))} */}
          </div>
        )}
        {description && description.length > 0 && (
          <p className="text-base font-normal text-gray-600">{description}</p>
        )}
      </div>

      {/* {users.length > 0 && <AvatarGroup items={users} size="sm" counter={5} canAddedUser />} */}

      {timeStamp && (
        <div className="flex items-center justify-between text-base font-medium text-gray-400">
          <div className="flex items-center gap-2">
            <Icon size="normal" name="common/clock" />
            <span className="text-gray-600">{timeStamp.toDateString()}</span>
          </div>
          {attachments && (
            <div className="flex items-center gap-2">
              <Icon size="normal" name="common/attachment" />
              <span>5</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
});

TaskCard.displayName = "Card";

interface CardListProps {
  cards: TStack["tasks"];
}
const CardList = memo<CardListProps>(({ cards }) => {
  if (!cards) return null;

  return (
    <div className=" flex flex-col gap-4 overflow-hidden font-bold text-gray-900">
      {cards.map((card) => (
        <TaskCard {...card} key={card.id} />
      ))}
    </div>
  );
});
