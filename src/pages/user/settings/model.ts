import { attach, combine, createEvent, restore, sample } from "effector";

import { api } from "~/shared/api";
import { Profile } from "~/shared/api/rest/user";
import { controls, routes } from "~/shared/routing";
import { $viewer, chainAuthenticated } from "~/shared/viewer";

export const currentRoute = routes.user;

export const authenticatedRoute = chainAuthenticated(currentRoute, {
  otherwise: routes.auth.signIn.open,
});

const profileGetFx = attach({
  effect: api.user.profileGetFx,
  source: $viewer,
  mapParams(_, viewer) {
    return {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      user_id: viewer!.id,
    };
  },
});

const profileUpdateFx = attach({
  effect: api.user.profileUpdateFx,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  mapParams: (profile: Partial<Profile>) => {
    return {
      ...profile,
      firstName: profile.first_name,
      lastName: profile.last_name,
    };
  },
});

export const profileUpdate = createEvent();
export const resetButtonClicked = createEvent();
export const firstNameChanged = createEvent<string>();
export const lastNameChanged = createEvent<string>();

const $profileLoaded = restore(profileGetFx.doneData, null);

export const $firstName = restore(firstNameChanged, "").on(
  profileGetFx.doneData,
  (_, { first_name }) => first_name ?? "",
);

export const $lastName = restore(lastNameChanged, "").on(
  profileGetFx.doneData,
  (_, { last_name }) => last_name ?? "",
);

const $profile = combine($profileLoaded, $firstName, $lastName, (profile, firstName, lastName) => ({
  ...profile,
  first_name: firstName,
  last_name: lastName,
}));

export const $avatarName = combine($firstName, $lastName, (firstName, lastName) => ({
  firstName: firstName.charAt(0),
  lastName: lastName.charAt(0),
}));

sample({
  clock: authenticatedRoute.opened,
  target: profileGetFx,
});

sample({
  clock: resetButtonClicked,
  target: controls.back,
});

sample({
  clock: profileUpdate,
  source: $profile,
  target: profileUpdateFx,
});
