-- C1 Path: optional profile picture shown to the friends you add. Run once in the Supabase SQL editor (after friends.sql).
-- The picture is a small JPEG (128 px square, a few kilobytes) stored as a data URL on your own leaderboard row.
-- Same privacy rules as the rest of the board: only you and the people whose code you added can read it,
-- and it is deleted with the row when you leave the board or delete your account.

alter table public.leaderboard add column if not exists avatar text
  check (avatar is null or (char_length(avatar) < 30000 and avatar like 'data:image/jpeg;base64,%'));

create or replace function public.set_avatar(p_avatar text) returns void
language sql security definer set search_path = public as $$
  update leaderboard set avatar = nullif(p_avatar, '') where user_id = auth.uid();
$$;

drop function if exists public.friend_board();
create or replace function public.friend_board() returns table (code text, name text, week text, answers int, streak int, level int, me boolean, avatar text)
language sql security definer set search_path = public as $$
  select l.code, l.name, l.week, l.answers, l.streak, l.level, (l.user_id = auth.uid()), l.avatar
  from leaderboard l
  where l.user_id = auth.uid() or l.code in (select friend_code from friends where user_id = auth.uid());
$$;

revoke all on function public.set_avatar(text), public.friend_board() from public, anon;
grant execute on function public.set_avatar(text), public.friend_board() to authenticated;
