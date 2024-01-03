import clsx from "clsx";
import { useUnit } from "effector-react";
import { memo, useRef } from "react";

import { AddEntity } from "~/features/add-entity";

// import { AvatarGroup } from "~/shared/ui/avatar";
// import { Bage } from "~/shared/ui/bage";
import type { Stack } from "~/shared/api/rest/stack";
import type { TTask } from "~/shared/api/rest/task";
import { Dropdown, type TMenuItem } from "~/shared/ui/dropdown";
import { Heading } from "~/shared/ui/heading";
import { Icon } from "~/shared/ui/icon";
import { ScrollContainer } from "~/shared/ui/scroll-container";

import { stackDeleted } from "./model";

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
}

export const StackColumn = memo<StackColumnProps>(({ stack }) => {
  const dragRef = useRef<HTMLDivElement>(null);

  if (!stack) return null;

  return (
    <div
      draggable
      ref={dragRef}
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
        <StackActions stack_id={stack.id} user_id={stack.user_id} />
      </div>
      <ScrollContainer>
        <TaskCardList cards={stack.tasks ?? []} />
      </ScrollContainer>
      <AddEntity buttonCaption="Add Card" user_id={stack.user_id} stack_id={stack.id} />
    </div>
  );
});
StackColumn.displayName = "Stack";

interface TaskCardProps extends TTask {
  onClick?(): void;
}
const TaskCard = memo<TaskCardProps>(({ bages, description, title, attachments, created_at }) => {
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

      {created_at && (
        <div className="flex items-center justify-between text-base font-medium text-gray-400">
          <div className="flex items-center gap-2">
            <Icon size="normal" name="common/clock" />
            <span className="text-gray-600">{new Date(created_at).toDateString()}</span>
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

TaskCard.displayName = "TaskCard";

interface CardListProps {
  cards: Stack["tasks"];
}
const TaskCardList = memo<CardListProps>(({ cards }) => {
  if (!cards) return null;

  return (
    <div className="flex flex-col gap-4 overflow-hidden font-bold text-gray-900">
      {cards.map((card) => (
        <TaskCard {...card} key={card.id} />
      ))}
    </div>
  );
});

TaskCardList.displayName = "TaskCardList";
