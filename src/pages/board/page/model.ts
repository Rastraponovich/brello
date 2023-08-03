import { TCard } from "entities/stack/model";

export type TBoard = {
  id: number;
  cards: TCard[];
  title?: string;
};
