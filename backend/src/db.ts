import dotenv from "dotenv";
dotenv.config();

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || 'https://xkucnoazudwushcdiubi.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhrdWNub2F6dWR3dXNoY2RpdWJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxMzM1MzcsImV4cCI6MjA5MDcwOTUzN30.iU_lXuhESQ4wjZiNnykBYEnmmORNQzehTDvd9YqfcJI';

console.log("📋 Connecting to Supabase...");

const supabase = createClient(supabaseUrl, supabaseKey);

supabase.from('products').select('count', { count: 'exact', head: true })
  .then(() => {
    console.log("✅ PostgreSQL (Supabase) connected successfully via Supabase client");
  })
  .catch((error) => {
    console.error("❌ Supabase connection error:", error.message);
  });

export default supabase;