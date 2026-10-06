/* Cloud accounts (optional). Leave both empty to hide account sign-in and use only file/code sync.
   Fill them in with your Supabase project's URL and *anon public* key (Project settings → API).
   The anon key is meant to be public; the data is protected by the row-level-security rules in supabase/schema.sql.
   NEVER put the service_role key here. */
window.C1_CLOUD = { url: '', anonKey: '' };
