import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://udrnhacheswdacbcqqwv.supabase.co"; // e.g., https://abc123.supabase.co
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkcm5oYWNoZXN3ZGFjYmNxcXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MTQ1NjAsImV4cCI6MjA2MTQ5MDU2MH0.7rAVqiQOXfQ4oYQx2Qzd2PDPQOXesgDRGGanmDTGA2Q";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
