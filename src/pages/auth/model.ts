import { attach, createEvent, createStore, sample } from "effector";
import { debug, reset } from "patronum";
import type { ChangeEvent, FormEvent } from "react";
import { routes } from "shared/routing";
import { api } from "shared/api";

const EMAIL_PATTERN = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
const validateEmail = new RegExp(EMAIL_PATTERN);

export const changedEmail = createEvent<ChangeEvent<HTMLInputElement>>();
export const $emailField = createStore<Email>("").on(
  changedEmail,
  (_, event) => {
    return event.target.value;
  },
);

export const submitted = createEvent<FormEvent<HTMLFormElement>>();
submitted.watch((e) => e.preventDefault());

const signInWithEmailFx = attach({
  source: $emailField,
  effect: api.auth.signInWithEmailFx,
  mapParams: (_, email) => {
    return { email };
  },
});

sample({
  clock: submitted,
  filter: (email) => !!email,
  target: signInWithEmailFx,
});

/**
 * pending state when clicked signin
 */
export const $isPendning = createStore<boolean>(false).on(
  signInWithEmailFx.pending,
  (_, pending) => pending,
);
export const $isValidEmail = createStore<boolean>(false);

sample({
  clock: $emailField,
  fn: (email) => validateEmail.test(email),
  target: $isValidEmail,
});

/**
 * array of Errors to display in input
 */
export const $errors = createStore<
  { text: string; type: string; id: string }[]
>([]);

sample({
  clock: $isValidEmail,
  source: $errors,
  filter: (_, isValid) => !isValid,

  fn: (errors, isValid) => {
    const errorIsExist = errors.find((error) => error.id === "emailValidation");

    if (!isValid && !errorIsExist) {
      return [
        ...errors,
        {
          text: "Please enter a valid email address",
          type: "invalid",
          id: "emailValidation",
        },
      ];
    }

    return errors;
  },

  target: $errors,
});

sample({
  clock: $isValidEmail,
  filter: (validEmail) => validEmail,
  target: reset({ target: $errors }),
});

debug(signInWithEmailFx.done, signInWithEmailFx.doneData);

export const skipButtonClicked = createEvent();

sample({
  clock: skipButtonClicked,
  target: routes.boards.open,
});
