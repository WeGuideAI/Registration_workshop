-- ============================================================
-- WeGuide AI & Robotics Awareness Workshop
-- Migration: 002_workshop_registration.sql
-- Updates registrations table for dynamic form without slots
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Ensure registrations table exists with all modern fields
CREATE TABLE IF NOT EXISTS public.registrations (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  full_name             TEXT NOT NULL CHECK (length(trim(full_name)) > 0),
  email                 TEXT NOT NULL,
  phone                 TEXT NOT NULL,
  applicant_type        TEXT NOT NULL DEFAULT 'school_student',
  experience_level      TEXT NOT NULL DEFAULT 'Beginner',
  city                  TEXT,
  hear_about_us         TEXT,
  school_name           TEXT,
  grade                 TEXT,
  parent_guardian_name  TEXT,
  parent_guardian_phone TEXT,
  college_name          TEXT,
  course                TEXT,
  year_of_study         TEXT,
  tech_interests        TEXT,
  occupation            TEXT,
  workplace             TEXT,
  has_child_attending   BOOLEAN DEFAULT false,
  child_name            TEXT,
  child_grade           TEXT,
  child_school          TEXT,
  status                TEXT NOT NULL DEFAULT 'confirmed'
);

-- 2. Alter table if previously created from 001_initial_schema
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS applicant_type        TEXT DEFAULT 'school_student';
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS city                  TEXT;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS hear_about_us         TEXT;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS school_name           TEXT;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS grade                 TEXT;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS parent_guardian_name  TEXT;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS parent_guardian_phone TEXT;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS college_name          TEXT;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS course                TEXT;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS year_of_study         TEXT;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS tech_interests        TEXT;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS occupation            TEXT;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS workplace             TEXT;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS has_child_attending   BOOLEAN DEFAULT false;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS child_name            TEXT;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS child_grade           TEXT;
ALTER TABLE public.registrations ADD COLUMN IF NOT EXISTS child_school          TEXT;

-- 3. Drop NOT NULL constraints from legacy slot/role/organization columns if present
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'registrations' AND column_name = 'slot_id') THEN
    ALTER TABLE public.registrations ALTER COLUMN slot_id DROP NOT NULL;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'registrations' AND column_name = 'role') THEN
    ALTER TABLE public.registrations ALTER COLUMN role DROP NOT NULL;
  END IF;
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'registrations' AND column_name = 'organization') THEN
    ALTER TABLE public.registrations ALTER COLUMN organization DROP NOT NULL;
  END IF;
END $$;

-- 4. Enable RLS and add public insert & select policies
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "allow_public_insert" ON public.registrations;
CREATE POLICY "allow_public_insert" ON public.registrations
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "allow_public_select" ON public.registrations;
CREATE POLICY "allow_public_select" ON public.registrations
  FOR SELECT TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "allow_public_delete" ON public.registrations;
CREATE POLICY "allow_public_delete" ON public.registrations
  FOR DELETE TO anon, authenticated
  USING (true);

-- 5. Safe register_user RPC
CREATE OR REPLACE FUNCTION public.register_user(
  p_full_name             TEXT,
  p_email                 TEXT,
  p_phone                 TEXT,
  p_applicant_type        TEXT,
  p_experience_level      TEXT,
  p_city                  TEXT DEFAULT NULL,
  p_hear_about_us         TEXT DEFAULT NULL,
  p_school_name           TEXT DEFAULT NULL,
  p_grade                 TEXT DEFAULT NULL,
  p_parent_guardian_name  TEXT DEFAULT NULL,
  p_parent_guardian_phone TEXT DEFAULT NULL,
  p_college_name          TEXT DEFAULT NULL,
  p_course                TEXT DEFAULT NULL,
  p_year_of_study         TEXT DEFAULT NULL,
  p_tech_interests        TEXT DEFAULT NULL,
  p_occupation            TEXT DEFAULT NULL,
  p_workplace             TEXT DEFAULT NULL,
  p_has_child_attending   BOOLEAN DEFAULT false,
  p_child_name            TEXT DEFAULT NULL,
  p_child_grade           TEXT DEFAULT NULL,
  p_child_school          TEXT DEFAULT NULL
)
RETURNS JSON
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_new_id UUID;
BEGIN
  INSERT INTO public.registrations (
    full_name, email, phone, applicant_type, experience_level,
    city, hear_about_us,
    school_name, grade, parent_guardian_name, parent_guardian_phone,
    college_name, course, year_of_study, tech_interests,
    occupation, workplace, has_child_attending,
    child_name, child_grade, child_school, status
  ) VALUES (
    trim(p_full_name), lower(trim(p_email)), trim(p_phone),
    p_applicant_type, p_experience_level,
    p_city, p_hear_about_us,
    p_school_name, p_grade, p_parent_guardian_name, p_parent_guardian_phone,
    p_college_name, p_course, p_year_of_study, p_tech_interests,
    p_occupation, p_workplace, COALESCE(p_has_child_attending, false),
    p_child_name, p_child_grade, p_child_school, 'confirmed'
  ) RETURNING id INTO v_new_id;

  RETURN json_build_object(
    'registration_id',  v_new_id,
    'full_name',        trim(p_full_name),
    'email',            lower(trim(p_email)),
    'applicant_type',   p_applicant_type,
    'status',           'confirmed'
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.register_user TO anon, authenticated;
