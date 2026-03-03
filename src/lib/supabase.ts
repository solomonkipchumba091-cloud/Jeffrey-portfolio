import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://bhdwkeyokygdyyquysjy.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImUxOTRlMDA2LTU1MTAtNGE3Yi1hOTUxLWY4MTRhMDk0NzU2MSJ9.eyJwcm9qZWN0SWQiOiJiaGR3a2V5b2t5Z2R5eXF1eXNqeSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzcyNDMyMDMyLCJleHAiOjIwODc3OTIwMzIsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.b4Y4F9vpUciTdWtknVP9iqFR_E9GsiKG-NkaDjTVfGA';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };