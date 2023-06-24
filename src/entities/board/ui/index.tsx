import { AddAvatarButton, AvatarGroup } from "src/shared/ui/avatar";
import { IAvatarBlockProps, TBoard } from "../lib";
import { memo, useCallback, useState } from "react";
import { Bage } from "src/shared/ui/bage";
import { Button } from "src/shared/ui/button";
import { InputArea } from "src/shared/ui/input";

const BoardActions = () => {
  return (
    <div className="flex gap-3">
      <BottomDotsIcon />
      <PlusCircle />
    </div>
  );
};

export const BoardList = () => {
  const [isEditable, setIsEditable] = useState(false);

  const handleSetEdit = useCallback(() => setIsEditable((prev) => !prev), []);

  const cards: TBoard[] = [
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
  ];
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-[#FCFCFD] p-4">
      <div className="flex items-center gap-2 py-1 pl-4 text-lg font-bold text-gray-900">
        <h3 className="grow">To Do</h3>
        <BoardActions />
      </div>
      {/* cardlist */}
      <div className="flex max-h-[300px] flex-col overflow-hidden">
        <div className="no-scrollbar  flex flex-col gap-4 overflow-y-auto  font-bold text-gray-900">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5"
            >
              <h3>{card.title}</h3>

              {card.bages && (
                <div className="flex justify-start gap-2 py-1.5">
                  {card.bages.map((bage) => (
                    <Bage key={bage.id} {...bage} />
                  ))}
                </div>
              )}
              {card.subTitle.length > 0 && (
                <p className="mt-1 text-base font-normal text-gray-600">
                  {card.subTitle}
                </p>
              )}
              {card.items.length > 0 && (
                <AvatarBlock items={card.items} size={"sm"} />
              )}
              {card?.timeStamp && (
                <div className="mt-5 flex items-center justify-between text-base font-medium text-gray-600">
                  <div className="flex gap-2">
                    <ClockIcon />
                    <span>{card.timeStamp.toDateString()}</span>
                  </div>
                  {card.attachments && (
                    <div className="flex items-center gap-2">
                      <AttachmentIcon />
                      <span>5</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <BoardBottomActions edit={isEditable} onEdit={handleSetEdit} />
    </div>
  );
};

interface IBoardBottomActionProps {
  edit?: boolean;
  onEdit?(): void;
}
const BoardBottomActions = memo<IBoardBottomActionProps>(({ edit, onEdit }) => {
  return (
    <div className="flex flex-col gap-1.5 bg-white">
      {edit && <InputArea />}
      <div className="flex items-center gap-2">
        <Button
          variant={edit ? "primary" : "link"}
          size="md"
          onClick={onEdit}
          leftIcon={<PlusCircle />}
          className="grow"
        >
          Add card
        </Button>
        {edit && <Button>X</Button>}
      </div>
    </div>
  );
});
BoardBottomActions.displayName = "BoardBottomActions";

const AvatarBlock = memo<IAvatarBlockProps>(({ size = "sm", items }) => {
  return (
    <div className="mt-5 flex items-center gap-2">
      <AvatarGroup
        items={items}
        size={size}
        itemClassName="border-[1.5px] border-white"
        counter={5}
      />
      <AddAvatarButton size={size} />
    </div>
  );
});
AvatarBlock.displayName = "AvatarBlock";

const ClockIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1812_12875)">
        <path
          d="M9.99996 5V10L13.3333 11.6667M18.3333 10C18.3333 14.6024 14.6023 18.3333 9.99996 18.3333C5.39759 18.3333 1.66663 14.6024 1.66663 10C1.66663 5.39763 5.39759 1.66667 9.99996 1.66667C14.6023 1.66667 18.3333 5.39763 18.3333 10Z"
          stroke="#98A2B3"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1812_12875">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const AttachmentIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5834 4.37984V13.75C14.5834 16.2813 12.5313 18.3333 10 18.3333C7.46872 18.3333 5.41669 16.2813 5.41669 13.75V4.72221C5.41669 3.03468 6.78471 1.66666 8.47224 1.66666C10.1598 1.66666 11.5278 3.03468 11.5278 4.72221V13.7048C11.5278 14.5485 10.8438 15.2325 10 15.2325C9.15625 15.2325 8.47224 14.5485 8.47224 13.7048V5.54263"
        stroke="#98A2B3"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const BottomDotsIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.99996 10.8333C10.4602 10.8333 10.8333 10.4602 10.8333 9.99998C10.8333 9.53974 10.4602 9.16665 9.99996 9.16665C9.53972 9.16665 9.16663 9.53974 9.16663 9.99998C9.16663 10.4602 9.53972 10.8333 9.99996 10.8333Z"
        stroke="#98A2B3"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99996 4.99998C10.4602 4.99998 10.8333 4.62688 10.8333 4.16665C10.8333 3.70641 10.4602 3.33331 9.99996 3.33331C9.53972 3.33331 9.16663 3.70641 9.16663 4.16665C9.16663 4.62688 9.53972 4.99998 9.99996 4.99998Z"
        stroke="#98A2B3"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99996 16.6666C10.4602 16.6666 10.8333 16.2935 10.8333 15.8333C10.8333 15.3731 10.4602 15 9.99996 15C9.53972 15 9.16663 15.3731 9.16663 15.8333C9.16663 16.2935 9.53972 16.6666 9.99996 16.6666Z"
        stroke="#98A2B3"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const PlusCircle = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_13_31926)">
        <path
          d="M9.99996 6.66669V13.3334M6.66663 10H13.3333M18.3333 10C18.3333 14.6024 14.6023 18.3334 9.99996 18.3334C5.39759 18.3334 1.66663 14.6024 1.66663 10C1.66663 5.39765 5.39759 1.66669 9.99996 1.66669C14.6023 1.66669 18.3333 5.39765 18.3333 10Z"
          stroke="#98A2B3"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_13_31926">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
