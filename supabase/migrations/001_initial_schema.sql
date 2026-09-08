-- ============================================================
-- WeGuide AI & Robotics Awareness Workshop
-- Supabase Migration: 001_initial_schema
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- 1. SLOTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.slots (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_title    TEXT NOT NULL CHECK (length(trim(session_title)) > 0),
  session_datetime TIMESTAMPTZ NOT NULL,
  max_capacity     INTEGER NOT NULL DEFAULT 50 CHECK (max_capacity > 0),
  is_active        BOOLEAN NOT NULL DEFAULT true,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_slots_is_active        ON public.slots (is_active);
CREATE INDEX IF NOT EXISTS idx_slots_session_datetime ON public.slots (session_datetime);

-- ============================================================
-- 2. REGISTRATIONS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.registrations (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT now(),

  full_name        TEXT NOT NULL CHECK (length(trim(full_name)) > 0),
  email            TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$'),
  phone            TEXT NOT NULL CHECK (length(trim(phone)) >= 7),
  role             TEXT NOT NULL CHECK (role IN ('Student', 'Working Professional', 'Hobbyist/Other')),
  organization     TEXT NOT NULL CHECK (length(trim(organization)) > 0),
  experience_level TEXT NOT NULL CHECK (experience_level IN ('Beginner', 'Intermediate', 'Advanced')),
  slot_id          UUID NOT NULL REFERENCES public.slots (id) ON DELETE RESTRICT,
  status           TEXT NOT NULL DEFAULT 'confirmed'
                   CHECK (status IN ('confirmed', 'attended', 'cancelled'))
);

-- Case-insensitive uniqueness: same email may not register for same slot twice
CREATE UNIQUE INDEX IF NOT EXISTS idx_registrations_email_slot_unique
  ON public.registrations (lower(email), slot_id)
  WHERE status != 'cancelled';

CREATE INDEX IF NOT EXISTS idx_registrations_slot_id    ON public.registrations (slot_id);
CREATE INDEX IF NOT EXISTS idx_registrations_email      ON public.registrations (lower(email));
CREATE INDEX IF NOT EXISTS idx_registrations_status     ON public.registrations (status);
CREATE INDEX IF NOT EXISTS idx_registrations_experience ON public.registrations (experience_level);
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON public.registrations (created_at DESC);

-- ============================================================
-- 3. ADMIN USERS TABLE (explicit allow-list — not just auth.role)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.admin_users (
  id         UUID PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 4. AUTO-UPDATE updated_at TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_slots_updated_at ON public.slots;
CREATE TRIGGER trg_slots_updated_at
  BEFORE UPDATE ON public.slots
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_registrations_updated_at ON public.registrations;
CREATE TRIGGER trg_registrations_updated_at
  BEFORE UPDATE ON public.registrations
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- 5. ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Helper: is the current caller in admin_users?
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
$$;

-- SLOTS — public can read active slots; admins get full access
CREATE POLICY "public_read_active_slots" ON public.slots
  FOR SELECT TO anon, authenticated USING (is_active = true);

CREATE POLICY "admin_select_all_slots" ON public.slots
  FOR SELECT TO authenticated USING (public.is_admin());

CREATE POLICY "admin_insert_slots" ON public.slots
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());

CREATE POLICY "admin_update_slots" ON public.slots
  FOR UPDATE TO authenticated USING (public.is_admin());

-- REGISTRATIONS — no direct public access; admins only
CREATE POLICY "admin_select_registrations" ON public.registrations
  FOR SELECT TO authenticated USING (public.is_admin());

CREATE POLICY "admin_update_registrations" ON public.registrations
  FOR UPDATE TO authenticated USING (public.is_admin());

CREATE POLICY "admin_delete_registrations" ON public.registrations
  FOR DELETE TO authenticated USING (public.is_admin());

-- ADMIN_USERS — self-read only
CREATE POLICY "admin_users_self_read" ON public.admin_users
  FOR SELECT TO authenticated USING (id = auth.uid());

-- ============================================================
-- 6. PUBLIC SLOT AVAILABILITY — safe read-only RPC
-- ============================================================
CREATE OR REPLACE FUNCTION public.get_public_slots()
RETURNS TABLE (
  id               UUID,
  session_title    TEXT,
  session_datetime TIMESTAMPTZ,
  max_capacity     INTEGER,
  seats_filled     BIGINT,
  seats_remaining  BIGINT,
  is_sold_out      BOOLEAN
)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  RETURN QUERY
  SELECT
    s.id,
    s.session_title,
    s.session_datetime,
    s.max_capacity,
    COALESCE(r.cnt, 0)                                            AS seats_filled,
    GREATEST(s.max_capacity::BIGINT - COALESCE(r.cnt, 0), 0)    AS seats_remaining,
    COALESCE(r.cnt, 0) >= s.max_capacity                         AS is_sold_out
  FROM public.slots s
  LEFT JOIN (
    SELECT slot_id, COUNT(*) AS cnt
    FROM public.registrations
    WHERE status != 'cancelled'
    GROUP BY slot_id
  ) r ON r.slot_id = s.id
  WHERE s.is_active = true
  ORDER BY s.session_datetime ASC;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_public_slots() TO anon, authenticated;

-- ============================================================
-- 7. RACE-CONDITION SAFE BOOKING RPC
-- ============================================================
CREATE OR REPLACE FUNCTION public.register_user_for_slot(
  p_full_name        TEXT,
  p_email            TEXT,
  p_phone            TEXT,
  p_role             TEXT,
  p_organization     TEXT,
  p_experience_level TEXT,
  p_slot_id          UUID
)
RETURNS JSON
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_slot             public.slots%ROWTYPE;
  v_active_count     INTEGER;
  v_normalized_email TEXT;
  v_new_id           UUID;
  v_dup              INTEGER;
BEGIN
  v_normalized_email := lower(trim(p_email));

  -- Basic parameter guards
  IF v_normalized_email IS NULL OR length(v_normalized_email) = 0 THEN
    RAISE EXCEPTION 'VALIDATION_ERROR: Email is required.' USING ERRCODE = 'P0001';
  END IF;
  IF p_full_name IS NULL OR length(trim(p_full_name)) = 0 THEN
    RAISE EXCEPTION 'VALIDATION_ERROR: Full name is required.' USING ERRCODE = 'P0001';
  END IF;
  IF p_role NOT IN ('Student', 'Working Professional', 'Hobbyist/Other') THEN
    RAISE EXCEPTION 'VALIDATION_ERROR: Invalid role.' USING ERRCODE = 'P0001';
  END IF;
  IF p_experience_level NOT IN ('Beginner', 'Intermediate', 'Advanced') THEN
    RAISE EXCEPTION 'VALIDATION_ERROR: Invalid experience level.' USING ERRCODE = 'P0001';
  END IF;

  -- Lock the slot row for the duration of this transaction
  SELECT * INTO v_slot FROM public.slots WHERE id = p_slot_id FOR UPDATE;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'SLOT_NOT_FOUND: Session not found.' USING ERRCODE = 'P0002';
  END IF;

  IF NOT v_slot.is_active THEN
    RAISE EXCEPTION 'SLOT_INACTIVE: Session not accepting registrations.' USING ERRCODE = 'P0003';
  END IF;

  -- Count only non-cancelled registrations (they consume seats)
  SELECT COUNT(*) INTO v_active_count
  FROM public.registrations
  WHERE slot_id = p_slot_id AND status != 'cancelled';

  IF v_active_count >= v_slot.max_capacity THEN
    RAISE EXCEPTION 'SLOT_FULL: Session is fully booked.' USING ERRCODE = 'P0004';
  END IF;

  -- Duplicate check
  SELECT COUNT(*) INTO v_dup
  FROM public.registrations
  WHERE lower(email) = v_normalized_email
    AND slot_id = p_slot_id
    AND status != 'cancelled';

  IF v_dup > 0 THEN
    RAISE EXCEPTION 'DUPLICATE_REGISTRATION: Already registered.' USING ERRCODE = 'P0005';
  END IF;

  -- Atomic insert
  INSERT INTO public.registrations (
    full_name, email, phone, role, organization, experience_level, slot_id, status
  ) VALUES (
    trim(p_full_name), v_normalized_email, trim(p_phone),
    p_role, trim(p_organization), p_experience_level, p_slot_id, 'confirmed'
  ) RETURNING id INTO v_new_id;

  RETURN json_build_object(
    'registration_id',  v_new_id,
    'full_name',        trim(p_full_name),
    'email',            v_normalized_email,
    'session_title',    v_slot.session_title,
    'session_datetime', v_slot.session_datetime,
    'status',           'confirmed'
  );

EXCEPTION
  WHEN unique_violation THEN
    RAISE EXCEPTION 'DUPLICATE_REGISTRATION: Already registered for this session.'
      USING ERRCODE = 'P0005';
END;
$$;

GRANT EXECUTE ON FUNCTION public.register_user_for_slot(TEXT,TEXT,TEXT,TEXT,TEXT,TEXT,UUID)
  TO anon, authenticated;

-- ============================================================
-- 8. ADMIN STATS RPC
-- ============================================================
CREATE OR REPLACE FUNCTION public.get_admin_stats()
RETURNS JSON
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.is_admin() THEN
    RAISE EXCEPTION 'UNAUTHORIZED' USING ERRCODE = 'P0006';
  END IF;

  RETURN (
    SELECT json_build_object(
      'total',     COUNT(*),
      'confirmed', COUNT(*) FILTER (WHERE status = 'confirmed'),
      'attended',  COUNT(*) FILTER (WHERE status = 'attended'),
      'cancelled', COUNT(*) FILTER (WHERE status = 'cancelled')
    )
    FROM public.registrations
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_admin_stats() TO authenticated;

-- ============================================================
-- 9. SEED DATA (adjust dates before going live)
-- ============================================================
INSERT INTO public.slots (session_title, session_datetime, max_capacity, is_active)
VALUES
  ('Batch A — Morning',   '2026-09-20 09:30:00+05:30', 50, true),
  ('Batch B — Afternoon', '2026-09-20 14:00:00+05:30', 50, true),
  ('Batch C — Morning',   '2026-09-21 09:30:00+05:30', 50, true)
ON CONFLICT DO NOTHING;
