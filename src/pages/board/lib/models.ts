import { TCard } from "entities/board/lib/models";

export type TBoard = {
  id: number;
  cards: TCard[];
  title?: string;
};
