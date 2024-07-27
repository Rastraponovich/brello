import { attach, combine, createEvent, restore, sample } from "effector";
import { not } from "patronum";

import { api } from "~/shared/api";
import { routes } from "~/shared/routing";
import { $viewer, chainAuthenticated } from "~/shared/viewer";

import { validateName } from "./utils";

export const currentRoute = routes.onboarding.user;

const profileUpdateFx = attach({
  effect: api.user.profileUpdateFx,
});

const profileCreateFx = attach({
  effect: api.user.profileCreateFx,
  source: $viewer,
  mapParams({ firstName, lastName }, viewer) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return { id: viewer!.id, firstName, lastName };
  },
});

const profileExistsFx = attach({
  effect: api.user.profileExistsFx,
  source: $viewer,
  mapParams(_, viewer) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return { userId: viewer!.id };
  },
});

export const authenticatedRoute = chainAuthenticated(currentRoute, {
  otherwise: routes.auth.signIn.open,
});

export const formSubmitted = createEvent();
export const skipButtonClicked = createEvent();

export const lastNameChanged = createEvent<string>();
export const firstNameChanged = createEvent<string>();

export const $lastName = restore(lastNameChanged, "");
export const $firstName = restore(firstNameChanged, "");

const $profile = restore(profileExistsFx.doneData, null);
const $profileExists = combine($profile, Boolean);

export const $isEmptyLastName = combine($lastName, validateName);
export const $isEmptyFirstName = combine($firstName, validateName);

// route opened -> profile exists -> profileFx
sample({
  clock: authenticatedRoute.opened,
  source: $viewer,
  filter: (viewer) => !!viewer,
  target: profileExistsFx,
});

// profile exists set inputs fields
$firstName.on(profileExistsFx.doneData, (firstName, profile) => {
  if (profile) {
    return profile.first_name ?? firstName;
  }
  return firstName;
});

// profile exists set inputs fields
$lastName.on(profileExistsFx.doneData, (lastName, profile) => {
  if (profile) {
    return profile.last_name ?? lastName;
  }
  return lastName;
});

// submit form if profile exist
sample({
  clock: formSubmitted,
  source: { firstName: $firstName, lastName: $lastName, profile: $profile },
  filter: $profileExists,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  fn: ({ firstName, lastName, profile }) => ({ firstName, lastName, id: profile!.id }),
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
  clock: [skipButtonClicked, profileUpdateFx.doneData],
  target: routes.onboarding.workspace.open,
});
