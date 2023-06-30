import { TCard } from "./models";

export const CARDS: TCard[] = [
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
