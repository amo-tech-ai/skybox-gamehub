-- ===========================================================================
-- SCHEMA: Events System
-- ===========================================================================
-- Description: Complete events management system for Skybox GameHub
-- Dependencies: 01_profiles.sql
-- Author: Skybox Team
-- Created: 2025-10-24
-- ===========================================================================

-- =============================================================================
-- EVENT CATEGORIES TABLE
-- =============================================================================

create table if not exists public.event_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  icon text,
  display_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_event_categories_slug on public.event_categories(slug);
create index if not exists idx_event_categories_order on public.event_categories(display_order);

-- =============================================================================
-- VENUES TABLE
-- =============================================================================

create table if not exists public.venues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  address text,
  city text default 'Medellín',
  state text default 'Antioquia',
  country text default 'Colombia',
  postal_code text,
  phone text,
  email text,
  website text,
  latitude numeric(10, 8),
  longitude numeric(11, 8),
  capacity int,
  description text,
  amenities text[],
  images jsonb default '[]'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_venues_slug on public.venues(slug);
create index if not exists idx_venues_city on public.venues(city);

-- =============================================================================
-- EVENTS TABLE
-- =============================================================================

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),

  -- basic information
  title text not null,
  slug text not null unique,
  subtitle text,
  description text not null,
  short_description text,

  -- relationships
  category_id uuid references public.event_categories(id) on delete set null,
  venue_id uuid references public.venues(id) on delete set null,

  -- datetime
  event_date date not null,
  event_time time not null,
  event_datetime timestamptz not null,
  end_datetime timestamptz,
  timezone text default 'America/Bogota',

  -- capacity & pricing
  total_capacity int,
  available_capacity int,
  min_party_size int default 1,
  max_party_size int default 10,
  base_price numeric(10, 2),
  currency text default 'COP',

  -- media
  featured_image text,
  banner_image text,
  thumbnail_image text,
  gallery_images jsonb default '[]'::jsonb,
  video_url text,

  -- display & features
  is_featured boolean default false,
  is_sold_out boolean default false,
  is_private boolean default false,
  display_order int default 0,

  -- status
  status text default 'draft' check (status in ('draft', 'published', 'cancelled', 'past', 'sold_out')),
  published_at timestamptz,

  -- seo
  meta_title text,
  meta_description text,
  meta_keywords text[],

  -- tracking
  view_count int default 0,
  reservation_count int default 0,

  -- audit
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz default null,

  -- constraints
  constraint valid_slug_events check (slug ~ '^[a-z0-9-]+$'),
  constraint valid_capacity check (
    (total_capacity is null) or
    (available_capacity is null) or
    (available_capacity <= total_capacity)
  )
);

-- indexes for performance
create index if not exists idx_events_slug on public.events(slug);
create index if not exists idx_events_category on public.events(category_id) where deleted_at is null;
create index if not exists idx_events_venue on public.events(venue_id);
create index if not exists idx_events_datetime on public.events(event_datetime desc) where deleted_at is null;
create index if not exists idx_events_status on public.events(status) where deleted_at is null;
create index if not exists idx_events_featured on public.events(is_featured) where is_featured = true and deleted_at is null;
create index if not exists idx_events_published on public.events(published_at desc) where status = 'published' and deleted_at is null;
create index if not exists idx_events_created on public.events(created_at desc);

-- full-text search
create index if not exists idx_events_search on public.events
  using gin(to_tsvector('english', title || ' ' || coalesce(description, '') || ' ' || coalesce(subtitle, '')));

-- =============================================================================
-- EVENT HIGHLIGHTS TABLE
-- =============================================================================

create table if not exists public.event_highlights (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  highlight_text text not null,
  icon text,
  display_order int default 0,
  created_at timestamptz default now()
);

create index if not exists idx_event_highlights_event on public.event_highlights(event_id);
create index if not exists idx_event_highlights_order on public.event_highlights(event_id, display_order);

-- =============================================================================
-- EVENT PRIZES TABLE
-- =============================================================================

create table if not exists public.event_prizes (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  place int not null,
  title text not null,
  description text,
  value numeric(10, 2),
  currency text default 'COP',
  image_url text,
  display_order int default 0,
  created_at timestamptz default now()
);

create index if not exists idx_event_prizes_event on public.event_prizes(event_id);
create index if not exists idx_event_prizes_order on public.event_prizes(event_id, display_order);

-- =============================================================================
-- EVENT SPECIALS TABLE
-- =============================================================================

create table if not exists public.event_specials (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  name text not null,
  description text,
  price numeric(10, 2),
  original_price numeric(10, 2),
  currency text default 'COP',
  image_url text,
  is_available boolean default true,
  available_quantity int,
  display_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_event_specials_event on public.event_specials(event_id);
create index if not exists idx_event_specials_available on public.event_specials(event_id) where is_available = true;

-- =============================================================================
-- EVENT FAQS TABLE
-- =============================================================================

create table if not exists public.event_faqs (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete cascade,
  question text not null,
  answer text not null,
  category text,
  is_global boolean default false,
  display_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_event_faqs_event on public.event_faqs(event_id);
create index if not exists idx_event_faqs_global on public.event_faqs(is_global) where is_global = true;
create index if not exists idx_event_faqs_order on public.event_faqs(coalesce(event_id, '00000000-0000-0000-0000-000000000000'::uuid), display_order);

-- =============================================================================
-- EVENT PACKAGES TABLE
-- =============================================================================

create table if not exists public.event_packages (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete cascade,
  name text not null,
  description text,
  price numeric(10, 2) not null,
  currency text default 'COP',
  max_guests int,
  includes text[],
  is_vip boolean default false,
  is_available boolean default true,
  available_quantity int,
  display_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_event_packages_event on public.event_packages(event_id);
create index if not exists idx_event_packages_available on public.event_packages(event_id) where is_available = true;
create index if not exists idx_event_packages_vip on public.event_packages(event_id) where is_vip = true;

-- =============================================================================
-- TRIGGERS
-- =============================================================================

-- update updated_at on events
drop trigger if exists set_updated_at_events on public.events;
create trigger set_updated_at_events
  before update on public.events
  for each row
  execute function public.update_updated_at_column();

-- update updated_at on event_specials
drop trigger if exists set_updated_at_event_specials on public.event_specials;
create trigger set_updated_at_event_specials
  before update on public.event_specials
  for each row
  execute function public.update_updated_at_column();

-- update updated_at on event_faqs
drop trigger if exists set_updated_at_event_faqs on public.event_faqs;
create trigger set_updated_at_event_faqs
  before update on public.event_faqs
  for each row
  execute function public.update_updated_at_column();

-- update updated_at on event_packages
drop trigger if exists set_updated_at_event_packages on public.event_packages;
create trigger set_updated_at_event_packages
  before update on public.event_packages
  for each row
  execute function public.update_updated_at_column();

-- update updated_at on event_categories
drop trigger if exists set_updated_at_event_categories on public.event_categories;
create trigger set_updated_at_event_categories
  before update on public.event_categories
  for each row
  execute function public.update_updated_at_column();

-- update updated_at on venues
drop trigger if exists set_updated_at_venues on public.venues;
create trigger set_updated_at_venues
  before update on public.venues
  for each row
  execute function public.update_updated_at_column();

-- auto-set published_at when status changes to published
create or replace function public.set_event_published_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if new.status = 'published' and old.status != 'published' and new.published_at is null then
    new.published_at := now();
  end if;
  return new;
end;
$$;

drop trigger if exists trigger_set_event_published_at on public.events;
create trigger trigger_set_event_published_at
  before update on public.events
  for each row
  execute function public.set_event_published_at();

-- auto-update available_capacity
create or replace function public.update_event_capacity()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  -- this will be called by reservations table triggers
  -- placeholder for now
  return new;
end;
$$;

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================

-- event_categories
alter table public.event_categories enable row level security;

drop policy if exists "Event categories readable by all" on public.event_categories;
create policy "Event categories readable by all"
  on public.event_categories for select to authenticated, anon using (true);

drop policy if exists "Event categories writable by staff" on public.event_categories;
create policy "Event categories writable by staff"
  on public.event_categories for all to authenticated
  using (public.is_staff());

-- venues
alter table public.venues enable row level security;

drop policy if exists "Venues readable by all" on public.venues;
create policy "Venues readable by all"
  on public.venues for select to authenticated, anon using (true);

drop policy if exists "Venues writable by staff" on public.venues;
create policy "Venues writable by staff"
  on public.venues for all to authenticated
  using (public.is_staff());

-- events
alter table public.events enable row level security;

drop policy if exists "Published events readable by all" on public.events;
create policy "Published events readable by all"
  on public.events for select to authenticated, anon
  using (status = 'published' and deleted_at is null);

drop policy if exists "All events readable by staff" on public.events;
create policy "All events readable by staff"
  on public.events for select to authenticated
  using (public.is_staff());

drop policy if exists "Events insertable by staff" on public.events;
create policy "Events insertable by staff"
  on public.events for insert to authenticated
  with check (public.is_staff());

drop policy if exists "Events updatable by staff" on public.events;
create policy "Events updatable by staff"
  on public.events for update to authenticated
  using (public.is_staff());

drop policy if exists "Events deletable by admin" on public.events;
create policy "Events deletable by admin"
  on public.events for delete to authenticated
  using (
    exists (
      select 1 from public.profiles
      where user_id = auth.uid()
      and role in ('admin', 'superadmin')
    )
  );

-- event_highlights
alter table public.event_highlights enable row level security;

drop policy if exists "Event highlights readable with event" on public.event_highlights;
create policy "Event highlights readable with event"
  on public.event_highlights for select to authenticated, anon
  using (
    exists (
      select 1 from public.events
      where id = event_highlights.event_id
      and status = 'published'
      and deleted_at is null
    ) or public.is_staff()
  );

drop policy if exists "Event highlights writable by staff" on public.event_highlights;
create policy "Event highlights writable by staff"
  on public.event_highlights for all to authenticated
  using (public.is_staff());

-- event_prizes
alter table public.event_prizes enable row level security;

drop policy if exists "Event prizes readable with event" on public.event_prizes;
create policy "Event prizes readable with event"
  on public.event_prizes for select to authenticated, anon
  using (
    exists (
      select 1 from public.events
      where id = event_prizes.event_id
      and status = 'published'
      and deleted_at is null
    ) or public.is_staff()
  );

drop policy if exists "Event prizes writable by staff" on public.event_prizes;
create policy "Event prizes writable by staff"
  on public.event_prizes for all to authenticated
  using (public.is_staff());

-- event_specials
alter table public.event_specials enable row level security;

drop policy if exists "Event specials readable with event" on public.event_specials;
create policy "Event specials readable with event"
  on public.event_specials for select to authenticated, anon
  using (
    exists (
      select 1 from public.events
      where id = event_specials.event_id
      and status = 'published'
      and deleted_at is null
    ) or public.is_staff()
  );

drop policy if exists "Event specials writable by staff" on public.event_specials;
create policy "Event specials writable by staff"
  on public.event_specials for all to authenticated
  using (public.is_staff());

-- event_faqs
alter table public.event_faqs enable row level security;

drop policy if exists "Event faqs readable by all" on public.event_faqs;
create policy "Event faqs readable by all"
  on public.event_faqs for select to authenticated, anon
  using (
    is_global = true or
    exists (
      select 1 from public.events
      where id = event_faqs.event_id
      and status = 'published'
      and deleted_at is null
    ) or public.is_staff()
  );

drop policy if exists "Event faqs writable by staff" on public.event_faqs;
create policy "Event faqs writable by staff"
  on public.event_faqs for all to authenticated
  using (public.is_staff());

-- event_packages
alter table public.event_packages enable row level security;

drop policy if exists "Event packages readable with event" on public.event_packages;
create policy "Event packages readable with event"
  on public.event_packages for select to authenticated, anon
  using (
    exists (
      select 1 from public.events
      where id = event_packages.event_id
      and status = 'published'
      and deleted_at is null
    ) or public.is_staff()
  );

drop policy if exists "Event packages writable by staff" on public.event_packages;
create policy "Event packages writable by staff"
  on public.event_packages for all to authenticated
  using (public.is_staff());

-- =============================================================================
-- HELPER FUNCTIONS
-- =============================================================================

-- get upcoming events
create or replace function public.get_upcoming_events(limit_count int default 10)
returns setof public.events
language sql
security invoker
set search_path = public
stable
as $$
  select *
  from public.events
  where status = 'published'
  and deleted_at is null
  and event_datetime > now()
  order by event_datetime asc
  limit limit_count;
$$;

-- get featured events
create or replace function public.get_featured_events(limit_count int default 5)
returns setof public.events
language sql
security invoker
set search_path = public
stable
as $$
  select *
  from public.events
  where status = 'published'
  and deleted_at is null
  and is_featured = true
  and event_datetime > now()
  order by event_datetime asc
  limit limit_count;
$$;

-- search events
create or replace function public.search_events(search_query text, limit_count int default 20)
returns setof public.events
language sql
security invoker
set search_path = public
stable
as $$
  select *
  from public.events
  where status = 'published'
  and deleted_at is null
  and (
    to_tsvector('english', title || ' ' || coalesce(description, '') || ' ' || coalesce(subtitle, ''))
    @@ plainto_tsquery('english', search_query)
  )
  order by event_datetime asc
  limit limit_count;
$$;

-- increment event views
create or replace function public.increment_event_views(event_id_param uuid)
returns void
language sql
security invoker
set search_path = public
volatile
as $$
  update public.events
  set view_count = view_count + 1
  where id = event_id_param;
$$;

-- =============================================================================
-- GRANTS
-- =============================================================================

grant select on public.event_categories to authenticated, anon;
grant all on public.event_categories to service_role;

grant select on public.venues to authenticated, anon;
grant all on public.venues to service_role;

grant select on public.events to authenticated, anon;
grant all on public.events to service_role;

grant select on public.event_highlights to authenticated, anon;
grant all on public.event_highlights to service_role;

grant select on public.event_prizes to authenticated, anon;
grant all on public.event_prizes to service_role;

grant select on public.event_specials to authenticated, anon;
grant all on public.event_specials to service_role;

grant select on public.event_faqs to authenticated, anon;
grant all on public.event_faqs to service_role;

grant select on public.event_packages to authenticated, anon;
grant all on public.event_packages to service_role;

-- =============================================================================
-- COMMENTS
-- =============================================================================

comment on table public.event_categories is 'Categories for organizing events (Baseball, Soccer, Special Events, etc.)';
comment on table public.venues is 'Venue information including Skybox Medellín location and details';
comment on table public.events is 'Main events table with complete event information and metadata';
comment on table public.event_highlights is 'Feature bullets for events (Live DJ, Giant Screens, etc.)';
comment on table public.event_prizes is 'Contest prizes for events (Halloween costume contest, etc.)';
comment on table public.event_specials is 'Food & drink specials for events';
comment on table public.event_faqs is 'Frequently asked questions for events';
comment on table public.event_packages is 'VIP and table packages for events';
