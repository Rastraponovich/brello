import { attach, createEvent, createStore, sample } from "effector";
import type { ChangeEvent, FormEvent } from "react";
import { routes } from "shared/routing";
import { api } from "shared/api";
import { not } from "patronum";

export type SignInError = "InvalidEmail" | "RateLimit" | "UnknownError";

const EMAIL_PATTERN = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

/**
 * validate email address
 * @param email - String | null
 * @returns boolean
 */
function validateEmail(email: string | null): boolean {
  if (email) {
    return new RegExp(EMAIL_PATTERN).test(email);
  }
  return false;
}

export const changedEmail = createEvent<ChangeEvent<HTMLInputElement>>();
export const submitted = createEvent<FormEvent<HTMLFormElement>>();
export const backButtonClicked = createEvent();
export const skipButtonClicked = createEvent();

const signInFx = attach({
  effect: api.auth.signInWithEmailFx,
});

submitted.watch((e) => e.preventDefault());

/**
 * email state
 */
export const $email = createStore<Email | null>(null);
/**
 * pending state when clicked signin
 */
export const $isPendning = signInFx.pending;
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
  target: [
    $email.reinit,
    $error.reinit,
    $isFinished.reinit,
    $invalidEmailText.reinit,
  ],
});

sample({
  clock: skipButtonClicked,
  target: routes.boards.open,
});
