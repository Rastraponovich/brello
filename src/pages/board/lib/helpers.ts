import { CARDS } from "src/entities/board/lib/helpers";
import { TBoard } from "./models";

export const BOARDS: TBoard[] = [
  { id: 1, cards: CARDS },
  { id: 2, cards: CARDS },
  { id: 3, cards: CARDS },
  { id: 4, cards: [] },
];
