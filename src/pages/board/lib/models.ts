import { TCard } from "src/entities/board/lib/models";

export type TBoard = {
  id: number;
  cards: TCard[];
  title?: string;
};
