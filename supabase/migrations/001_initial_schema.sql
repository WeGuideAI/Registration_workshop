-- ============================================================
-- WeGuide — AI & Robotics Awareness Workshop
-- Supabase All-in-One Schema: 001_initial_schema.sql
-- Run this in Supabase SQL Editor for fresh setup
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- 1. REGISTRATIONS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.registrations (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Participant Core Details
  full_name             TEXT NOT NULL CHECK (length(trim(full_name)) > 0),
  email                 TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$'),
  phone                 TEXT NOT NULL CHECK (length(trim(phone)) >= 7),
  applicant_type        TEXT NOT NULL DEFAULT 'school_student'
                        CHECK (applicant_type IN ('school_student', 'college_student', 'professional')),
  experience_level      TEXT NOT NULL DEFAULT 'Beginner'
                        CHECK (experience_level IN ('Beginner', 'Intermediate', 'Advanced')),
  city                  TEXT,
  hear_about_us         TEXT,

  -- School Student specific
  school_name           TEXT,
  grade                 TEXT,
  parent_guardian_name  TEXT,
  parent_guardian_phone TEXT,

  -- College Student specific
  college_name          TEXT,
  course                TEXT,
  year_of_study         TEXT,
  tech_interests        TEXT,

  -- Parent / Working Professional specific
  occupation            TEXT,
  workplace             TEXT,
  has_child_attending   BOOLEAN DEFAULT false,
  child_name            TEXT,
  child_grade           TEXT,
  child_school          TEXT,

  status                TEXT NOT NULL DEFAULT 'confirmed'
);

-- ============================================================
-- 2. INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_registrations_email          ON public.registrations (lower(email));
CREATE INDEX IF NOT EXISTS idx_registrations_applicant_type ON public.registrations (applicant_type);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at     ON public.registrations (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_registrations_city           ON public.registrations (city);

-- ============================================================
-- 3. AUTO-UPDATE updated_at TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_registrations_updated_at ON public.registrations;
CREATE TRIGGER trg_registrations_updated_at
  BEFORE UPDATE ON public.registrations
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- 4. ROW LEVEL SECURITY (RLS)
-- ============================================================
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Allow public registration submissions
DROP POLICY IF EXISTS "allow_public_insert" ON public.registrations;
CREATE POLICY "allow_public_insert" ON public.registrations
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Allow reading registrations
DROP POLICY IF EXISTS "allow_public_select" ON public.registrations;
CREATE POLICY "allow_public_select" ON public.registrations
  FOR SELECT TO anon, authenticated
  USING (true);

-- Allow admin deletions
DROP POLICY IF EXISTS "allow_delete" ON public.registrations;
CREATE POLICY "allow_delete" ON public.registrations
  FOR DELETE TO anon, authenticated
  USING (true);

-- ============================================================
-- 5. RPC STORED PROCEDURE (Optional fallback)
-- ============================================================
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
