import { TCard } from "~/entities/stack/model";

import { routes } from "~/shared/routing";

export type TBoard = {
  id: number;
  cards: TCard[];
  title?: string;
};

export const currentRoute = routes.board.board;
