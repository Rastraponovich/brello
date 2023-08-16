import { attach, createEvent, createStore, sample } from "effector";
import { debug, not } from "patronum";
import type { ChangeEvent, FormEvent } from "react";

import { api } from "~/shared/api";
import { Tables } from "~/shared/api/client";
import { routes } from "~/shared/routing";
import { $viewer, chainAunthenticated } from "~/shared/viewer/model";

import { inputReducer, validateName } from "./utils";

export const currentRoute = routes.onboarding.user;

/**
 * mock api
 */
const profileUpdateFx = attach({
  effect: api.user.updateProfileFx,
  mapParams({ firstName, lastName, id }) {
    return { firstName: firstName ?? "", lastName: lastName ?? "", id };
  },
});

const profileCreateFx = attach({
  effect: api.user.profileCreateFx,
  source: $viewer,
  mapParams({ firstName, lastName }, user) {
    return { id: user?.id, firstName: firstName ?? "", lastName: lastName ?? "" };
  },
});

const profileExistsFx = attach({
  effect: api.user.profileExistsFx,
  source: $viewer,
  mapParams(_, user) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return { id: user!.id };
  },
});

const authenticatedRoute = chainAunthenticated(currentRoute);

export const skipButtonClicked = createEvent();
export const formSubmitted = createEvent<FormEvent<HTMLFormElement>>();

export const firstNameChanged = createEvent<ChangeEvent<HTMLInputElement>>();
export const lastNameChanged = createEvent<ChangeEvent<HTMLInputElement>>();

export const $firstName = createStore<string | null>(null);
export const $lastName = createStore<string | null>(null);

const $profileExists = createStore(false);

const $profile = createStore<Tables<"profiles"> | null>(null);

export const $isEmptyFirstName = $firstName.map(validateName);
export const $isEmptyLastName = $lastName.map(validateName);

debug(profileUpdateFx, formSubmitted);

/**
 * @todo Fix dirty
 */
formSubmitted.watch((event) => event.preventDefault());

$firstName.on(firstNameChanged, inputReducer);
$lastName.on(lastNameChanged, inputReducer);

$profile.on(profileExistsFx.doneData, (_, profile) => profile);

$profileExists.on(profileExistsFx.doneData, (_, profile) => !!profile);

sample({
  clock: authenticatedRoute.opened,
  source: $viewer,
  filter: (viewer) => !!viewer,
  target: profileExistsFx,
});

$firstName.on(profileExistsFx.doneData, (firstName, profile) => {
  if (profile) {
    return profile.first_name;
  }

  return firstName;
});

$lastName.on(profileExistsFx.doneData, (lastName, profile) => {
  if (profile) {
    return profile.last_name;
  }

  return lastName;
});

//profile exist
sample({
  clock: formSubmitted,
  source: { firstName: $firstName, lastName: $lastName, profile: $profile },
  filter: $profileExists,
  fn: ({ firstName, lastName, profile }) => {
    return {
      firstName,
      lastName,
      id: profile?.id,
    };
  },
  target: profileUpdateFx,
});

//profile not exist

sample({
  clock: formSubmitted,
  source: { firstName: $firstName, lastName: $lastName },
  filter: not($profileExists),
  fn: (profile) => profile,
  target: profileCreateFx,
});

sample({
  clock: skipButtonClicked,
  target: routes.onboarding.workspace.open,
});

//unhappy path
profileUpdateFx.fail.watch(console.log);
