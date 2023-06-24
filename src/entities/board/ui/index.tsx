import { AddAvatarButton, AvatarGroup } from "src/shared/ui/avatar";
import { IAvatarBlockProps, TBoard } from "../lib";
import { memo } from "react";

export const BoardList = () => {
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
    },
  ];
  return (
    <div className="flex flex-col gap-4 rounded-2xl  p-4">
      <div className="flex gap-2 py-1 pl-4 text-lg font-bold text-gray-900">
        <h3>To Do</h3>
        <div className="flex gap-1"></div>
      </div>
      {/* cardlist */}
      <div className="flex flex-col gap-4 bg-[#FCFCFD] font-bold text-gray-900">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5"
          >
            <h3>{card.title}</h3>
            {card.subTitle.length > 0 && (
              <p className="mt-1 text-base font-normal text-gray-600">
                {card.subTitle}
              </p>
            )}
            {card.items.length > 0 && (
              <AvatarBlock items={card.items} size={"sm"} />
            )}
            {card?.timeStamp && (
              <div className="mt-5 flex items-center gap-2 text-base font-medium text-gray-600">
                <ClockIcon />
                <span>{card.timeStamp.toDateString()}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

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
