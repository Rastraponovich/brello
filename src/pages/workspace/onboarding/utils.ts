import type { ChangeEvent } from "react";

/**
 * @param _ - never
 * @param event - Native Input
 * @returns string
 */
export function inputReducer<T extends HTMLInputElement | HTMLTextAreaElement>(
  _: unknown,
  event: ChangeEvent<T>,
): string {
  return event.target.value;
}
