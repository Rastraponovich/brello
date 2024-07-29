import type { SignInError } from "./model";

export const EMAIL_PATTERN = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

export enum ErrorCode {
  InvalidEmail = "InvalidEmail",
  RateLimit = "RateLimit",
  UnknownError = "UnknownError",
}

export const ErrorTextMap = new Map<SignInError, string>([
  ["InvalidEmail", "Must be a valid email."],
  ["RateLimit", "Too much requests. Please, try again later."],
  ["UnknownError", "Something happened. Please, try again later."],
]);
