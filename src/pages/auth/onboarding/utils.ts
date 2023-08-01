import { ChangeEvent } from "react";

/**
 * check string existed
 * @param name - string | null
 * @returns Boolean
 */
export function validateName(name: string | null): boolean {
  return Boolean(name && name.length > 0);
}

export function inputReducer<T extends HTMLInputElement>(
  _: unknown,
  event: ChangeEvent<T>,
): string {
  return event.target.value;
}
