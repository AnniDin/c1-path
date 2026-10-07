-- C1 Path: optional difficulty calibration with learners' first-attempt scores. Run once in the Supabase SQL editor (after schema.sql).
-- Privacy: a learner who switches it on shares ONE number per set (the score on their first attempt), linked to their account only so that
-- each learner counts once per set. The table has row-level security with NO policies, so nobody can read the rows directly: they are only
-- reachable through the functions below, and the only thing the public can read is an average per set that has at least 10 learners.
-- "Stop sharing" deletes the rows, and deleting the account deletes them too (on delete cascade).

create table if not exists public.set_scores (
  user_id uuid not null references auth.users (id) on delete cascade,
  set_key text not null check (set_key ~ '^([a-z]+/[0-9]{1,3}|listen:[a-z0-9-]{1,60})$'),
  pct int not null check (pct between 0 and 100),
  at timestamptz not null default now(),
  primary key (user_id, set_key)
);
alter table public.set_scores enable row level security;

create or replace function public.submit_set_score(p_key text, p_pct int) returns void
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'not signed in'; end if;
  if p_key !~ '^([a-z]+/[0-9]{1,3}|listen:[a-z0-9-]{1,60})$' or p_pct is null or p_pct < 0 or p_pct > 100 then raise exception 'bad score'; end if;
  insert into set_scores (user_id, set_key, pct) values (auth.uid(), p_key, p_pct) on conflict do nothing; -- first attempt only
end $$;

create or replace function public.forget_set_scores() returns void
language sql security definer set search_path = public as $$
  delete from set_scores where user_id = auth.uid();
$$;

create or replace function public.set_calibration() returns table (set_key text, n int, avg_pct double precision)
language sql stable security definer set search_path = public as $$
  select s.set_key, count(*)::int, avg(s.pct)::double precision from set_scores s group by s.set_key having count(*) >= 10;
$$;

revoke all on function public.submit_set_score(text, int), public.forget_set_scores(), public.set_calibration() from public, anon;
grant execute on function public.submit_set_score(text, int), public.forget_set_scores() to authenticated;
grant execute on function public.set_calibration() to anon, authenticated;
