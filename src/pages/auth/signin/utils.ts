import { EMAIL_PATTERN } from "./constants";

/**
 * validate email address
 * @param email - String | null
 * @returns boolean
 */
export function validateEmail(email: string | null): boolean {
  if (email) {
    return new RegExp(EMAIL_PATTERN).test(email);
  }
  return false;
}
