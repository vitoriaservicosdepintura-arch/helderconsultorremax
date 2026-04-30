import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://koodfofbipvvoyymiubk.supabase.co';
const supabaseKey = 'sb_publishable_84HtY9fsYbWDDq8dyEtIKQ_79EP8Iao';

export const supabase = createClient(supabaseUrl, supabaseKey);
