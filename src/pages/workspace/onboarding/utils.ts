import type { ChangeEvent } from "react";

/**
 * A function that takes in an unknown argument and a ChangeEvent of type T (which can be HTMLInputElement or HTMLTextAreaElement), and returns a string.
 *
 * @param {unknown} _ - an unknown argument
 * @param {ChangeEvent<T>} event - a ChangeEvent of type T
 * @return {string} the value of the event target
 */
export function inputReducer<T extends HTMLInputElement | HTMLTextAreaElement>(
  _: unknown,
  event: ChangeEvent<T>,
): string {
  const { value } = event.target;

  return value;
}
