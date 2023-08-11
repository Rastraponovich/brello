import type { ChangeEvent } from "react";

/**
 * Validates a name by checking if it is a non-empty string.
 *
 * @param {string | null} name - The name to be validated.
 * @return {boolean} Returns true if the name is a non-empty string, false otherwise.
 */
export function validateName(name: string | null): boolean {
  return name !== null && name.length > 0;
}

/**
 * A function that takes an unknown value and a ChangeEvent object
 * and returns a string.
 *
 * @param {unknown} _ - an unknown value
 * @param {ChangeEvent<T>} event - a ChangeEvent object
 * @return {string} the value of the event target
 */
export function inputReducer<T extends HTMLInputElement>(
  _: unknown,
  event: ChangeEvent<T>,
): string {
  const { value } = event.target;

  return value;
}
