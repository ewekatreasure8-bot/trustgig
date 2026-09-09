/*
# Create profiles table

1. New Tables
- `profiles`
  - `id` (uuid, primary key, references auth.users)
  - `full_name` (text, not null)
  - `title` (text, professional title/tagline)
  - `category` (text, service category)
  - `location` (text, city/state or "Remote")
  - `is_local` (boolean, whether provider offers local services)
  - `price` (integer, hourly rate in dollars)
  - `about` (text, bio/description)
  - `skills` (text array, list of skills)
  - `image_url` (text, profile photo URL)
  - `verified` (boolean, default false)
  - `response_time` (text, e.g. "Under 1 hour")
  - `jobs_completed` (integer, default 0)
  - `rating` (numeric, default 0)
  - `reviews` (integer, default 0)
  - `created_at` (timestamptz, default now)
  - `updated_at` (timestamptz, default now)

2. Security
- Enable RLS on `profiles`.
- SELECT open to anon + authenticated so visitors can browse.
- INSERT/UPDATE/DELETE restricted to the profile owner.

3. Notes
- `id` references `auth.users(id)` with ON DELETE CASCADE.
- `id` defaults to `auth.uid()` so client inserts work without passing owner.
- `skills` is a text array for easy filtering.
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  title text,
  category text,
  location text,
  is_local boolean DEFAULT false,
  price integer DEFAULT 0,
  about text,
  skills text[] DEFAULT '{}',
  image_url text,
  verified boolean DEFAULT false,
  response_time text,
  jobs_completed integer DEFAULT 0,
  rating numeric(2,1) DEFAULT 0,
  reviews integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_all" ON profiles;
CREATE POLICY "profiles_select_all"
ON profiles FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
CREATE POLICY "profiles_insert_own"
ON profiles FOR INSERT
TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
CREATE POLICY "profiles_update_own"
ON profiles FOR UPDATE
TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_delete_own" ON profiles;
CREATE POLICY "profiles_delete_own"
ON profiles FOR DELETE
TO authenticated USING (auth.uid() = id);

CREATE INDEX IF NOT EXISTS idx_profiles_category ON profiles(category);
CREATE INDEX IF NOT EXISTS idx_profiles_is_local ON profiles(is_local);
