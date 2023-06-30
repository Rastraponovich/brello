import { AvatarGroup } from "src/shared/ui/avatar";
import { TBoard } from "../lib";
import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Bage } from "src/shared/ui/bage";

import { ScrollContainer } from "src/shared/ui/scroll-container";
import { Dropdown } from "src/shared/ui/dropdown";
import { AddEntity } from "src/features/add-entity";
import { BaseIcon } from "src/shared/ui/icon";

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

export const BoardList = () => {
  const [isEditable, setIsEditable] = useState(false);
  const cards: TBoard[] = useMemo(
    () => [
      {
        id: 1,
        title: "Product Designer",
        subTitle: "",
        items: [],
      },
      {
        id: 2,
        title: "Product Designer",
        subTitle:
          "We’re looking for a mid-level product designer to join our team.",
        items: [],
      },
      {
        id: 3,
        title: "Product Designer",
        subTitle:
          "We’re looking for a mid-level product designer to join our team.",
        items: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
      {
        id: 4,
        title: "Product Designer",
        subTitle:
          "We’re looking for a mid-level product designer to join our team.",
        items: [{ id: 1 }, { id: 2 }, { id: 3 }],
        timeStamp: new Date("04-01-2023"),
        attachments: 5,
        bages: [
          {
            id: 1,
            caption: "preved",
            variant: "dot",
            color: "blue",
            size: "md",
          },
          {
            id: 2,
            caption: "medved",
            variant: "dot",
            color: "blue",
            size: "md",
          },
        ],
      },
    ],
    []
  );
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
        cards.unshift({
          id: cards.length + 1,
          title: value,
          subTitle: "",
          items: [],
        });
      }
    },
    [cards, value]
  );

  useEffect(() => {
    if (!isEditable) {
      setValue("");
    }
  }, [isEditable]);

  return (
    <div className="flex h-full max-w-[360px] shrink-0 grow snap-center snap-normal flex-col gap-4 overflow-hidden rounded-2xl border border-gray-200 bg-[#FCFCFD] py-4 shadow-sm">
      <div className="flex items-center gap-2 py-1 pl-4 pr-4 text-lg font-bold text-gray-900">
        <h3 className="grow px-4">To Do</h3>
        <BoardActions />
      </div>
      <ScrollContainer>
        <div className=" flex flex-col gap-4 overflow-hidden font-bold text-gray-900">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="flex flex-col gap-1">
                <h3>{card.title}</h3>

                {card.bages && (
                  <div className="flex justify-start gap-2">
                    {card.bages.map((bage) => (
                      <Bage key={bage.id} {...bage} />
                    ))}
                  </div>
                )}
                {card.subTitle.length > 0 && (
                  <p className="text-base font-normal text-gray-600">
                    {card.subTitle}
                  </p>
                )}
              </div>

              {card.items.length > 0 && (
                <AvatarGroup
                  items={card.items}
                  size="sm"
                  counter={5}
                  canAddedUser
                />
              )}

              {card?.timeStamp && (
                <div className="flex items-center justify-between text-base font-medium text-gray-600">
                  <div className="flex items-center gap-2">
                    <BaseIcon
                      source="general"
                      icon="clock"
                      size="normal"
                      className="text-gray-400"
                    />
                    <span>{card.timeStamp.toDateString()}</span>
                  </div>
                  {card.attachments && (
                    <div className="flex items-center gap-2">
                      <BaseIcon
                        source="general"
                        icon="attachment"
                        size="normal"
                        className="text-gray-400"
                      />
                      <span>5</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollContainer>
      <AddEntity
        editable={isEditable}
        onReset={handleReset}
        onSubmit={handleSubmit}
        onChange={handleChange}
        value={value}
        buttonCaption="Add Card"
      />
    </div>
  );
};
