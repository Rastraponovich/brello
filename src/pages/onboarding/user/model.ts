import { attach, combine, createEffect, createEvent, createStore, sample } from "effector";
import { and, not } from "patronum";
import type { ChangeEvent, FormEvent } from "react";

import { routes } from "~/shared/routing";

import { inputReducer, validateName } from "./utils";

type UserName = {
  firstName: string;
  lastName: string;
};

export const currentRoute = routes.onboarding.user;

/**
 * mock api
 */
const profileUpdateFx = createEffect<UserName, boolean>(() => true);

export const skipButtonClicked = createEvent();
export const formSubmitted = createEvent<FormEvent<HTMLFormElement>>();

export const firstNameChanged = createEvent<ChangeEvent<HTMLInputElement>>();
export const lastNameChanged = createEvent<ChangeEvent<HTMLInputElement>>();

export const $firstName = createStore<string | null>(null);
export const $lastName = createStore<string | null>(null);

export const $isEmptyFirstName = $firstName.map(validateName);
export const $isEmptyLastName = $lastName.map(validateName);

const $profile = combine($firstName, $lastName, (firstName, lastName) => {
  return { firstName, lastName };
});

const attachedProfileUpdateFx = attach({
  effect: profileUpdateFx,
  source: $profile,
  mapParams(_, { firstName, lastName }) {
    return { firstName: firstName ?? "", lastName: lastName ?? "" };
  },
});

/**
 * @todo Fix dirty
 */
formSubmitted.watch((event) => event.preventDefault());

$firstName.on(firstNameChanged, inputReducer);
$lastName.on(lastNameChanged, inputReducer);

sample({
  clock: formSubmitted,
  filter: not(and($isEmptyFirstName, $isEmptyLastName)),
  target: attachedProfileUpdateFx,
});

sample({
  clock: skipButtonClicked,
  target: routes.workspace.boards.open,
});
