-- ===========================================================================
-- SCHEMA: Profiles and Authentication
-- ===========================================================================
-- Description: User profiles extending auth.users with custom fields
-- Dependencies: auth.users (Supabase managed)
-- Author: Skybox Team
-- Created: 2025-10-24
-- ===========================================================================

-- =============================================================================
-- HELPER FUNCTIONS
-- =============================================================================

create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =============================================================================
-- PROFILES TABLE
-- =============================================================================

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,

  -- profile information
  full_name text,
  phone text,
  avatar_url text,

  -- preferences
  preferred_language text default 'es' check (preferred_language in ('es', 'en')),
  timezone text default 'America/Bogota',
  whatsapp_opt_in boolean default false,
  email_notifications boolean default true,
  sms_notifications boolean default false,

  -- role & permissions
  role text default 'customer' check (role in ('customer', 'staff', 'admin', 'superadmin')),

  -- metadata
  metadata jsonb default '{}'::jsonb,

  -- timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz default null,
  last_seen_at timestamptz default now(),

  -- constraints
  constraint unique_user_id unique(user_id),
  constraint valid_phone check (phone is null or phone ~ '^\+?[1-9]\d{1,14}$')
);

-- =============================================================================
-- INDEXES
-- =============================================================================

create index if not exists idx_profiles_user_id on public.profiles(user_id);
create index if not exists idx_profiles_role on public.profiles(role) where deleted_at is null;
create index if not exists idx_profiles_phone on public.profiles(phone) where deleted_at is null;
create index if not exists idx_profiles_created_at on public.profiles(created_at desc);

-- =============================================================================
-- TRIGGERS
-- =============================================================================

drop trigger if exists set_updated_at_profiles on public.profiles;

create trigger set_updated_at_profiles
  before update on public.profiles
  for each row
  execute function public.update_updated_at_column();

-- =============================================================================
-- AUTO-CREATE PROFILE ON USER SIGNUP
-- =============================================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    user_id,
    full_name,
    phone,
    avatar_url,
    role
  )
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'phone', null),
    coalesce(new.raw_user_meta_data->>'avatar_url', null),
    'customer'
  );

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================

alter table public.profiles enable row level security;

-- drop existing policies
drop policy if exists "Profiles are viewable by everyone" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Users can insert own profile" on public.profiles;
drop policy if exists "Staff can view all profiles" on public.profiles;

-- public can view non-deleted profiles
create policy "Profiles are viewable by everyone"
  on public.profiles
  for select
  to authenticated, anon
  using (deleted_at is null);

-- users can update their own profile
create policy "Users can update own profile"
  on public.profiles
  for update
  to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- users can insert their own profile (backup to trigger)
create policy "Users can insert own profile"
  on public.profiles
  for insert
  to authenticated
  with check (user_id = auth.uid());

-- staff can view all profiles (including deleted)
create policy "Staff can view all profiles"
  on public.profiles
  for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where user_id = auth.uid()
      and role in ('staff', 'admin', 'superadmin')
    )
  );

-- =============================================================================
-- HELPER FUNCTIONS FOR PROFILES
-- =============================================================================

-- get current user's profile
create or replace function public.get_current_profile()
returns public.profiles
language sql
security definer
set search_path = public
stable
as $$
  select *
  from public.profiles
  where user_id = auth.uid()
  and deleted_at is null
  limit 1;
$$;

-- check if current user has role
create or replace function public.has_role(required_role text)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.profiles
    where user_id = auth.uid()
    and role = required_role
    and deleted_at is null
  );
$$;

-- check if current user is staff (staff, admin, or superadmin)
create or replace function public.is_staff()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.profiles
    where user_id = auth.uid()
    and role in ('staff', 'admin', 'superadmin')
    and deleted_at is null
  );
$$;

-- =============================================================================
-- GRANTS
-- =============================================================================

grant select on public.profiles to authenticated, anon;
grant insert, update on public.profiles to authenticated;
grant all on public.profiles to service_role;

-- =============================================================================
-- COMMENTS
-- =============================================================================

comment on table public.profiles is 'User profiles extending auth.users with custom fields';
comment on column public.profiles.user_id is 'Foreign key to auth.users.id';
comment on column public.profiles.role is 'User role: customer (default), staff, admin, superadmin';
comment on column public.profiles.whatsapp_opt_in is 'User opted in to WhatsApp notifications';
comment on column public.profiles.metadata is 'Flexible JSONB field for additional user data';
comment on column public.profiles.deleted_at is 'Soft delete timestamp';
