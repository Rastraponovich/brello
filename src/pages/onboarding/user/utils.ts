/**
 * Validates a name by checking if it is a non-empty string.
 *
 * @param {string | null} name - The name to be validated.
 * @return {boolean} Returns true if the name is a non-empty string, false otherwise.
 */
export function validateName(name: string | null): boolean {
  return name !== null && name.length > 0;
}
