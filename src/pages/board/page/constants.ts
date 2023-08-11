import { _CARDS_ } from "~/entities/stack/constants";

import { TBoard } from "./model";

export const _BOARDS_: TBoard[] = [
  { id: 1, cards: _CARDS_, title: "board #1" },
  { id: 2, cards: _CARDS_, title: "board #2" },
  { id: 3, cards: _CARDS_, title: "board #3" },
  { id: 4, cards: [], title: "board #4" },
];

export const _AVATARS_ = [
  {
    id: 1,
    photo: "images/Image.png",
    firstName: "Habal",
    lastName: "Habalych",
  },
  {
    id: 3,
    photo: "images/Image.png",
    firstName: "John",
    lastName: "Travolta",
  },
  {
    id: 2,
    photo: "images/Image.png",
    firstName: "Edvard",
    lastName: "Calin",
  },
  {
    id: 5,
    photo: "images/Image.png",
    firstName: "Timber",
    lastName: "Saw",
  },
  {
    id: 4,
    photo: "images/Image.png",
    firstName: "Keth",
    lastName: "Flint",
  },
];
