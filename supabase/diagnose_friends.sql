-- Read-only: who is on the leaderboard, and who has added whom (run in the Supabase SQL editor; it changes nothing).
select 'board' as kind, u.email as a, l.code as b, l.name as c, l.week as d
from public.leaderboard l join auth.users u on u.id = l.user_id
union all
select 'friend', a.email, b.email, f.friend_code, case when b.email is null then 'CODE NOT ON THE BOARD' else '' end
from public.friends f
join auth.users a on a.id = f.user_id
left join public.leaderboard lb on lb.code = f.friend_code
left join auth.users b on b.id = lb.user_id
order by 1, 2;
