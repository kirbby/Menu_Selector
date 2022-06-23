import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "https://jqqgchderbtpopobtzar.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpxcWdjaGRlcmJ0cG9wb2J0emFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTU5OTMwMzUsImV4cCI6MTk3MTU2OTAzNX0.oaTnuAYA2nBsFUvvb4dhCVYsXTf3d_h5uAxkTECKPOE");
