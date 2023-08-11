import { AuthError, createClient } from "@supabase/supabase-js";

import { SUPABASE_ANON_KEY, SUPABASE_URL } from "~/shared/config/api";

export const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Checks if the provided error is null and throws an exception if it is not.
 *
 * @param {AuthError | null} error - The error to check.
 * @throws {AuthError} - Thrown if the provided error is not null.
 */
export function checkError(error: AuthError | null): asserts error is null {
  if (error !== null) throw error;
}
