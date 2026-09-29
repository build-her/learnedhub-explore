import { createClient } from "@supabase/supabase-js";

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co").replace(/^<|>$/g, "").trim();
const supabaseServiceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").replace(/^<|>$/g, "").trim();

if (!supabaseServiceRoleKey && typeof window === "undefined") {
  console.warn("SUPABASE_SERVICE_ROLE_KEY is not defined in environment variables");
}

// Use a safe placeholder string if missing so module evaluation never throws "supabaseKey is required"
export const supabaseServer = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseServiceRoleKey || "service-role-key-placeholder",
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);
