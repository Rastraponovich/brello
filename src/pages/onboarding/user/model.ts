import { attach, createEvent, createStore, sample } from "effector";
import { not } from "patronum";
import type { ChangeEvent, FormEvent } from "react";

import { api } from "~/shared/api";
import { Tables } from "~/shared/api/client";
import { routes } from "~/shared/routing";
import { $viewer, chainAunthenticated } from "~/shared/viewer/model";

import { inputReducer, validateName } from "./utils";

export const currentRoute = routes.onboarding.user;

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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return { id: user!.id, firstName: firstName ?? "", lastName: lastName ?? "" };
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

export const authenticatedRoute = chainAunthenticated(currentRoute, {
  otherwise: routes.auth.signIn.open,
});

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

/**
 * @todo Fix dirty
 */
formSubmitted.watch((event) => event.preventDefault());

$firstName.on(firstNameChanged, inputReducer);
$lastName.on(lastNameChanged, inputReducer);

// write profile to store when data is available
$profile.on(profileExistsFx.doneData, (_, profile) => profile);

// set existing profile flag
$profileExists.on(profileExistsFx.doneData, (_, profile) => !!profile);

// route opened -> profile exists -> profileFx
sample({
  clock: authenticatedRoute.opened,
  source: $viewer,
  filter: (viewer) => !!viewer,
  target: profileExistsFx,
});

// profile exists set inputs fields
$firstName.on(profileExistsFx.doneData, (firstName, profile) => {
  return profile ? profile.first_name : firstName;
});

// profile exists set inputs fields
$lastName.on(profileExistsFx.doneData, (lastName, profile) => {
  return profile ? profile.last_name : lastName;
});

// submit form if profile exist
sample({
  clock: formSubmitted,
  source: { firstName: $firstName, lastName: $lastName, profile: $profile },
  filter: $profileExists,
  fn: ({ firstName, lastName, profile }) => ({ firstName, lastName, id: profile?.id }),
  target: profileUpdateFx,
});

// submit if profile not exist
sample({
  clock: formSubmitted,
  source: { firstName: $firstName, lastName: $lastName },
  filter: not($profileExists),
  target: profileCreateFx,
});

sample({
  clock: skipButtonClicked,
  target: routes.onboarding.workspace.open,
});

//unhappy path
profileUpdateFx.fail.watch(console.log);
