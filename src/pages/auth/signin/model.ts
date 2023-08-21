import { attach, createEvent, createStore, sample } from "effector";
import { not, pending } from "patronum";

import { api } from "~/shared/api";
import { routes } from "~/shared/routing";

import { validateEmail } from "./utils";

export const currentRoute = routes.auth.signIn;

export type SignInError = "InvalidEmail" | "RateLimit" | "UnknownError";

export const changedEmail = createEvent<string>();
export const submitted = createEvent();
export const signInWithGoogle = createEvent();
export const backButtonClicked = createEvent();

const signInWithGoogleFx = attach({
  effect: api.auth.signInWithGoogleFx,
});

const signInFx = attach({
  effect: api.auth.signInWithEmailFx,
});

/**
 * email state
 */
export const $email = createStore<Email>("");

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

$email.on(changedEmail, (_, email) => email);

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
