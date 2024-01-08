import type { RouteQuery } from "atomic-router";
import { attach, combine, createEvent, createStore, sample } from "effector";
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

export const $email = createStore("");
export const $title = createStore("");
export const $bgImage = createStore("");
export const $pageOpenned = createStore(false);
export const $invites = createStore<string[]>([]);
export const $background = createStore("bg-white");
export const $params = createStore<object | null>(null);
export const $query = createStore<RouteQuery | null>(null);

$title.on(nameChanged, (_, name) => name);
$email.on(emailChanged, (_, email) => email);
$query.on(authenticatedRoute.$query, (_, query) => query);
$background.on(backgroundColorChanged, (_, color) => color);
$params.on(authenticatedRoute.$params, (_, params) => params);
$title.on(boardGetFx.doneData, (_, board) => board?.title ?? "");
$pageOpenned.on(routes.board.settings.$isOpened, (_, isOpened) => isOpened);
$bgImage.on(bgImageChanged, (current, image) => (current === image ? "" : image));
$background.on(boardGetFx.doneData, (_, board) => board?.background_color ?? "bg-white");

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
  filter: ({ emails, email }, _) => email.length > 0 && emails.every((item) => item !== email),
  fn: ({ emails, email }, _) => [...emails, email],

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

$email.reset($invites);

sample({
  clock: sumbitButtonClicked,
  source: $board,
  target: boardUpdateFx,
});

sample({
  clock: backButtonClicked,
  target: controls.back,
});
