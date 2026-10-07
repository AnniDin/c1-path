-- C1 Path: make friendships mutual (run once in the Supabase SQL editor, after friends.sql).
-- Before this, adding a friend's code only showed THEM to you. Now both of you see each other.

create or replace function public.add_friend(p_code text) returns boolean
language plpgsql security definer set search_path = public as $$
declare c text := upper(trim(p_code)); other uuid; mine text;
begin
  if auth.uid() is null then raise exception 'not signed in'; end if;
  select user_id into other from leaderboard where code = c and user_id <> auth.uid();
  if other is null then return false; end if;
  select code into mine from leaderboard where user_id = auth.uid();
  if mine is null then raise exception 'join the leaderboard first'; end if;
  insert into friends (user_id, friend_code) values (auth.uid(), c) on conflict do nothing;
  insert into friends (user_id, friend_code) values (other, mine) on conflict do nothing;
  return true;
end $$;

create or replace function public.remove_friend(p_code text) returns void
language plpgsql security definer set search_path = public as $$
declare c text := upper(trim(p_code)); other uuid; mine text;
begin
  select user_id into other from leaderboard where code = c;
  select code into mine from leaderboard where user_id = auth.uid();
  delete from friends where user_id = auth.uid() and friend_code = c;
  if other is not null and mine is not null then delete from friends where user_id = other and friend_code = mine; end if;
end $$;

-- links that already exist one-way become mutual
insert into friends (user_id, friend_code)
select l.user_id, me.code from friends f
join leaderboard l on l.code = f.friend_code
join leaderboard me on me.user_id = f.user_id
on conflict do nothing;
