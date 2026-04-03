import dotenv from "dotenv";
dotenv.config();

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase credentials. Please set SUPABASE_URL and SUPABASE_ANON_KEY in your environment variables.");
  process.exit(1);
}

console.log("📋 Connecting to Supabase...");

const supabase = createClient(supabaseUrl, supabaseKey);

const checkConnection = async () => {
  try {
    await supabase.from('products').select('count', { count: 'exact', head: true });
    console.log("✅ PostgreSQL (Supabase) connected successfully via Supabase client");
  } catch (error: any) {
    console.error("❌ Supabase connection error:", error.message);
  }
};

checkConnection();

export default supabase;