import { attach, combine, createEvent, createStore, restore, sample } from "effector";
import { pending } from "patronum";

import { api } from "~/shared/api";
import { routes } from "~/shared/routing";

import { ErrorCode, ErrorTextMap } from "./constants";
import { validateEmail } from "./utils";

export const currentRoute = routes.auth.signIn;

export type SignInError = "InvalidEmail" | "RateLimit" | "UnknownError";

export const submitted = createEvent();
export const signInWithGoogle = createEvent();
export const backButtonClicked = createEvent();
export const changedEmail = createEvent<string>();

const signInWithGoogleFx = attach({
  effect: api.auth.signInWithGoogleFx,
});

const signInFx = attach({
  effect: api.auth.signInWithEmailFx,
});

/**
 * when api response error
 */
export const $errorCode = createStore<number | null>(null);

export const $error = combine($errorCode, (errorCode) => {
  if (!errorCode) {
    return null;
  }

  return ErrorTextMap.get(errorCode === 429 ? ErrorCode.RateLimit : ErrorCode.UnknownError);
});

/**
 * email state
 */
export const $email = restore(changedEmail, "");

/**
 * when api response ok
 */
export const $isFinished = createStore<boolean>(false)
  .on(signInFx.done, () => true)
  .reset(signInFx.fail);

/**
 * pending state when clicked signin
 */
export const $isPendning = pending({
  effects: [signInWithGoogleFx, signInFx],
});

/**
 * validate email state
 */
export const $isValidEmail = combine($email, validateEmail);

/**
 * stringify error
 */
export const $invalidEmailText = combine($isValidEmail, (isValid) =>
  !isValid ? ErrorTextMap.get(ErrorCode.InvalidEmail) : null,
);

sample({
  clock: submitted,
  source: { email: $email },
  filter: $isValidEmail,
  target: [signInFx, $errorCode.reinit],
});

sample({
  clock: signInFx.failData,
  fn: (error) => error.status ?? null,
  target: $errorCode,
});

sample({
  clock: backButtonClicked,
  target: [$email.reinit, $errorCode.reinit, $isFinished.reinit],
});

sample({
  clock: signInWithGoogle,
  target: signInWithGoogleFx,
});
