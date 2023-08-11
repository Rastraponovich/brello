import { attach, createEvent, createStore, sample } from "effector";
import { not, pending } from "patronum";
import type { ChangeEvent, FormEvent } from "react";

import { api } from "shared/api";

import { validateEmail } from "./utils";

export type SignInError = "InvalidEmail" | "RateLimit" | "UnknownError";

export const changedEmail = createEvent<ChangeEvent<HTMLInputElement>>();
export const submitted = createEvent<FormEvent<HTMLFormElement>>();
export const signInWithGoogle = createEvent();
export const backButtonClicked = createEvent();

const signInWithGoogleFx = attach({
  effect: api.auth.signInWithGoogleFx,
});

const signInFx = attach({
  effect: api.auth.signInWithEmailFx,
});

/**
 * @todo Fix
 */
submitted.watch((e) => e.preventDefault());

/**
 * email state
 */
export const $email = createStore<Email | null>(null);

/**
 * pending state when clicked signin
 */
// export const $isPendning = signInFx.pending;

export const $isPendning = pending({
  effects: [signInWithGoogleFx, signInFx],
  of: "some",
});

/**
 * validate email state
 */
export const $isValidEmail = $email.map(validateEmail);

/**
 * when api response ok
 */
export const $isFinished = createStore<boolean>(false);

/**
 * when api response error
 */
export const $error = createStore<SignInError | null>(null);

/**
 * stringify error
 */
export const $invalidEmailText = createStore<SignInError | null>(null);

$email.on(changedEmail, (_, event) => event.target.value);

sample({
  clock: submitted,
  source: { email: $email },
  filter: $isValidEmail,
  target: [signInFx, $error.reinit, $invalidEmailText.reinit],
});

// error email handlers
sample({
  clock: $email,
  filter: not($isValidEmail),
  fn: (): SignInError => "InvalidEmail",
  target: $invalidEmailText,
});

sample({
  clock: $isValidEmail,
  filter: $isValidEmail,
  target: [$invalidEmailText.reinit],
});

//

$isFinished.on(signInFx.done, () => true);
$isFinished.on(signInFx.fail, () => false);

$error.on(signInFx.failData, (_, error) => {
  if (error.status === 429) {
    return "RateLimit";
  }

  return "UnknownError";
});

sample({
  clock: backButtonClicked,
  target: [$email.reinit, $error.reinit, $isFinished.reinit, $invalidEmailText.reinit],
});

sample({
  clock: signInWithGoogle,
  target: signInWithGoogleFx,
});
