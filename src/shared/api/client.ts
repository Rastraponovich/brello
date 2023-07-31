import { AuthError, createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "shared/config/api";

export const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export function checkError(error: AuthError | null): asserts error is null {
  if (error) {
    throw error;
  }
}
