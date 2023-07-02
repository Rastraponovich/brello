import { CARDS } from "src/entities/board/lib/helpers";
import { TBoard } from "./models";

export const BOARDS: TBoard[] = [
  { id: 1, cards: CARDS, title: "board #1" },
  { id: 2, cards: CARDS, title: "board #2" },
  { id: 3, cards: CARDS, title: "board #3" },
  { id: 4, cards: [], title: "board #4" },
];
