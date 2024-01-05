import type { RouteQuery } from "atomic-router";
import { attach, createEvent, createStore, sample } from "effector";
import { reset } from "patronum";

import { api } from "~/shared/api";
import { routes } from "~/shared/routing";
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
  mapParams(_, params) {
    // eslint-disable-next-line  @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return { id: params.id };
  },
});

export const nameChanged = createEvent<string>();
export const emailChanged = createEvent<string>();
export const addEmailButtonClicked = createEvent();
export const deletedBoardButtonClicked = createEvent();
export const backgroundColorChanged = createEvent<string>();
export const deleteEmailButtonClicked = createEvent<string>();

export const $email = createStore("");
export const $title = createStore("");
export const $pageOpenned = createStore(false);
export const $invites = createStore<string[]>([]);
export const $background = createStore("bg-white");
export const $params = createStore<object | null>(null);
export const $query = createStore<RouteQuery | null>(null);

$email.on(emailChanged, (_, email) => email);
$title.on(nameChanged, (_, name) => name);
$query.on(authenticatedRoute.$query, (_, query) => query);
$background.on(backgroundColorChanged, (_, color) => color);
$params.on(authenticatedRoute.$params, (_, params) => params);
$title.on(boardGetFx.doneData, (_, board) => board?.title ?? "");
$background.on(boardGetFx.doneData, (_, board) => board?.background_color ?? "bg-white");

$pageOpenned.on(routes.board.settings.$isOpened, (_, isOpened) => isOpened);

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
  fn: ({ params }): { id: string } => ({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    id: params.id,
  }),
  target: boardGetFx,
});

reset({
  clock: boardGetFx.done,
  target: [$email, $title, $invites],
});

sample({
  clock: boardDeleteFx.done,
  target: routes.workspace.boards.open,
});

$email.reset($invites);
