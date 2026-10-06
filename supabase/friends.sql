-- C1 Path: optional friends leaderboard. Run once in the Supabase SQL editor (after schema.sql).
-- Nothing is public: the tables have row-level security with NO policies, so they can only be reached
-- through the functions below. You only see your own row and the rows of people whose code you added.

create table if not exists public.leaderboard (
  user_id uuid primary key references auth.users (id) on delete cascade,
  code text unique not null,
  name text not null check (char_length(name) between 1 and 24),
  week text not null default '',
  answers int not null default 0 check (answers >= 0 and answers < 100000),
  streak int not null default 0 check (streak >= 0 and streak < 5000),
  level int not null default 1 check (level >= 1 and level < 1000),
  updated_at timestamptz not null default now()
);
create table if not exists public.friends (
  user_id uuid not null references auth.users (id) on delete cascade,
  friend_code text not null,
  primary key (user_id, friend_code)
);
alter table public.leaderboard enable row level security;
alter table public.friends enable row level security;

create or replace function public.join_board(p_name text) returns text
language plpgsql security definer set search_path = public as $$
declare c text;
begin
  if auth.uid() is null then raise exception 'not signed in'; end if;
  select code into c from leaderboard where user_id = auth.uid();
  if c is null then
    loop
      c := upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6));
      exit when not exists (select 1 from leaderboard where code = c);
    end loop;
    insert into leaderboard (user_id, code, name) values (auth.uid(), c, left(trim(p_name), 24));
  else
    update leaderboard set name = left(trim(p_name), 24) where user_id = auth.uid();
  end if;
  return c;
end $$;

create or replace function public.update_board(p_week text, p_answers int, p_streak int, p_level int) returns void
language sql security definer set search_path = public as $$
  update leaderboard set week = left(p_week, 10), answers = least(greatest(p_answers, 0), 99999), streak = least(greatest(p_streak, 0), 4999),
         level = least(greatest(p_level, 1), 999), updated_at = now() where user_id = auth.uid();
$$;

create or replace function public.add_friend(p_code text) returns boolean
language plpgsql security definer set search_path = public as $$
declare c text := upper(trim(p_code));
begin
  if auth.uid() is null then raise exception 'not signed in'; end if;
  if not exists (select 1 from leaderboard where code = c and user_id <> auth.uid()) then return false; end if;
  insert into friends (user_id, friend_code) values (auth.uid(), c) on conflict do nothing;
  return true;
end $$;

create or replace function public.remove_friend(p_code text) returns void
language sql security definer set search_path = public as $$
  delete from friends where user_id = auth.uid() and friend_code = upper(trim(p_code));
$$;

create or replace function public.leave_board() returns void
language sql security definer set search_path = public as $$
  delete from friends where user_id = auth.uid();
  delete from leaderboard where user_id = auth.uid();
$$;

create or replace function public.friend_board() returns table (code text, name text, week text, answers int, streak int, level int, me boolean)
language sql security definer set search_path = public as $$
  select l.code, l.name, l.week, l.answers, l.streak, l.level, (l.user_id = auth.uid())
  from leaderboard l
  where l.user_id = auth.uid() or l.code in (select friend_code from friends where user_id = auth.uid());
$$;

revoke all on function public.join_board(text), public.update_board(text, int, int, int), public.add_friend(text), public.remove_friend(text),
  public.leave_board(), public.friend_board() from public, anon;
grant execute on function public.join_board(text), public.update_board(text, int, int, int), public.add_friend(text), public.remove_friend(text),
  public.leave_board(), public.friend_board() to authenticated;
