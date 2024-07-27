import { attach, combine, createEvent, createStore, restore, sample } from "effector";
import { pending, reset } from "patronum";

import { api } from "~/shared/api";
import { Board } from "~/shared/api/rest/board";
import { controls, routes } from "~/shared/routing";
import { chainAuthenticated } from "~/shared/viewer";

export const currentRoute = routes.board.settings;

export const authenticatedRoute = chainAuthenticated(currentRoute, {
  otherwise: routes.auth.signIn.open,
});

const boardGetFx = attach({
  effect: api.board.getBoardSettingsFx,
});

const boardDeleteFx = attach({
  effect: api.board.deleteBoardFx,
  source: authenticatedRoute.$params,
  mapParams: (_, params) => params,
});

const boardUpdateFx = attach({
  effect: api.board.updateBoardFx,
  source: authenticatedRoute.$params,
  mapParams: (board: Partial<Board>, params) => ({
    ...board,
    id: params.id,
  }),
});

export const backButtonClicked = createEvent();
export const nameChanged = createEvent<string>();
export const sumbitButtonClicked = createEvent();
export const emailChanged = createEvent<string>();
export const addEmailButtonClicked = createEvent();
export const bgImageChanged = createEvent<string>();
export const deletedBoardButtonClicked = createEvent();
export const backgroundColorChanged = createEvent<string>();
export const deleteEmailButtonClicked = createEvent<string>();

export const $bgImage = createStore("").on(bgImageChanged, (current, image) =>
  current === image ? "" : image,
);

export const $title = restore(nameChanged, "").on(
  boardGetFx.doneData,
  (_, board) => board?.title ?? "",
);

export const $invites = createStore<string[]>([]);

export const $email = restore(emailChanged, "").reset($invites);

export const $params = combine(authenticatedRoute.$params);
export const $pageOpenned = combine(routes.board.settings.$isOpened);

export const $query = combine(authenticatedRoute.$query);

export const $background = restore(backgroundColorChanged, "bg-white").on(
  boardGetFx.doneData,
  (_, board) => board?.background_color ?? "bg-white",
);

export const $pending = pending({
  effects: [boardDeleteFx, boardUpdateFx, boardGetFx],
});

const $board = combine({
  title: $title,
  background_image: $bgImage,
  background_color: $background,
});

sample({
  clock: deletedBoardButtonClicked,
  target: boardDeleteFx,
});

sample({
  clock: addEmailButtonClicked,
  source: { emails: $invites, email: $email },
  filter: ({ emails, email }) => email.length > 0 && emails.every((item) => item !== email),
  fn: ({ emails, email }) => [...emails, email],

  target: $invites,
});

sample({
  clock: deleteEmailButtonClicked,
  source: $invites,
  filter: (emails, email) => emails.some((item) => item === email),
  fn: (emails, email) => {
    const condition = emails.find((item) => item === email);

    if (condition) {
      return emails.filter((item) => item !== email);
    }

    return emails;
  },
  target: $invites,
});

sample({
  clock: authenticatedRoute.opened,
  fn: ({ params }) => params,
  target: boardGetFx,
});

reset({
  clock: boardGetFx.done,
  target: [$email, $title, $invites],
});

sample({
  clock: [boardDeleteFx.done, boardUpdateFx.done],
  target: routes.workspace.boards.open,
});

sample({
  clock: sumbitButtonClicked,
  source: $board,
  target: boardUpdateFx,
});

sample({
  clock: backButtonClicked,
  target: controls.back,
});
