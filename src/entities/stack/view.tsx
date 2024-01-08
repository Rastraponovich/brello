import { memo, useReducer, useRef } from "react";

import { TaskAddBase } from "~/features/task/add-task";

// import { AvatarGroup } from "~/shared/ui/avatar";
// import { Bage } from "~/shared/ui/bage";
import type { Tables } from "~/shared/api/client";
import type { Task } from "~/shared/api/rest/task";
import { cx } from "~/shared/lib";
import { Dropdown, type TMenuItem } from "~/shared/ui/dropdown";
import { Heading } from "~/shared/ui/heading";
import { Icon } from "~/shared/ui/icon";
import { LoaderCircle } from "~/shared/ui/loader-circle";

import { type StackFactory2 } from "./model";

const StackActions = memo(({ onDelete }: { onDelete: () => void }) => {
  const actions: TMenuItem[] = [
    {
      id: 1,
      group: 1,
      hotkey: "⌘K->P",
      onClick: onDelete,
      text: "delete stack",
      icon: "common/trash-01",
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
  stack: StackFactory2;
  onTaskClicked?: (task: Task) => void;
}

export const StackColumn = memo<StackColumnProps>(({ stack, onTaskClicked }) => {
  const { title, titleChanged, stackUpdated } = stack;

  const dragRef = useRef<HTMLDivElement>(null);
  const [editableTitle, setEditableTitle] = useReducer((state) => !state, false);

  const onBlur = () => {
    stackUpdated();
    setEditableTitle();
  };

  if (!stack) return null;

  return (
    <div
      ref={dragRef}
      className={cx(
        "flex w-full flex-col py-4",
        "rounded-2xl border border-gray-200 bg-[#FCFCFD] shadow-sm",
        "relative overflow-hidden",
      )}
    >
      {stack.pending && <LoaderCircle pending={stack.pending} />}

      <div className="flex items-center gap-2 px-4 py-1 text-lg font-bold text-gray-900">
        {editableTitle ? (
          <input
            type="text"
            onBlur={onBlur}
            value={title || "enter new title"}
            className="grow border-b px-4 pb-px outline-none"
            onChange={(event) => titleChanged(event.target.value)}
          />
        ) : (
          <Heading as="h3" className="grow px-4" onClick={setEditableTitle}>
            {title}
          </Heading>
        )}

        <StackActions onDelete={stack.deleteButtonClicked} />
      </div>

      <div className="overflow-hidden py-4 pr-2">
        <div className="scroll-bar scroll-shadows h-full overflow-y-auto pl-4 pr-2">
          <TaskCardList cards={stack.tasks ?? []} onTaskClicked={onTaskClicked} />
        </div>
      </div>

      <TaskAddBase
        title={stack.taskTitle}
        opened={stack.editorOpened}
        onSubmit={stack.submitTask}
        onReset={stack.taskCreateReseted}
        onTitleChange={stack.taskTitleChanged}
      />
    </div>
  );
});

interface TaskCardProps extends Task {
  onClick?(): void;
}

const TaskCard = memo<TaskCardProps>(({ description, title, attachments, createdAt, onClick }) => {
  const bages = null;

  return (
    <div
      onClick={onClick}
      className="flex cursor-pointer flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 text-gray-600"
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

      {createdAt && (
        <div className="flex items-center justify-between font-medium">
          <div className="flex items-center gap-2">
            <Icon size="normal" name="common/clock" className="text-gray-400" />

            <span>{new Date(createdAt).toDateString()}</span>
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
});

TaskCard.displayName = "TaskCard";

interface TaskCardListProps {
  cards: Tables<"tasks">[];
  onTaskClicked?: (task: Task) => void;
}

const TaskCardList = memo<TaskCardListProps>(({ cards, onTaskClicked }) => {
  if (!cards) return null;

  const items = cards.map(({ updated_at, user_id, created_at, stack_id, attachments, ...card }) => {
    return {
      ...card,
      attachments,
      userId: user_id,
      stackId: stack_id,
      createdAt: created_at,
      updatedAt: updated_at,
    };
  });

  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      {items.map((card) => (
        <TaskCard {...card} key={card.id} onClick={() => onTaskClicked?.(card)} />
      ))}
    </div>
  );
});

TaskCardList.displayName = "TaskCardList";
