import { RouteQuery } from "atomic-router";
import { createEffect, createEvent, createStore, sample } from "effector";
import { ChangeEvent } from "react";

import { routes } from "~/shared/routing/routing";

const getBoardByIdFx = createEffect<void, { name: string; users: string[] }>(() => {
  return {
    name: "board",
    users: ["privet@medved.ru", "eto_to@koko.ru", "foo@bar.mz", "raz@dva.tri"],
  };
});

const deleteBoardByIdFx = createEffect<void, boolean>(() => true);

export const $pageOpenned = createStore<boolean>(false).on(
  routes.board.settings.$isOpened,
  (_, isOpened) => isOpened,
);

sample({
  clock: $pageOpenned,
  target: getBoardByIdFx,
});

export const $params = createStore<object | null>(null).on(
  routes.board.settings.$params,
  (_, params) => params,
);

export const $query = createStore<RouteQuery | null>(null).on(
  routes.board.settings.$query,
  (_, query) => query,
);

export const $boardInvites = createStore<string[]>([]).on(
  getBoardByIdFx.doneData,
  (_, response) => response.users,
);

export const deletedBoardButtonClicked = createEvent();

sample({
  clock: deletedBoardButtonClicked,
  target: deleteBoardByIdFx,
});

export const changedNewEmail = createEvent<ChangeEvent<HTMLInputElement>>();
const setNewEmail = createEvent<string>();

export const $newEmail = createStore<string>("").on(setNewEmail, (_, email) => email);

sample({
  clock: changedNewEmail,
  fn: (event) => event.target.value,
  target: setNewEmail,
});

export const addEmailButtonClicked = createEvent();

sample({
  clock: addEmailButtonClicked,
  source: { emails: $boardInvites, newEmail: $newEmail },
  filter: ({ emails, newEmail }, _) =>
    newEmail.length > 0 && emails.every((item) => item !== newEmail),
  fn: ({ emails, newEmail }, _) => [...emails, newEmail],

  target: $boardInvites,
});

$newEmail.reset($boardInvites);

export const deleteEmailButtonClicked = createEvent<string>();

sample({
  clock: deleteEmailButtonClicked,
  source: $boardInvites,
  filter: (emails, email) => emails.some((item) => item === email),
  fn: (emails, email) => {
    const condition = emails.find((item) => item === email);

    if (condition) {
      return emails.filter((item) => item !== email);
    }

    return emails;
  },
  target: $boardInvites,
});

export const boardNameChanged = createEvent<ChangeEvent<HTMLInputElement>>();

const setBoardName = createEvent<string>();

sample({
  clock: boardNameChanged,
  fn: (event) => event.target.value,
  target: setBoardName,
});

export const $boardName = createStore<string>("")
  .on(getBoardByIdFx.doneData, (_, response) => response.name)
  .on(setBoardName, (_, name) => name);
