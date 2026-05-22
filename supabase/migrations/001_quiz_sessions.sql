-- ──────────────────────────────────────────────────────────────────────────────
-- Emerson Park Design & Construction
-- Quiz Sessions Table
-- Run this in your Supabase SQL editor:
--   supabase.com/dashboard/project/uxjmtgyklaotsaxgpswa/sql/new
-- ──────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS quiz_sessions (
  id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at                TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- Stage 1 gate: early contact capture
  first_name                TEXT,
  email                     TEXT,

  -- Stage 1: Exterior Discovery
  s1_answers                JSONB,
  primary_arch_style        TEXT,
  secondary_arch_style      TEXT,
  arch_scores               JSONB,
  stage_1_completed_at      TIMESTAMPTZ,

  -- Replicate rendering
  replicate_prediction_id   TEXT,
  rendering_url             TEXT,
  rendering_status          TEXT DEFAULT 'pending'
                              CHECK (rendering_status IN ('pending','complete','failed')),

  -- Stage 2: Interior Discovery
  s2_answers                JSONB,
  primary_finish_style      TEXT,
  secondary_finish_style    TEXT,
  finish_scores             JSONB,
  stage_2_completed_at      TIMESTAMPTZ,

  -- Cloudinary mood board
  moodboard_images          JSONB, -- array of URLs

  -- Stage 3: Project Details + Contact
  last_name                 TEXT,
  phone                     TEXT,
  square_footage            TEXT,
  bedrooms                  TEXT,
  bathrooms                 TEXT,
  pool                      BOOLEAN DEFAULT FALSE,
  garage_size               TEXT,
  special_spaces            JSONB,  -- string[]
  timeline                  TEXT,
  stage_3_completed_at      TIMESTAMPTZ,

  -- Cost estimate
  cost_estimate_low         INTEGER,
  cost_estimate_high        INTEGER,
  cost_finish_level         TEXT,   -- Q10 answer ID (e.g. "custom_statement_millwork")

  -- CRM & email tracking
  ghl_contact_id            TEXT,
  ghl_webhook_fired_at      TIMESTAMPTZ,
  rendering_email_sent_at   TIMESTAMPTZ,
  moodboard_email_sent_at   TIMESTAMPTZ,
  concept_email_sent_at     TIMESTAMPTZ,

  -- Overall stage
  stage                     TEXT NOT NULL DEFAULT 'stage_1'
                              CHECK (stage IN ('stage_1','stage_2','stage_3','complete'))
);

-- Auto-update updated_at on any row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER quiz_sessions_updated_at
  BEFORE UPDATE ON quiz_sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Useful indexes
CREATE INDEX idx_quiz_sessions_email         ON quiz_sessions(email);
CREATE INDEX idx_quiz_sessions_stage         ON quiz_sessions(stage);
CREATE INDEX idx_quiz_sessions_replicate_id  ON quiz_sessions(replicate_prediction_id);
CREATE INDEX idx_quiz_sessions_created       ON quiz_sessions(created_at DESC);

-- Row-level security (enable then add policies as needed)
ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;

-- Service role can do everything (used by API routes)
CREATE POLICY "service_role_all" ON quiz_sessions
  FOR ALL TO service_role USING (true) WITH CHECK (true);
