-- =========================================================
-- Kadhaigal — Supabase schema
-- Run this once in the Supabase SQL Editor.
-- =========================================================

-- ---------------------------------------------------------
-- BOOKS
-- ---------------------------------------------------------
create table books (
  id uuid primary key default gen_random_uuid(),

  -- Google Books-shaped fields
  title text not null,
  authors text[] default '{}',
  publisher text,
  published_date text,
  description text,
  isbn text unique,
  page_count integer,
  categories text[] default '{}',
  average_rating numeric,
  ratings_count integer,
  image_thumbnail text,
  image_small_thumbnail text,
  language text default 'en',
  preview_link text,
  info_link text,
  maturity_rating text default 'NOT_MATURE',

  -- Store-specific fields
  genre text,
  sub_genre text,
  price numeric not null default 0,
  original_price numeric,
  badge text,
  is_staff_pick boolean default false,
  is_featured_selection boolean default false,
  rating numeric,
  staff_note jsonb,
  mood text[],
  curator_note jsonb,
  is_self_published boolean default false,
  print_location text,
  print_note text,
  is_used boolean default false,        -- NEW, matches your "Pre-loved / Used Copy" section
  condition_note text,                   -- NEW, matches your "Condition Note" field

  -- Inventory fields, from your Excel sheet
  quantity integer default 0,
  discount numeric default 0,
  value numeric,
  status text default 'In Stock',
  distributor text,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_books_genre on books (genre);
create index idx_books_sub_genre on books (sub_genre);
create index idx_books_isbn on books (isbn);
create index idx_books_is_staff_pick on books (is_staff_pick) where is_staff_pick = true;
create index idx_books_is_self_published on books (is_self_published) where is_self_published = true;

-- ---------------------------------------------------------
-- FEATURED BOOKS
-- Powers "What We're Loving Right Now" on the Home page.
-- ---------------------------------------------------------
create table featured_books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text not null,
  book_id uuid references books(id) on delete set null,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------
-- EVENTS
-- Powers the Home page's weekly noticeboard. Matches the shape
-- of your existing weeklyEvents.js exactly: a recurring 7-slot
-- template the admin updates each week, rather than one-off
-- dated events.
-- ---------------------------------------------------------
create table events (
  id uuid primary key default gen_random_uuid(),
  day_of_week text not null,      -- 'Monday', 'Tuesday', ... 'Sunday'
  title text not null,
  time_range text,                 -- e.g. "6:00 – 8:00 PM"
  tagline text,                    -- the short description shown on the note
  accent text default 'navy',      -- 'navy' | 'brick' | 'sage' — which color the note uses
  sort_order integer default 0,    -- controls Monday→Sunday display order
  is_active boolean default true,  -- lets admin hide a slot without deleting it
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_events_sort_order on events (sort_order);

-- ---------------------------------------------------------
-- ADMIN USERS
-- ---------------------------------------------------------
create table admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz default now()
);

-- ---------------------------------------------------------
-- ROW LEVEL SECURITY
-- ---------------------------------------------------------
alter table books enable row level security;
alter table featured_books enable row level security;
alter table events enable row level security;
alter table admin_users enable row level security;

-- Books
create policy "Public can read books" on books for select using (true);
create policy "Admins can insert books" on books for insert with check (auth.uid() in (select user_id from admin_users));
create policy "Admins can update books" on books for update using (auth.uid() in (select user_id from admin_users));
create policy "Admins can delete books" on books for delete using (auth.uid() in (select user_id from admin_users));

-- Featured books
create policy "Public can read featured_books" on featured_books for select using (true);
create policy "Admins can insert featured_books" on featured_books for insert with check (auth.uid() in (select user_id from admin_users));
create policy "Admins can delete featured_books" on featured_books for delete using (auth.uid() in (select user_id from admin_users));

-- Events: the public only ever sees active slots; admins see everything
-- (multiple SELECT policies are OR'd together by Postgres, so this gives
-- admins the union of both — all events, active or not).
create policy "Public can read active events" on events for select using (is_active = true);
create policy "Admins can read all events" on events for select using (auth.uid() in (select user_id from admin_users));
create policy "Admins can insert events" on events for insert with check (auth.uid() in (select user_id from admin_users));
create policy "Admins can update events" on events for update using (auth.uid() in (select user_id from admin_users));
create policy "Admins can delete events" on events for delete using (auth.uid() in (select user_id from admin_users));

-- Admin users
create policy "Admins can read admin_users" on admin_users for select using (auth.uid() in (select user_id from admin_users));








-- A SECURITY DEFINER function runs with the privileges of whoever created
-- it (not the querying user), so its internal query bypasses RLS entirely
-- — breaking the recursion, since it no longer triggers admin_users'
-- own policy while checking admin_users.
create or replace function is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from admin_users where user_id = auth.uid()
  );
$$;

grant execute on function is_admin() to authenticated, anon;

-- Replace every policy that referenced admin_users directly with is_admin()

-- books
drop policy "Admins can insert books" on books;
drop policy "Admins can update books" on books;
drop policy "Admins can delete books" on books;
create policy "Admins can insert books" on books for insert with check (is_admin());
create policy "Admins can update books" on books for update using (is_admin());
create policy "Admins can delete books" on books for delete using (is_admin());

-- featured_books
drop policy "Admins can insert featured_books" on featured_books;
drop policy "Admins can delete featured_books" on featured_books;
create policy "Admins can insert featured_books" on featured_books for insert with check (is_admin());
create policy "Admins can delete featured_books" on featured_books for delete using (is_admin());

-- events
drop policy "Admins can read all events" on events;
drop policy "Admins can insert events" on events;
drop policy "Admins can update events" on events;
drop policy "Admins can delete events" on events;
create policy "Admins can read all events" on events for select using (is_admin());
create policy "Admins can insert events" on events for insert with check (is_admin());
create policy "Admins can update events" on events for update using (is_admin());
create policy "Admins can delete events" on events for delete using (is_admin());

-- admin_users itself — this was the one directly causing the recursion
drop policy "Admins can read admin_users" on admin_users;
create policy "Admins can read admin_users" on admin_users for select using (is_admin());


insert into admin_users (user_id) values ('8bc8cad8-d4aa-49f9-8fc3-0baa02a54d23');
insert into admin_users (user_id) values ('ef011a99-0f9b-4b6d-92eb-ba9f1ba9c263');

drop table if exists events cascade;

create table events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date date not null,
  start_time time,
  end_time time,
  accent text default 'navy',         -- 'navy' | 'brick' | 'sage' — sticky-note color on the noticeboard
  category text,                       -- e.g. 'Workshop', 'Reading', 'Open Mic' — for the /events page
  is_featured boolean default false,   -- shows in the Featured Events section on /events
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_events_event_date on events (event_date);
create index idx_events_is_featured on events (is_featured) where is_featured = true;

alter table events enable row level security;

create policy "Public can read events" on events for select using (true);
create policy "Admins can insert events" on events for insert with check (is_admin());
create policy "Admins can update events" on events for update using (is_admin());
create policy "Admins can delete events" on events for delete using (is_admin());

alter table events
  add column if not exists image_url text,
  add column if not exists price numeric;


alter table events
  add column if not exists schedule_label text;


insert into storage.buckets (id, name, public)
values ('event-images', 'event-images', true)
on conflict (id) do nothing;

create policy "Public can view event images"
  on storage.objects for select using (bucket_id = 'event-images');

create policy "Admins can upload event images"
  on storage.objects for insert with check (bucket_id = 'event-images' and is_admin());

create policy "Admins can update event images"
  on storage.objects for update using (bucket_id = 'event-images' and is_admin());

create policy "Admins can delete event images"
  on storage.objects for delete using (bucket_id = 'event-images' and is_admin());