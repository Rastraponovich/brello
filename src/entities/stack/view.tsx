import { useUnit } from "effector-react";
import { memo, useReducer, useRef, useState } from "react";

import { TaskAdd } from "~/features/task/add-task";

// import { AvatarGroup } from "~/shared/ui/avatar";
// import { Bage } from "~/shared/ui/bage";
import type { Stack } from "~/shared/api/rest/stack";
import type { Task } from "~/shared/api/rest/task";
import { cx } from "~/shared/lib";
import { Dropdown, type TMenuItem } from "~/shared/ui/dropdown";
import { Heading } from "~/shared/ui/heading";
import { Icon } from "~/shared/ui/icon";

import { stackDeleted, stackUpdated } from "./model";

const StackActions = memo(({ user_id, stack_id }: { user_id: string; stack_id: string }) => {
  const [stackDeletedAction] = useUnit([stackDeleted]);

  const actions: TMenuItem[] = [
    {
      id: 1,
      group: 1,
      hotkey: "⌘K->P",
      text: "delete stack",
      icon: "common/trash-01",
      onClick: () => stackDeletedAction({ id: stack_id, user_id }),
    },
  ];

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

interface StackColumnProps {
  stack: Stack;
  onTaskClicked?: (task: Task) => void;
}

export const StackColumn = memo<StackColumnProps>(({ stack, onTaskClicked }) => {
  const dragRef = useRef<HTMLDivElement>(null);
  const [editableTitle, setEditableTitle] = useReducer((state) => !state, false);

  const handleStackUpdate = useUnit(stackUpdated);

  const [title, setTitle] = useState(stack.title || "enter new title");

  const onBlur = () => {
    handleStackUpdate({ id: stack.id, title });
    setEditableTitle();
  };

  if (!stack) return null;

  return (
    <div
      ref={dragRef}
      className={cx(
        "flex w-full flex-col py-4",
        "rounded-2xl border border-gray-200 bg-[#FCFCFD] shadow-sm",
        "overflow-hidden",
      )}
    >
      <div className="flex items-center gap-2 py-1 px-4 text-lg font-bold text-gray-900">
        {editableTitle ? (
          <input
            type="text"
            value={title}
            onBlur={onBlur}
            className="px-4 pb-px grow border-b outline-none"
            onChange={(event) => setTitle(event.target.value)}
          />
        ) : (
          <Heading as="h3" className="grow px-4" onClick={setEditableTitle}>
            {title}
          </Heading>
        )}

        <StackActions stack_id={stack.id} user_id={stack.user_id} />
      </div>

      <div className="overflow-hidden pr-2 py-4">
        <div className="overflow-y-auto pl-4 pr-2 scroll-bar scroll-shadows h-full">
          <TaskCardList cards={stack.tasks ?? []} onTaskClicked={onTaskClicked} />
        </div>
      </div>

      <TaskAdd user_id={stack.user_id} stack_id={stack.id} />
    </div>
  );
});

StackColumn.displayName = "StackColumn";

interface TaskCardProps extends Task {
  onClick?(): void;
}

const TaskCard = memo<TaskCardProps>(
  ({ bages, description, title, attachments, created_at, onClick }) => {
    return (
      <div
        onClick={onClick}
        className="cursor-pointer flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 text-gray-600"
      >
        <div className="flex flex-col gap-1">
          <h3>{title}</h3>

          {bages && (
            <div className="flex justify-start gap-2">
              {/* {bages.map((bage) => (
              <Bage key={bage.id} {...bage} />
            ))} */}
            </div>
          )}

          {description && <p>{description}</p>}
        </div>

        {/* {users.length > 0 && <AvatarGroup items={users} size="sm" counter={5} canAddedUser />} */}

        {created_at && (
          <div className="flex items-center justify-between font-medium">
            <div className="flex items-center gap-2">
              <Icon size="normal" name="common/clock" className="text-gray-400" />

              <span>{new Date(created_at).toDateString()}</span>
            </div>

            {attachments && (
              <div className="flex items-center gap-2">
                <Icon size="normal" name="common/attachment" className="text-gray-400" />

                <span>5</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);

TaskCard.displayName = "TaskCard";

interface CardListProps {
  cards: Stack["tasks"];
  onTaskClicked?: (task: Task) => void;
}

const TaskCardList = memo<CardListProps>(({ cards, onTaskClicked }) => {
  if (!cards) return null;

  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      {cards.map((card) => (
        <TaskCard {...card} key={card.id} onClick={() => onTaskClicked?.(card)} />
      ))}
    </div>
  );
});

TaskCardList.displayName = "TaskCardList";
