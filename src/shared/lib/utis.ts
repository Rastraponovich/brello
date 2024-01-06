/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} str - The string to capitalize.
 * @return {string} The capitalized string.
 */
export function capitalize(str: string): string {
  const firstChar = str.charAt(0).toUpperCase();
  const restOfString = str.slice(1);

  return `${firstChar}${restOfString}`;
}
