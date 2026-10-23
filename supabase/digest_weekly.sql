-- C1 Path: the weekly email also tells you how your week went and how your friends' week went. Run once in the Supabase SQL editor, AFTER digest.sql.
-- Nothing new is stored and nothing becomes readable by users: weekly_due() is for the sender only (service_role key). For each person who switched
-- the weekly trick on it returns their progress copy (if they keep one in the cloud) and the leaderboard rows of their friends (name, week, answers
-- this week, streak): the same figures those friends already show them in the app. People who are not on the friends leaderboard get no friends list.
-- Until this is run, the sender simply sends the trick alone (it falls back to digest_due()).

create or replace function public.weekly_due() returns table (user_id uuid, email text, token uuid, data jsonb, friends jsonb)
language sql security definer set search_path = public as $$
  select d.user_id, u.email::text, d.token,
         (select p.data::jsonb from public.progress p where p.user_id = d.user_id),
         coalesce((select jsonb_agg(jsonb_build_object('name', f.name, 'week', f.week, 'answers', f.answers, 'streak', f.streak))
                   from public.friends fr join public.leaderboard f on f.code = fr.friend_code
                   where fr.user_id = d.user_id), '[]'::jsonb)
  from public.digest d
  join auth.users u on u.id = d.user_id
  where d.enabled and u.email is not null and (d.last_sent is null or d.last_sent <= current_date - 6);
$$;

revoke all on function public.weekly_due() from public, anon, authenticated;
grant execute on function public.weekly_due() to service_role;
