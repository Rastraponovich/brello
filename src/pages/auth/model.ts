import { createEvent, createStore, sample } from "effector";
import { ChangeEvent, FormEvent } from "react";
import { routes } from "src/shared/routing";

export const changedEmail = createEvent<ChangeEvent<HTMLInputElement>>();
export const $emailField = createStore<null | string>(null).on(
  changedEmail,
  (_, event) => {
    return event.target.value;
  },
);

export const submitted = createEvent<FormEvent<HTMLFormElement>>();
submitted.watch((e) => e.preventDefault());

export const $isValid = createStore<boolean>(false);

sample({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  clock: $emailField,
  filter: (value) => !!value,
  fn: (value) => value?.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/),
  target: $isValid,
});

export const skipButtonClicked = createEvent();

sample({
  clock: skipButtonClicked,
  target: routes.boards.open,
});
