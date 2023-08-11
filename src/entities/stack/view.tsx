import clsx from "clsx";
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

import { AddEntity } from "~/features/add-entity";

import { AvatarGroup } from "~/shared/ui/avatar";
import { Bage } from "~/shared/ui/bage";
import { Dropdown } from "~/shared/ui/dropdown";
import { Heading } from "~/shared/ui/heading";
import { Icon } from "~/shared/ui/icon";
import { ScrollContainer } from "~/shared/ui/scroll-container";

import type { TCard, TStack } from "./model";

const StackActions = memo(() => {
  return (
    <div className="flex gap-3 text-gray-400">
      <Dropdown
        buttonContent={<Icon name="common/dots-vertical" size="large" />}
        groupProperty="group"
      />
      <Icon name="common/plus-circle" size="large" />
    </div>
  );
});

interface StackProps {
  stack: TStack;
  onDragStart?(event: DragEvent): void;
  onDragEnd?(event: DragEvent): void;
  onDragLeave?(event: DragEvent): void;
  onDragOver?(event: DragEvent): void;
  onDragDrop?(event: DragEvent): void;
}

export const Stack = memo<StackProps>(
  ({ stack, onDragDrop, onDragEnd, onDragLeave, onDragOver, onDragStart }) => {
    const [cards, setCards] = useState<TCard[]>(stack.cards);
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

        if (value.length > 0) {
          const newState = [...cards];

          newState.unshift({
            id: stack.cards.length + 1,
            title: value,
            subTitle: "",
            users: [],
          });
          setCards(newState);
        }
      },
      [stack.cards.length, cards, value],
    );

    useEffect(() => {
      if (!isEditable) {
        setValue("");
      }
    }, [isEditable]);

    const dragRef = useRef<HTMLDivElement>(null);

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
          <StackActions />
        </div>
        <ScrollContainer>
          <CardList cards={cards} />
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

interface ICardProps extends TCard {
  onClick?(): void;
}
const Card = memo<ICardProps>(({ bages, subTitle, title, users, attachments, timeStamp }) => {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5">
      <div className="flex flex-col gap-1">
        <Heading as="h3">{title}</Heading>

        {bages && (
          <div className="flex justify-start gap-2">
            {bages.map((bage) => (
              <Bage key={bage.id} {...bage} />
            ))}
          </div>
        )}
        {subTitle.length > 0 && <p className="text-base font-normal text-gray-600">{subTitle}</p>}
      </div>

      {users.length > 0 && <AvatarGroup items={users} size="sm" counter={5} canAddedUser />}

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

Card.displayName = "Card";

interface CardListProps {
  cards: TCard[];
}
const CardList = memo<CardListProps>(({ cards }) => {
  return (
    <div className=" flex flex-col gap-4 overflow-hidden font-bold text-gray-900">
      {cards.map((card) => (
        <Card {...card} key={card.id} />
      ))}
    </div>
  );
});
