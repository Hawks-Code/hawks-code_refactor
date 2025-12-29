import { createClient } from "../utils/supabase/client";
import { createClient as createServerClient } from "../utils/supabase/server";

export const supabase = await createServerClient()
export const supabaseClient = createClient()
