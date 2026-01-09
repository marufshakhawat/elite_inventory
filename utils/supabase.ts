import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zbijjixumqmlwohohlow.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpiaWpqaXh1bXFtbHdvaG9obG93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5MzAxMjUsImV4cCI6MjA4MzUwNjEyNX0.F4nPHQGrQdDAxkz_3JggJv7qS6GnEYe6EfyaLluM6ns';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);