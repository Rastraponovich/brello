import type { TCard } from "./model";

export const _CARDS_: TCard[] = [
  {
    id: 1,
    title: "Product Designer",
    subTitle: "",
    users: [],
  },
  {
    id: 2,
    title: "Product Designer",
    subTitle: "We’re looking for a mid-level product designer to join our team.",
    users: [],
  },
  {
    id: 3,
    title: "Product Designer",
    subTitle: "We’re looking for a mid-level product designer to join our team.",
    users: [
      { id: 1, firstName: "Харитон", lastName: "Захаров" },
      { id: 2, firstName: "Павел", lastName: "Воля" },
      { id: 3, firstName: "Сергей", lastName: "Сечинов" },
    ],
  },
  {
    id: 4,
    title: "Product Designer",
    subTitle: "We’re looking for a mid-level product designer to join our team.",
    users: [
      { id: 1, firstName: "Mark", lastName: "Twen" },
      { id: 2, firstName: "Leon", lastName: "Kennedy" },
      { id: 3, firstName: "Kyle", lastName: "Broflovsky" },
    ],
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
