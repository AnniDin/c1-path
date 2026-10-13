-- C1 Path: optional monthly summary email. Run once in the Supabase SQL editor, AFTER digest.sql.
-- Opt-in, off by default, separate from the weekly trick. The sender (tools/send_digest.js, service_role key) reads the progress copy of
-- people who switched it on, to count answers, streak and weak topics. Nobody else can read it; the unsubscribe link stops everything.

alter table public.digest add column if not exists monthly boolean not null default false;
alter table public.digest add column if not exists last_monthly date;

create or replace function public.get_digest_prefs() returns json
language sql security definer set search_path = public as $$
  select json_build_object(
    'weekly',  coalesce((select enabled from digest where user_id = auth.uid()), false),
    'monthly', coalesce((select monthly from digest where user_id = auth.uid()), false));
$$;

-- a person who only wants the summary must not get the weekly trick: the row is created with enabled = false
create or replace function public.set_monthly(p_on boolean) returns void
language sql security definer set search_path = public as $$
  insert into digest (user_id, enabled, monthly) values (auth.uid(), false, p_on)
  on conflict (user_id) do update set monthly = excluded.monthly;
$$;

-- one link in every email stops both kinds
create or replace function public.unsubscribe_digest(p_token uuid) returns boolean
language plpgsql security definer set search_path = public as $$
declare n int;
begin
  update digest set enabled = false, monthly = false where token = p_token and (enabled or monthly);
  get diagnostics n = row_count;
  return n > 0;
end;
$$;

create or replace function public.monthly_due() returns table (user_id uuid, email text, token uuid, data jsonb)
language sql security definer set search_path = public as $$
  select d.user_id, u.email::text, d.token, p.data::jsonb
  from digest d
  join auth.users u on u.id = d.user_id
  join public.progress p on p.user_id = d.user_id
  where d.monthly and u.email is not null and (d.last_monthly is null or d.last_monthly <= current_date - 20);
$$;

create or replace function public.monthly_mark(p_ids uuid[]) returns void
language sql security definer set search_path = public as $$
  update digest set last_monthly = current_date where user_id = any(p_ids);
$$;

revoke all on function public.get_digest_prefs(), public.set_monthly(boolean), public.unsubscribe_digest(uuid), public.monthly_due(), public.monthly_mark(uuid[]) from public, anon, authenticated;
grant execute on function public.get_digest_prefs(), public.set_monthly(boolean) to authenticated;
grant execute on function public.unsubscribe_digest(uuid) to anon, authenticated;
grant execute on function public.monthly_due(), public.monthly_mark(uuid[]) to service_role;
