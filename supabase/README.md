# Cloud accounts with Supabase

The site works without any of this. Follow these steps only if you want sign-in and automatic sync between devices.

1. **Create a project** at https://supabase.com (free plan). Pick the region closest to your users (for Europe, an EU region).
2. **Create the table and rules.** Dashboard → SQL Editor → paste the contents of `schema.sql` → Run.
3. **Allow your site URL.** Authentication → URL Configuration:
   - Site URL: `https://<your-user>.github.io/c1-path/`
   - Redirect URLs: add the same URL (and `http://localhost:8765/` if you test locally).
4. **Email sign-in.** Authentication → Providers → Email must be enabled. "Confirm email" can stay on.
5. **Optional: 6-digit code in the email (needs custom SMTP, see 6).** Authentication → Email Templates → Magic Link: add a line such as `Or enter this code: {{ .Token }}`. The link works without it; the code is handy when you open the email on another device.
6. **Real email delivery.** Supabase's built-in email sender allows only a few emails per hour, which is fine for testing but not for real users. For real use, set up your own SMTP (Authentication → Emails → SMTP Settings) with a provider that has a free plan, for example Resend or Brevo.
7. **Connect the site.** Project settings → API: copy the **Project URL** and the **anon public** key into `js/config.js`. Never use the `service_role` key. Commit and push.

## Privacy
Each user's progress is one JSON row, readable and writable only by that user (row-level security). Users can delete their account and data from the Review page ("Delete my account"). If you publish the site to other people, add a short privacy notice with a contact address and the region of your project.
