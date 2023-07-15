import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "shared/config/api";

export const client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
