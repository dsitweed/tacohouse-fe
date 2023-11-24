import { createClient } from '@supabase/supabase-js';

// A RESTful endpoint for querying and managing your database.
const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
// This key is safe to use in a browser if you have enabled Row Level Security for your tables and configured policies.
const supabaseAnonKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
