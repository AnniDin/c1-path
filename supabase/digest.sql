-- C1 Path: optional weekly "little trick" email. Run once in the Supabase SQL editor.
-- Who is on the list: only people who switch it on in their account page (off by default, opt-in).
-- The table has row level security and NO policies, so nobody can read or write it directly: every access goes
-- through the functions below. The sender (a GitHub Action, tools/send_digest.js) uses the service_role key.
-- Deleting an account removes the row (on delete cascade).

create table if not exists public.digest (
  user_id uuid primary key references auth.users on delete cascade,
  token uuid not null default gen_random_uuid() unique,   -- secret in the unsubscribe link
  enabled boolean not null default true,
  last_sent date,
  created_at timestamptz not null default now()
);
alter table public.digest enable row level security;

create or replace function public.get_digest() returns boolean
language sql security definer set search_path = public as $$
  select coalesce((select enabled from digest where user_id = auth.uid()), false);
$$;

create or replace function public.set_digest(p_on boolean) returns void
language sql security definer set search_path = public as $$
  insert into digest (user_id, enabled) values (auth.uid(), p_on)
  on conflict (user_id) do update set enabled = excluded.enabled;
$$;

-- the unsubscribe link in every email works without signing in: the token is the proof
create or replace function public.unsubscribe_digest(p_token uuid) returns boolean
language plpgsql security definer set search_path = public as $$
declare n int;
begin
  update digest set enabled = false where token = p_token and enabled;
  get diagnostics n = row_count;
  return n > 0;
end;
$$;

-- for the sender only: who is due a trick (not mailed in the last 6 days)
create or replace function public.digest_due() returns table (user_id uuid, email text, token uuid)
language sql security definer set search_path = public as $$
  select d.user_id, u.email::text, d.token
  from digest d join auth.users u on u.id = d.user_id
  where d.enabled and u.email is not null and (d.last_sent is null or d.last_sent <= current_date - 6);
$$;

create or replace function public.digest_mark(p_ids uuid[]) returns void
language sql security definer set search_path = public as $$
  update digest set last_sent = current_date where user_id = any(p_ids);
$$;

revoke all on function public.get_digest(), public.set_digest(boolean), public.unsubscribe_digest(uuid), public.digest_due(), public.digest_mark(uuid[]) from public, anon, authenticated;
grant execute on function public.get_digest(), public.set_digest(boolean) to authenticated;
grant execute on function public.unsubscribe_digest(uuid) to anon, authenticated;
grant execute on function public.digest_due(), public.digest_mark(uuid[]) to service_role;
