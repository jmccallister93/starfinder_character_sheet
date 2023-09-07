import { createClient } from '@supabase/supabase-js'
const SUPABASE_URL='https://zyiwnpgbyyveqwhiusnw.supabase.co'
const SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5aXducGdieXl2ZXF3aGl1c253Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM5NDQxMDQsImV4cCI6MjAwOTUyMDEwNH0.UFJcB6YxjU7WYCfDaEy6AMkQ1OzIVQ2Fb2cPdUdaiAs"


export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
  );
  