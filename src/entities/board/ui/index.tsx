import clsx from "clsx";
import {
  ChangeEventHandler,
  FormEventHandler,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";

import { models } from "../lib";
import type { TBoard } from "src/pages/board/lib/models";

import { Bage } from "src/shared/ui/bage";

import { BaseIcon } from "src/shared/ui/icon";
import { Heading } from "src/shared/ui/heading";
import { Dropdown } from "src/shared/ui/dropdown";
import { AvatarGroup } from "src/shared/ui/avatar";
import { AddEntity } from "src/features/add-entity";
import { ScrollContainer } from "src/shared/ui/scroll-container";

const BoardActions = () => {
  return (
    <div className="flex gap-3 text-gray-400">
      <Dropdown
        buttonContent={
          <BaseIcon source="general" icon="dots-vertical" size="large" />
        }
        groupProperty="group"
      />
      <BaseIcon source="general" icon="plus-circle" size="large" />
    </div>
  );
};

interface IBoardProps {
  board: TBoard;
}
export const Board = memo<IBoardProps>(({ board }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    (event) => setValue(event.target.value),
    []
  );

  const handleReset = useCallback<FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();
      setIsEditable(false);
    },
    []
  );

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    (event) => {
      event.preventDefault();
      setIsEditable((prev) => !prev);

      if (value.length > 0) {
        board.cards.unshift({
          id: board.cards.length + 1,
          title: value,
          subTitle: "",
          items: [],
        });
      }
    },
    [board.cards, value]
  );

  useEffect(() => {
    if (!isEditable) {
      setValue("");
    }
  }, [isEditable]);

  return (
    <div
      className={clsx(
        "flex w-full max-w-[360px] shrink-0 grow flex-col gap-4 py-4",
        "snap-center snap-normal overflow-hidden rounded-2xl border border-gray-200 bg-[#FCFCFD] shadow-sm",
        board.cards.length > 0 && "h-full"
      )}
    >
      <div className="flex items-center gap-2 py-1 pl-4 pr-4 text-lg font-bold text-gray-900">
        <Heading as="h3" className="grow px-4">
          To Do
        </Heading>
        <BoardActions />
      </div>
      <ScrollContainer>
        <CardList cards={board.cards} />
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
});
Board.displayName = "Board";
interface ICardProps extends models.TCard {
  onClick?(): void;
}
const Card = memo<ICardProps>(
  ({ bages, subTitle, title, items, attachments, timeStamp }) => {
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
          {subTitle.length > 0 && (
            <p className="text-base font-normal text-gray-600">{subTitle}</p>
          )}
        </div>

        {items.length > 0 && (
          <AvatarGroup items={items} size="sm" counter={5} canAddedUser />
        )}

        {timeStamp && (
          <div className="flex items-center justify-between text-base font-medium text-gray-600">
            <div className="flex items-center gap-2">
              <BaseIcon
                icon="clock"
                size="normal"
                source="general"
                className="text-gray-400"
              />
              <span>{timeStamp.toDateString()}</span>
            </div>
            {attachments && (
              <div className="flex items-center gap-2">
                <BaseIcon
                  size="normal"
                  source="general"
                  icon="attachment"
                  className="text-gray-400"
                />
                <span>5</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

interface ICardListProps {
  cards: models.TCard[];
}
const CardList = memo<ICardListProps>(({ cards }) => {
  return (
    <div className=" flex flex-col gap-4 overflow-hidden font-bold text-gray-900">
      {cards.map((card) => (
        <Card {...card} key={card.id} />
      ))}
    </div>
  );
});
