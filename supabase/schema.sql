-- C1 Path: one row of progress per user. Run this once in the Supabase SQL editor.

create table if not exists public.progress (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  constraint progress_size check (octet_length(data::text) < 2000000)
);

alter table public.progress enable row level security;

-- Each signed-in user can only see and change their own row.
create policy "progress_select_own" on public.progress for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "progress_insert_own" on public.progress for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "progress_update_own" on public.progress for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "progress_delete_own" on public.progress for delete to authenticated
  using ((select auth.uid()) = user_id);

-- Lets a user delete their own account (and, through the cascade, their progress row).
create or replace function public.delete_my_account()
returns void
language sql
security definer
set search_path = public, auth
as $$
  delete from auth.users where id = (select auth.uid());
$$;
revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;
