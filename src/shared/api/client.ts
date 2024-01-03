import { type AuthError, type PostgrestError, createClient } from "@supabase/supabase-js";

import { SUPABASE_ANON_KEY, SUPABASE_URL } from "~/shared/config/api";

import { Database } from "./supabase";

export const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Checks if the provided error is null and throws an exception if it is not.
 *
 * @param {AuthError | null} error - The error to check.
 * @throws {AuthError} - Thrown if the provided error is not null.
 */
export function checkAuthError(error: AuthError | null): asserts error is null {
  if (error !== null) throw error;
}

type ErrorCode = keyof typeof ErrorDict;
type ErrorMessage = (typeof ErrorDict)[ErrorCode];
export type InternalError = {
  error: PostgrestError;
  code: ErrorMessage;
};

const ErrorDict = {
  "23505": "unique constraint",
};

export function checkCrudError(error: PostgrestError | null): asserts error is null {
  if (error !== null) {
    const code = ErrorDict[error.code as ErrorCode] ?? "unknown";

    throw { error, code };
  }
}

export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never;
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Enums<T extends keyof Database["public"]["Enums"]> = Database["public"]["Enums"][T];

export type DbResultErr = PostgrestError;
